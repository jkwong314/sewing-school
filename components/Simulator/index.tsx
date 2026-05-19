"use client";

import { useEffect, useReducer, useRef, useCallback, useState } from "react";
import { STITCH_CONFIGS, type StitchKind } from "./stitches";
import {
  createInitialState,
  tick,
  reset,
  type EngineState,
} from "./engine";
import { renderTopDown, renderCrossSection } from "./renderers";

type View = "top" | "cross";

type Action =
  | { type: "tick"; dt: number }
  | { type: "step" }
  | { type: "reset" }
  | { type: "setSpeed"; speed: number }
  | { type: "setPlaying"; playing: boolean }
  | { type: "setView"; view: View };

type UiState = {
  engine: EngineState;
  playing: boolean;
  speed: number;
  view: View;
};

function makeReducer(stitchesPerSecond: number) {
  return function reducer(state: UiState, action: Action): UiState {
    switch (action.type) {
      case "tick": {
        if (!state.playing) return state;
        const next = tick(state.engine, action.dt, state.speed, stitchesPerSecond);
        // For non-looping patterns, auto-pause when complete
        if (!state.engine.config.loop && next.currentStitch >= next.config.totalStitches) {
          return { ...state, engine: next, playing: false };
        }
        return { ...state, engine: next };
      }
      case "step": {
        const next = tick(state.engine, 1, 1, 1);
        return { ...state, engine: next, playing: false };
      }
      case "reset":
        return { ...state, engine: reset(state.engine), playing: false };
      case "setSpeed":
        return { ...state, speed: action.speed };
      case "setPlaying":
        return { ...state, playing: action.playing };
      case "setView":
        return { ...state, view: action.view };
    }
  };
}

type Props = {
  stitch: StitchKind;
};

const CANVAS_W = 640;
const CANVAS_H = 360;
const STITCHES_PER_SECOND = 1.6;

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefers;
}

