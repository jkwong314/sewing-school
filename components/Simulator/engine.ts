import type { StitchConfig, StitchInstance } from "./stitches";

export type PiercePoint = {
  x: number;        // Canvas x
  fabricY: number;  // Stored at "needleY - fabricAdvance at pierce time"
  stitchIndex: number;
  stage?: string;
  lateralOffset: number;
};

export type EngineState = {
  config: StitchConfig;
  currentStitch: number;
  phase: number;        // 0..1 within current stitch cycle
  fabricAdvance: number; // Smooth, continuous; pixel units
  pierces: PiercePoint[];
  needleX: number;       // Canvas-space x of the needle column
  needleY: number;       // Canvas-space y where the needle meets the fabric
  finished: boolean;
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
    finished: false,
  };
}

// Get the current stitch instance, looping/clamping appropriately
function getInstance(config: StitchConfig, index: number): StitchInstance {
  if (index >= config.totalStitches) {
    if (config.loop) return config.getStitch(index % config.totalStitches);
    return { lateralOffset: 0, advance: 0 };
  }
  return config.getStitch(index);
}

export function tick(
  state: EngineState,
  dtSeconds: number,
  speed: number,
  stitchesPerSecond: number,
): EngineState {
  if (state.finished) return state;
  const phaseRate = stitchesPerSecond * speed;
  let { phase, currentStitch, fabricAdvance, pierces } = state;
  let finished: boolean = state.finished;
  const { config, needleX, needleY } = state;

  const dPhase = dtSeconds * phaseRate;

  // The fabric advances continuously during the cycle, scaled by the CURRENT stitch's advance.
  // This produces smooth motion proportional to phase progress.
  const upcoming = getInstance(config, currentStitch);
  fabricAdvance += dPhase * upcoming.advance * config.stitchLength;

  phase += dPhase;

  // Wrap phase, recording a pierce per completed cycle.
  while (phase >= 1) {
    phase -= 1;
    const instance = getInstance(config, currentStitch);
    const px = needleX + instance.lateralOffset * (config.stitchWidth / 2);
    pierces = [
      ...pierces,
      {
        x: px,
        fabricY: needleY - fabricAdvance,
        stitchIndex: currentStitch,
        stage: instance.stage,
        lateralOffset: instance.lateralOffset,
      },
    ];
    currentStitch += 1;
    if (currentStitch >= config.totalStitches) {
      if (config.loop) currentStitch = 0;
      else {
        finished = true;
        phase = 0;
        break;
      }
    }
  }

  return { ...state, phase, currentStitch, fabricAdvance, pierces, finished };
}

export function stepForward(state: EngineState): EngineState {
  if (state.finished) return state;
  // Advance to next pierce: roughly 1 stitch
  return tick(state, 1, 1, 1);
}

export function reset(state: EngineState): EngineState {
  return createInitialState(state.config, state.needleX, state.needleY);
}

// Needle vertical descent normalized 0..1 (0 = up, 1 = at bottom dwell)
export function needleDescent(phase: number): number {
  return Math.sin(Math.PI * phase);
}

export function currentPierceX(state: EngineState): number {
  const inst = getInstance(state.config, state.currentStitch);
  return state.needleX + inst.lateralOffset * (state.config.stitchWidth / 2);
}

export function currentStage(state: EngineState): string | undefined {
  const inst = getInstance(state.config, state.currentStitch);
  return inst.stage;
}
