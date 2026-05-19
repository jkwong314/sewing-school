import type { EngineState } from "./engine";
import { needleDescent, currentPierceX } from "./engine";

const COLORS = {
  cream: "#faf6ee",
  fabric: "#e8d9b8",
  fabricEdge: "#b8a37a",
  thread: "#3a2e22",
  threadHighlight: "#7a4a2b",
  bobbinThread: "#a85e58",
  needle: "#5a4632",
  needleHighlight: "#8a7665",
  guide: "#c9a87a",
  ink: "#3a2e22",
  inkSoft: "#7a6957",
};

function clearCanvas(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = COLORS.cream;
  ctx.fillRect(0, 0, w, h);
}

export function renderTopDown(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: EngineState,
) {
  clearCanvas(ctx, w, h);

  // Fabric: a vertical strip occupying middle of canvas, scrolling as fabricAdvance increases.
  const fabricLeft = w * 0.2;
  const fabricRight = w * 0.8;
  ctx.fillStyle = COLORS.fabric;
  ctx.fillRect(fabricLeft, 0, fabricRight - fabricLeft, h);

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

  // Fabric weave hint (subtle)
  ctx.strokeStyle = "rgba(184, 163, 122, 0.25)";
  ctx.lineWidth = 1;
  const weaveOffset = state.fabricAdvance % 12;
  for (let y = -12 + weaveOffset; y < h; y += 12) {
    ctx.beginPath();
    ctx.moveTo(fabricLeft, y);
    ctx.lineTo(fabricRight, y);
    ctx.stroke();
  }

  // Draw the stitches. Each pierce is in fabric-space y; we add fabricAdvance to get canvas y.
  const pierces = state.pierces;
  ctx.strokeStyle = COLORS.thread;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  for (let i = 0; i < pierces.length; i++) {
    const p = pierces[i];
    const cy = p.y + state.fabricAdvance;
    if (i === 0) ctx.moveTo(p.x, cy);
    else ctx.lineTo(p.x, cy);
  }
  ctx.stroke();

  // Pierce dots
  ctx.fillStyle = COLORS.threadHighlight;
  for (const p of pierces) {
    const cy = p.y + state.fabricAdvance;
    ctx.beginPath();
    ctx.arc(p.x, cy, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // The needle: drawn at currentPierceX, with vertical thread "trail" up to top
  const nx = currentPierceX(state);
  const ny = state.needleY;
  const descent = needleDescent(state.phase);

  // Thread leading up from needle to top of canvas (taut)
  ctx.strokeStyle = COLORS.threadHighlight;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(nx, ny - 30 * (1 - descent));
  ctx.lineTo(nx, 0);
  ctx.stroke();

  // Needle shaft (visible portion above fabric)
  const needleLength = 28;
  const needleVisible = needleLength * (1 - descent) + 4;
  ctx.strokeStyle = COLORS.needle;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(nx, ny - needleVisible);
  ctx.lineTo(nx, ny - 2);
  ctx.stroke();

  // Needle tip indicator (when descended, draw a small mark on the fabric)
  if (descent > 0.6) {
    ctx.fillStyle = COLORS.needleHighlight;
    ctx.beginPath();
    ctx.arc(nx, ny, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Reference axis label: arrow showing feed direction
  ctx.fillStyle = COLORS.inkSoft;
  ctx.font = "11px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText("feed →", fabricRight + 10, ny);
  ctx.beginPath();
  ctx.moveTo(fabricRight + 10, ny + 12);
  ctx.lineTo(fabricRight + 10, ny + 30);
  ctx.lineTo(fabricRight + 6, ny + 24);
  ctx.moveTo(fabricRight + 10, ny + 30);
  ctx.lineTo(fabricRight + 14, ny + 24);
  ctx.strokeStyle = COLORS.inkSoft;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Title strip
  ctx.fillStyle = COLORS.ink;
  ctx.font = "12px ui-monospace, monospace";
  ctx.fillText(`TOP-DOWN · ${state.config.displayName}`, 12, 18);
}

export function renderCrossSection(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  state: EngineState,
) {
  clearCanvas(ctx, w, h);

  // Layout: needle vertical at center-ish, fabric horizontal slab, bobbin below
  const cx = w * 0.5;
  const fabricTopY = h * 0.45;
  const fabricBotY = h * 0.55;
  const bobbinY = h * 0.78;
  const topY = h * 0.05;

  // Fabric slab
  ctx.fillStyle = COLORS.fabric;
  ctx.fillRect(w * 0.1, fabricTopY, w * 0.8, fabricBotY - fabricTopY);
  ctx.strokeStyle = COLORS.fabricEdge;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(w * 0.1, fabricTopY, w * 0.8, fabricBotY - fabricTopY);

  // Label fabric
  ctx.fillStyle = COLORS.inkSoft;
  ctx.font = "11px ui-monospace, monospace";
  ctx.textAlign = "right";
  ctx.fillText("fabric", w * 0.1 - 6, (fabricTopY + fabricBotY) / 2 + 4);

  // Existing locked stitches behind needle (showing prior bobbin loops)
  const recentPierces = state.pierces.slice(-6);
  for (let i = 0; i < recentPierces.length; i++) {
    // Lay stitches out leftward from the needle, evenly spaced
    const spacing = 22;
    const sx = cx - (recentPierces.length - i) * spacing - 10;
    if (sx < w * 0.1 + 6) continue;
    // Top thread coming down from above into fabric
    ctx.strokeStyle = COLORS.thread;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(sx, fabricTopY - 4);
    ctx.lineTo(sx, (fabricTopY + fabricBotY) / 2);
    ctx.stroke();
    // Lockstitch knot
    ctx.fillStyle = COLORS.threadHighlight;
    ctx.beginPath();
    ctx.arc(sx, (fabricTopY + fabricBotY) / 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Bobbin thread going from this knot to next
    if (i < recentPierces.length - 1) {
      ctx.strokeStyle = COLORS.bobbinThread;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(sx, (fabricTopY + fabricBotY) / 2 + 1);
      ctx.lineTo(sx + spacing, (fabricTopY + fabricBotY) / 2 + 1);
      ctx.stroke();
    }
  }

  // Tension guide (top)
  ctx.fillStyle = COLORS.guide;
  ctx.beginPath();
  ctx.arc(w * 0.18, topY + 20, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.inkSoft;
  ctx.textAlign = "left";
  ctx.fillText("tension", w * 0.18 + 14, topY + 23);

  // Take-up lever indicator
  ctx.fillStyle = COLORS.guide;
  ctx.fillRect(w * 0.3, topY + 8, 30, 6);
  ctx.fillStyle = COLORS.inkSoft;
  ctx.fillText("take-up lever", w * 0.3 + 36, topY + 13);

  // Needle phase mechanics
  // descent: 0..1 (0 at start, 1 at bottom mid-stitch)
  const descent = needleDescent(state.phase);
  const needleTop = topY + 40;
  const needleRestY = fabricTopY - 30; // when phase ~ 0
  const needleDeepY = fabricBotY + 14; // when phase ~ 0.5
  const needleY =
    needleRestY + (needleDeepY - needleRestY) * descent;

  // Top thread path: from tension guide, down through take-up lever, into needle eye
  ctx.strokeStyle = COLORS.threadHighlight;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.18 + 9, topY + 20);
  ctx.quadraticCurveTo(w * 0.25, topY + 40, w * 0.3 + 30, topY + 11);
  ctx.lineTo(cx - 1, needleY - 2);
  ctx.stroke();

  // Needle shaft
  ctx.strokeStyle = COLORS.needle;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx, needleTop);
  ctx.lineTo(cx, needleY);
  ctx.stroke();

  // Needle eye (small slot near tip)
  ctx.fillStyle = COLORS.cream;
  ctx.beginPath();
  ctx.ellipse(cx, needleY - 4, 2, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.needle;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Bobbin (a circle below fabric, with bobbin thread feeding up to current pierce)
  ctx.fillStyle = "#f3eada";
  ctx.beginPath();
  ctx.arc(cx + 30, bobbinY, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.fabricEdge;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // Bobbin hook (small protrusion)
  ctx.fillStyle = COLORS.needle;
  ctx.beginPath();
  ctx.arc(cx + 8, bobbinY - 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.inkSoft;
  ctx.textAlign = "left";
  ctx.font = "11px ui-monospace, monospace";
  ctx.fillText("bobbin", cx + 56, bobbinY + 4);

  // Loop forming: when needle is near bottom dwell (descent > 0.85), draw a small loop
  // catching off the needle behind the eye
  if (descent > 0.7) {
    ctx.strokeStyle = COLORS.threadHighlight;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx + 4, needleY - 6, 5, -Math.PI * 0.4, Math.PI * 1.2);
    ctx.stroke();
  }

  // Bobbin thread coming up from bobbin to the most-recent pierce
  ctx.strokeStyle = COLORS.bobbinThread;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(cx + 30 - 22, bobbinY);
  ctx.quadraticCurveTo(
    cx + 4,
    bobbinY - 30,
    cx,
    (fabricTopY + fabricBotY) / 2 + 1,
  );
  ctx.stroke();

  // Phase label
  ctx.fillStyle = COLORS.ink;
  ctx.font = "12px ui-monospace, monospace";
  ctx.textAlign = "left";
  ctx.fillText(`CROSS-SECTION · ${state.config.displayName}`, 12, 18);

  // Stage indicator for buttonhole
  if (state.currentStitch < state.config.totalStitches) {
    const instance = state.config.getStitch(state.currentStitch);
    if (instance.stage) {
      ctx.fillStyle = COLORS.inkSoft;
      ctx.font = "11px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillText(`stage: ${instance.stage}`, w - 12, 18);
    }
  }

  // Phase descriptor (helps screen readers when paired with aria-live)
  ctx.textAlign = "right";
  ctx.fillStyle = COLORS.inkSoft;
  let phaseLabel = "";
  if (descent < 0.2) phaseLabel = "needle up";
  else if (descent < 0.7) phaseLabel = "needle descending";
  else if (descent < 0.95) phaseLabel = "bobbin loop forming";
  else phaseLabel = "needle at bottom";
  ctx.fillText(phaseLabel, w - 12, h - 12);
}
