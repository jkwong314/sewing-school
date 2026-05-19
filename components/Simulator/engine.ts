import type { StitchConfig, StitchInstance } from "./stitches";

export type PiercePoint = {
  // Canvas-space coordinates of where this stitch pierced
  x: number;
  y: number;
};

export type EngineState = {
  config: StitchConfig;
  // Index of the current stitch being formed (0-based)
  currentStitch: number;
  // Phase within current stitch: 0 = needle up at start, 0.5 = needle at bottom, 1 = needle up at end
  phase: number;
  // Cumulative fabric advance in canvas units. Increasing = fabric moves "down past" the needle.
  fabricAdvance: number;
  // History of pierce points in fabric-space (relative to start of pattern)
  pierces: PiercePoint[];
  // Center of the needle's horizontal axis (set by renderer based on canvas width)
  needleX: number;
  // Y of the needle's pierce line in canvas (the line where needle meets fabric)
  needleY: number;
};

export function createInitialState(config: StitchConfig, needleX: number, needleY: number): EngineState {
  return {
    config,
    currentStitch: 0,
    phase: 0,
    fabricAdvance: 0,
    pierces: [],
    needleX,
    needleY,
  };
}

// Advance the simulation by dt seconds at given speed (1 = nominal). Returns new state.
export function tick(state: EngineState, dtSeconds: number, speed: number, stitchesPerSecond: number): EngineState {
  const phaseRate = stitchesPerSecond * speed;
  let { phase, currentStitch, fabricAdvance, pierces } = state;
  const { config, needleX, needleY } = state;

  phase += dtSeconds * phaseRate;

  while (phase >= 1) {
    phase -= 1;
    // Stitch just completed at the bottom dwell of this index. Record pierce + advance fabric.
    const instance = config.getStitch(currentStitch);
    const px = needleX + instance.lateralOffset * (config.stitchWidth / 2);
    // The pierce was made when fabricAdvance was at its CURRENT value (before this stitch's advance)
    pierces = [...pierces, { x: px, y: needleY - fabricAdvance }];
    fabricAdvance += instance.advance * config.stitchLength;
    currentStitch += 1;
    if (currentStitch >= config.totalStitches) {
      if (config.loop) currentStitch = 0;
      else {
        currentStitch = config.totalStitches; // done
        phase = 0;
        break;
      }
    }
  }

  return { ...state, phase, currentStitch, fabricAdvance, pierces };
}

export function stepForward(state: EngineState): EngineState {
  // Advance to the next completed pierce.
  return tick(state, 1, 1, 1); // 1 stitch / sec for 1 sec = 1 stitch
}

export function reset(state: EngineState): EngineState {
  return createInitialState(state.config, state.needleX, state.needleY);
}

// Compute the current needle vertical position from phase.
// phase 0 -> top, phase 0.5 -> bottom (in fabric), phase 1 -> top again.
// Returns a value in 0..1 where 0 = fully raised, 1 = fully descended.
export function needleDescent(phase: number): number {
  return Math.sin(Math.PI * phase);
}

// What is the current intended pierce X (for the upcoming stitch)?
export function currentPierceX(state: EngineState): number {
  if (state.currentStitch >= state.config.totalStitches) return state.needleX;
  const inst: StitchInstance = state.config.getStitch(state.currentStitch);
  return state.needleX + inst.lateralOffset * (state.config.stitchWidth / 2);
}