export function Simulator({ stitch }: Props) {
  const config = STITCH_CONFIGS[stitch];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const reducer = useRef(makeReducer(STITCHES_PER_SECOND));
  const prefersReduced = usePrefersReducedMotion();
  const [overrideReduced, setOverrideReduced] = useState(false);

  const [state, dispatch] = useReducer(reducer.current, undefined, () => ({
    engine: createInitialState(config, CANVAS_W / 2, CANVAS_H / 2),
    playing: false,
    speed: 1,
    view: "top" as View,
  }));

  // Draw whenever state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== CANVAS_W * dpr) {
      canvas.width = CANVAS_W * dpr;
      canvas.height = CANVAS_H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (state.view === "top") renderTopDown(ctx, CANVAS_W, CANVAS_H, state.engine);
    else renderCrossSection(ctx, CANVAS_W, CANVAS_H, state.engine);
  }, [state.engine, state.view]);

  // Animation loop
  useEffect(() => {
    if (!state.playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
      return;
    }
    const step = (t: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = Math.min(0.05, (t - lastTimeRef.current) / 1000);
      lastTimeRef.current = t;
      dispatch({ type: "tick", dt });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state.playing]);

  // Keyboard shortcuts (only when the simulator region is focused or hovered)
  const regionRef = useRef<HTMLDivElement | null>(null);
  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      dispatch({ type: "setPlaying", playing: !state.playing });
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      dispatch({ type: "step" });
    } else if (e.key === "r" || e.key === "R") {
      dispatch({ type: "reset" });
    } else if (e.key === "v" || e.key === "V") {
      dispatch({ type: "setView", view: state.view === "top" ? "cross" : "top" });
    }
  }, [state.playing, state.view]);

  const completed = !config.loop && state.engine.currentStitch >= config.totalStitches;
  const ariaStatus = `${config.displayName}. View: ${state.view === "top" ? "top-down" : "cross-section"}. ${
    state.playing ? "Playing" : "Paused"
  }. Stitch ${Math.min(state.engine.currentStitch + 1, config.totalStitches)} of ${config.totalStitches}.${
    completed ? " Pattern complete." : ""
  }`;

  const showReducedFallback = prefersReduced && !overrideReduced;

  if (showReducedFallback) {
    return (
      <div className="dashed-border bg-white p-6 my-6">
        <p className="font-mono text-xs uppercase tracking-widest text-brown mb-3">
          Reduced motion · simulator
        </p>
        <h3 className="font-display text-2xl text-ink mb-3">{config.displayName}</h3>
        <p className="text-ink leading-relaxed mb-4">{config.description}</p>
        <button
          onClick={() => setOverrideReduced(true)}
          className="font-mono text-xs uppercase tracking-widest bg-blush-deep text-white px-4 py-3 rounded-full min-h-[44px]"
        >
          Play the animation anyway
        </button>
      </div>
    );
  }

  return (
    <section
      ref={regionRef}
      aria-label={`Interactive simulator for ${config.displayName}`}
      tabIndex={0}
      onKeyDown={handleKey}
      className="dashed-border bg-white p-4 my-6 focus:outline-3"
    >
      <div role="status" aria-live="polite" className="sr-only">
        {ariaStatus}
      </div>
      <div className="bg-cream-deep rounded overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", maxWidth: CANVAS_W, height: "auto", aspectRatio: `${CANVAS_W}/${CANVAS_H}`, display: "block", margin: "0 auto" }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 items-center text-sm">
        <button
          onClick={() => dispatch({ type: "setPlaying", playing: !state.playing })}
          className="font-mono uppercase tracking-wider bg-blush-deep text-white px-4 py-3 rounded-full min-h-[44px] hover:bg-brown-deep"
          aria-pressed={state.playing}
        >
          {state.playing ? "Pause" : completed ? "Replay" : "Play"}
        </button>
        <button
          onClick={() => {
            if (completed) dispatch({ type: "reset" });
            dispatch({ type: "step" });
          }}
          className="font-mono uppercase tracking-wider border-2 border-border-warm text-ink px-4 py-3 rounded-full min-h-[44px] hover:bg-cream-deep"
        >
          Step →
        </button>
        <button
          onClick={() => dispatch({ type: "reset" })}
          className="font-mono uppercase tracking-wider border-2 border-border-warm text-ink px-4 py-3 rounded-full min-h-[44px] hover:bg-cream-deep"
        >
          Reset
        </button>
        <label className="font-mono uppercase tracking-wider text-ink-soft flex items-center gap-2 ml-2">
          Speed
          <select
            value={state.speed}
            onChange={(e) => dispatch({ type: "setSpeed", speed: Number(e.target.value) })}
            className="bg-white border-2 border-border-warm rounded px-2 py-2 min-h-[44px] font-mono text-ink"
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={2}>2×</option>
          </select>
        </label>
        <fieldset className="ml-auto flex items-center gap-1" aria-label="View mode">
          <legend className="sr-only">View mode</legend>
          {(["top", "cross"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => dispatch({ type: "setView", view: v })}
              aria-pressed={state.view === v}
              className={`font-mono uppercase tracking-wider px-4 py-3 rounded-full min-h-[44px] border-2 ${
                state.view === v
                  ? "bg-ink text-cream border-ink"
                  : "border-border-warm text-ink hover:bg-cream-deep"
              }`}
            >
              {v === "top" ? "Top-down" : "Cross-section"}
            </button>
          ))}
        </fieldset>
      </div>
      <p className="mt-3 font-mono text-xs text-ink-soft">
        Keyboard: <kbd className="bg-cream-deep px-1.5 py-0.5 rounded">Space</kbd> play/pause ·
        {" "}<kbd className="bg-cream-deep px-1.5 py-0.5 rounded">→</kbd> step ·
        {" "}<kbd className="bg-cream-deep px-1.5 py-0.5 rounded">R</kbd> reset ·
        {" "}<kbd className="bg-cream-deep px-1.5 py-0.5 rounded">V</kbd> view
      </p>
    </section>
  );
}
