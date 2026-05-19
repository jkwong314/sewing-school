import type { EngineState } from "./engine";
import { needleDescent, currentPierceX, currentStage } from "./engine";

const COLORS = {
  cream: "#faf6ee",
  fabric: "#e8d9b8",
  fabricEdge: "#b8a37a",
  weave: "#b8a37a",
  thread: "#3a2e22",
  threadHighlight: "#7a4a2b",
  bobbinThread: "#a85e58",
  needle: "#5a4632",
  needleHighlight: "#8a7665",
  guide: "#c9a87a",
  ink: "#3a2e22",
  inkSoft: "#7a6957",
  inkFaint: "#a8997f",
};

function clearCanvas(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(0, 0, w, h);
}

// === TOP-DOWN VIEW ===
// Convention: fabric feeds "into the back of the machine" — UP on screen.
// New pierces form at needleY; older pierces appear ABOVE needleY.
export function renderTopDown(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: EngineState,
) {
  clearCanvas(ctx, w, h);

  const fabricLeft = w * 0.18;
  const fabricRight = w * 0.82;

  // Fabric base
  ctx.fillStyle = COLORS.fabric;
  ctx.fillRect(fabricLeft, 0, fabricRight - fabricLeft, h);

  // Visible weave: scrolling cross lines. Fabric moves UP -> weave lines move UP.
  ctx.strokeStyle = COLORS.weave;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 1;
  const SPACING = 14;
  const offset = ((state.fabricAdvance % SPACING) + SPACING) % SPACING;
  for (let y = h - offset; y > -SPACING; y -= SPACING) {
    ctx.beginPath();
    ctx.moveTo(fabricLeft, y);
    ctx.lineTo(fabricRight, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Fabric edges
  ctx.strokeStyle = COLORS.fabricEdge;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(fabricLeft, 0);
  ctx.lineTo(fabricLeft, h);
  ctx.moveTo(fabricRight, 0);
  ctx.lineTo(fabricRight, h);
  ctx.stroke();
  ctx.setLineDash([]);

  // Stitches: each pierce stored as fabricY = needleY - fabricAdvanceAtPierce.
  // Render y: pierce.fabricY + fabricAdvance flips that — wait: we want older pierces ABOVE.
  // pierce.fabricY = needleY - adv_at_pierce. Current render y = pierce.fabricY + ??? -- no.
  // Goal: at moment of pierce, render y = needleY. As fabric advances, older pierces move UP.
  // So render y = pierce.fabricY - (current_adv - adv_at_pierce). With pierce stored as
  // (needleY - adv_at_pierce), render y = (needleY - adv_at_pierce) - (current_adv - adv_at_pierce)
  // = needleY - current_adv. That makes all pierces share the same y — wrong.
  // Reconsider: we want pierces to MOVE UP relative to canvas as adv grows.
  // At pierce time: render y = needleY.
  // Later (adv grows by Δ): render y = needleY - Δ.
  // Store pierce.fabricY = needleY + adv_at_pierce. Then render y = pierce.fabricY - current_adv.
  // At pierce time: y = needleY + adv - adv = needleY ✓. Later: y = needleY + adv - (adv+Δ) = needleY - Δ ✓.
  // Engine stores fabricY = needleY - fabricAdvance — opposite sign. Adjust here.
  // Effective: renderY = state.needleY - (state.fabricAdvance - (state.needleY - pierce.fabricY))
  //         = state.needleY - state.fabricAdvance + state.needleY - pierce.fabricY
  //         = 2*needleY - fabricAdvance - pierce.fabricY  -- ugly.
  // Easier path: change engine to store fabricY = needleY + fabricAdvance.
  // Done — see engine.ts: stored as needleY - fabricAdvance. We can flip by interpreting:
  // renderY = needleY - (fabricAdvance + pierce.fabricY - needleY) = 2*needleY - fabricAdvance - pierce.fabricY
  // Or simplest: compute "advAtPierce = needleY - pierce.fabricY", renderY = needleY - (fabricAdvance - advAtPierce).
  const renderY = (p: { fabricY: number }) =>
    state.needleY - (state.fabricAdvance - (state.needleY - p.fabricY));

  const pierces = state.pierces;
  if (pierces.length >= 2) {
    ctx.strokeStyle = COLORS.thread;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let i = 0; i < pierces.length; i++) {
      const p = pierces[i];
      const y = renderY(p);
      if (i === 0) ctx.moveTo(p.x, y);
      else ctx.lineTo(p.x, y);
    }
    ctx.stroke();
  }

  // Pierce dots
  ctx.fillStyle = COLORS.threadHighlight;
  for (const p of pierces) {
    const y = renderY(p);
    if (y < -10 || y > h + 10) continue;
    ctx.beginPath();
    ctx.arc(p.x, y, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // The needle: thread tail going up to top, shaft visible above fabric
  const nx = currentPierceX(state);
  const ny = state.needleY;
  const descent = needleDescent(state.phase);

  // Top thread above needle
  ctx.strokeStyle = COLORS.threadHighlight;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(nx, 0);
  ctx.lineTo(nx, ny - 32 * (1 - descent) - 2);
  ctx.stroke();

  // Needle shaft (from above, visible part rises with descent)
  const needleLength = 30;
  const needleVisible = needleLength * (1 - descent) + 4;
  ctx.strokeStyle = COLORS.needle;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(nx, ny - needleVisible);
  ctx.lineTo(nx, ny - 1);
  ctx.stroke();

  // When needle is in fabric, show pierce dot at current position
  if (descent > 0.55) {
    ctx.fillStyle = COLORS.needleHighlight;
    ctx.beginPath();
    ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Feed direction indicator (arrow up = fabric moving away from operator)
  ctx.fillStyle = COLORS.inkSoft;
  ctx.font = "11px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("feed", fabricRight + 12, ny + 4);
  ctx.strokeStyle = COLORS.inkSoft;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(fabricRight + 22, ny - 8);
  ctx.lineTo(fabricRight + 22, ny - 28);
  ctx.moveTo(fabricRight + 18, ny - 24);
  ctx.lineTo(fabricRight + 22, ny - 28);
  ctx.lineTo(fabricRight + 26, ny - 24);
  ctx.stroke();

  // Title strip
  ctx.fillStyle = COLORS.ink;
  ctx.font = "12px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText(`TOP-DOWN · ${state.config.displayName}`, 12, 18);

  // Stage indicator for buttonhole
  const stage = currentStage(state);
  if (stage) {
    ctx.fillStyle = COLORS.inkSoft;
    ctx.textAlign = "right";
    ctx.fillText(`stage: ${stage}`, w - 12, 18);
  }
}

// === CROSS-SECTION VIEW ===
// Side view along the seam line. Recent pierces shown receding into the page (left).
// An "above-the-needle plate" inset at the top shows the seam pattern from above so
// the difference between straight / zigzag / buttonhole is visible here too.
export function renderCrossSection(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: EngineState,
) {
  clearCanvas(ctx, w, h);

  // === INSET: needle-plate top-down preview ===
  const insetH = 64;
  const insetTop = 24;
  const insetLeft = 12;
  const insetRight = w - 12;
  const insetMidX = (insetLeft + insetRight) / 2;
  const insetMidY = insetTop + insetH / 2;

  ctx.fillStyle = COLORS.fabric;
  ctx.fillRect(insetLeft, insetTop, insetRight - insetLeft, insetH);
  ctx.strokeStyle = COLORS.fabricEdge;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(insetLeft, insetTop, insetRight - insetLeft, insetH);

  ctx.fillStyle = COLORS.inkSoft;
  ctx.font = "10px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("from above (needle plate)", insetLeft + 6, insetTop - 4);

  // Map pierces into inset: spread along x axis, oldest at left, newest at right.
  // Use lateralOffset to set y inside inset strip.
  const recent = state.pierces.slice(-22);
  const newestX = insetMidX;
  const pxPer = 16; // px per stitch along inset
  // Draw stitch line in inset
  ctx.strokeStyle = COLORS.thread;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  recent.forEach((p, idx) => {
    const offsetFromNewest = recent.length - 1 - idx;
    const x = newestX - offsetFromNewest * pxPer;
    const yIn = insetMidY + (p.lateralOffset * (state.config.stitchWidth / 2)) * 0.6;
    if (idx === 0) ctx.moveTo(x, yIn);
    else ctx.lineTo(x, yIn);
  });
  ctx.stroke();
  // Pierce dots in inset
  ctx.fillStyle = COLORS.threadHighlight;
  recent.forEach((p, idx) => {
    const offsetFromNewest = recent.length - 1 - idx;
    const x = newestX - offsetFromNewest * pxPer;
    if (x < insetLeft + 4 || x > insetRight - 4) return;
    const yIn = insetMidY + (p.lateralOffset * (state.config.stitchWidth / 2)) * 0.6;
    ctx.beginPath();
    ctx.arc(x, yIn, 2, 0, Math.PI * 2);
    ctx.fill();
  });
  // Needle marker in inset
  ctx.fillStyle = COLORS.needleHighlight;
  ctx.beginPath();
  ctx.arc(newestX, insetMidY, 3, 0, Math.PI * 2);
  ctx.fill();
  // Inset bounds: clip overflow
  ctx.save();
  ctx.beginPath();
  ctx.rect(insetLeft, insetTop, insetRight - insetLeft, insetH);
  ctx.clip();
  ctx.restore();

  // === MAIN CROSS-SECTION ===
  const cx = w * 0.5;
  const fabricTopY = h * 0.5;
  const fabricBotY = h * 0.6;
  const bobbinY = h * 0.82;
  const topY = h * 0.18;

  // Tension discs
  ctx.fillStyle = COLORS.guide;
  ctx.beginPath();
  ctx.arc(w * 0.16, topY + 4, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.inkSoft;
  ctx.font = "10px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("tension", w * 0.16 + 14, topY + 6);

  // Take-up lever (oscillates with phase)
  const leverPhase = Math.sin(state.phase * Math.PI * 2);
  const leverY = topY - 6 + leverPhase * 6;
  ctx.fillStyle = COLORS.guide;
  ctx.fillRect(w * 0.3, leverY, 32, 5);
  ctx.fillStyle = COLORS.inkSoft;
  ctx.fillText("take-up lever", w * 0.3 + 38, leverY + 4);

  // Fabric slab
  ctx.fillStyle = COLORS.fabric;
  ctx.fillRect(w * 0.08, fabricTopY, w * 0.84, fabricBotY - fabricTopY);
  ctx.strokeStyle = COLORS.fabricEdge;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(w * 0.08, fabricTopY, w * 0.84, fabricBotY - fabricTopY);
  ctx.fillStyle = COLORS.inkSoft;
  ctx.textAlign = "right";
  ctx.fillText("fabric", w * 0.08 - 6, (fabricTopY + fabricBotY) / 2 + 4);

  // Needle motion
  const descent = needleDescent(state.phase);
  const needleTop = topY + 10;
  const needleRestY = fabricTopY - 28;
  const needleDeepY = fabricBotY + 16;
  const needleY = needleRestY + (needleDeepY - needleRestY) * descent;

  // Existing pierces behind the needle, laid out along the seam line
  // (Each pierce drawn at fabric middle y, x-positioned by recency.)
  const seamY = (fabricTopY + fabricBotY) / 2;
  const spacing = 24;
  for (let i = 0; i < recent.length; i++) {
    const offsetFromNewest = recent.length - 1 - i;
    const sx = cx - (offsetFromNewest + 1) * spacing;
    if (sx < w * 0.08 + 8) continue;
    const p = recent[i];
    // The top-thread loop coming down (thicker for prior stitches)
    ctx.strokeStyle = COLORS.thread;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(sx, fabricTopY - 2);
    ctx.lineTo(sx, seamY);
    ctx.stroke();
    // Lockstitch knot
    ctx.fillStyle = COLORS.threadHighlight;
    ctx.beginPath();
    ctx.arc(sx, seamY, 2.8, 0, Math.PI * 2);
    ctx.fill();
    // Subtle indicator of lateral offset (vertical tick on top of fabric)
    if (Math.abs(p.lateralOffset) > 0.05) {
      ctx.strokeStyle = COLORS.inkFaint;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx, fabricTopY - 6);
      ctx.lineTo(sx, fabricTopY - 10);
      ctx.stroke();
    }
    // Bobbin thread connecting consecutive pierces underneath
    if (i < recent.length - 1) {
      const nextSx = cx - (offsetFromNewest) * spacing;
      ctx.strokeStyle = COLORS.bobbinThread;
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      ctx.moveTo(sx, seamY + 1);
      ctx.lineTo(nextSx, seamY + 1);
      ctx.stroke();
    }
  }

  // Top thread from tension/take-up lever to needle eye
  ctx.strokeStyle = COLORS.threadHighlight;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.16 + 10, topY + 4);
  ctx.quadraticCurveTo(w * 0.22, topY + 30, w * 0.3 + 16, leverY + 2);
  ctx.lineTo(cx - 2, needleY - 6);
  ctx.stroke();

  // Needle shaft
  ctx.strokeStyle = COLORS.needle;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx, needleTop);
  ctx.lineTo(cx, needleY);
  ctx.stroke();

  // Needle eye
  ctx.fillStyle = COLORS.cream;
  ctx.beginPath();
  ctx.ellipse(cx, needleY - 5, 1.6, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.needle;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Bobbin
  ctx.fillStyle = "#f3eada";
  ctx.beginPath();
  ctx.arc(cx + 36, bobbinY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.fabricEdge;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Hook (rotates with phase for visual cue)
  const hookAngle = state.phase * Math.PI * 2;
  const hookR = 18;
  const hx = cx + 36 + Math.cos(hookAngle) * hookR;
  const hy = bobbinY + Math.sin(hookAngle) * hookR;
  ctx.fillStyle = COLORS.needle;
  ctx.beginPath();
  ctx.arc(hx, hy, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.inkSoft;
  ctx.textAlign = "left";
  ctx.font = "10px ui-monospace, monospace";
  ctx.fillText("bobbin", cx + 64, bobbinY + 4);

  // Forming loop at the needle (visible when descended)
  if (descent > 0.65) {
    ctx.strokeStyle = COLORS.threadHighlight;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(cx + 5, needleY - 8, 5.5, -Math.PI * 0.4, Math.PI * 1.2);
    ctx.stroke();
  }

  // Bobbin thread feeding from bobbin up to the current pierce
  ctx.strokeStyle = COLORS.bobbinThread;
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(cx + 36 - 22, bobbinY);
  ctx.quadraticCurveTo(cx + 6, bobbinY - 36, cx, seamY + 1);
  ctx.stroke();

  // Title and phase labels
  ctx.fillStyle = COLORS.ink;
  ctx.font = "12px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText(`CROSS-SECTION · ${state.config.displayName}`, 12, 18);

  const stage = currentStage(state);
  if (stage) {
    ctx.fillStyle = COLORS.inkSoft;
    ctx.textAlign = "right";
    ctx.fillText(`stage: ${stage}`, w - 12, 18);
  }

  // Phase descriptor
  ctx.textAlign = "right";
  ctx.fillStyle = COLORS.inkSoft;
  ctx.font = "10px ui-monospace, monospace";
  let phaseLabel = "";
  if (descent < 0.15) phaseLabel = "needle up · fabric feeds";
  else if (descent < 0.7) phaseLabel = "needle descending";
  else if (descent < 0.95) phaseLabel = "bobbin hook catching loop";
  else phaseLabel = "needle at bottom dwell";
  ctx.fillText(phaseLabel, w - 12, h - 10);
}
