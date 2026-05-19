export type StitchKind = "straight" | "zigzag" | "buttonhole";

export type StitchInstance = {
  // Lateral offset of this stitch in normalized units (-1..1 maps to stitchWidth)
  lateralOffset: number;
  // How far to advance the fabric AFTER this stitch (in stitch-length units)
  advance: number;
  // Optional stage label, used by buttonhole
  stage?: string;
};

export type StitchConfig = {
  kind: StitchKind;
  displayName: string;
  // Total stitches the pattern will produce. For looping patterns (straight, zigzag),
  // the simulator wraps around using `loop`. For buttonhole it's a fixed program.
  totalStitches: number;
  loop: boolean;
  // Default nominal stitch length in canvas units (px-equivalents at render time)
  stitchLength: number;
  // Default lateral swing width (px-equivalents). 0 for pure straight.
  stitchWidth: number;
  // Description for a11y / reduced-motion fallback
  description: string;
  getStitch(i: number): StitchInstance;
};

export const STRAIGHT: StitchConfig = {
  kind: "straight",
  displayName: "Straight stitch",
  totalStitches: 12,
  loop: true,
  stitchLength: 28,
  stitchWidth: 0,
  description:
    "A straight stitch is a line of evenly spaced punctures. The needle moves up and down in one place; the feed dogs advance the fabric a small, consistent amount between each puncture.",
  getStitch: () => ({ lateralOffset: 0, advance: 1 }),
};

export const ZIGZAG: StitchConfig = {
  kind: "zigzag",
  displayName: "Zigzag",
  totalStitches: 14,
  loop: true,
  stitchLength: 22,
  stitchWidth: 32,
  description:
    "A zigzag alternates the needle's lateral position from left to right between each puncture, producing a side-to-side stitch that can stretch with the fabric or wrap around a raw edge.",
  getStitch: (i: number) => ({
    lateralOffset: i % 2 === 0 ? -1 : 1,
    advance: 1,
  }),
};

// Buttonhole: left rail of tight zigzag → bartack → right rail of tight zigzag → bartack
const BH_RAIL_STITCHES = 10;
const BH_BARTACK_STITCHES = 5;
const BH_TOTAL = BH_RAIL_STITCHES * 2 + BH_BARTACK_STITCHES * 2;

export const BUTTONHOLE: StitchConfig = {
  kind: "buttonhole",
  displayName: "Buttonhole",
  totalStitches: BH_TOTAL,
  loop: false,
  stitchLength: 8,
  stitchWidth: 22,
  description:
    "A buttonhole runs two parallel rails of tight zigzag stitching with a perpendicular bartack at each end. After sewing, the slit is cut between the rails so a button can pass through.",
  getStitch: (i: number) => {
    // Phase 1: left rail (advances forward, lateral on left side: -1 to 0)
    if (i < BH_RAIL_STITCHES) {
      return {
        lateralOffset: i % 2 === 0 ? -1 : 0,
        advance: 1,
        stage: "left rail",
      };
    }
    // Phase 2: bartack at far end (no advance, full-width zigzag)
    if (i < BH_RAIL_STITCHES + BH_BARTACK_STITCHES) {
      return {
        lateralOffset: i % 2 === 0 ? -1 : 1,
        advance: 0,
        stage: "bartack (far)",
      };
    }
    // Phase 3: right rail (advances BACKWARD; we model this with negative advance)
    if (i < BH_RAIL_STITCHES * 2 + BH_BARTACK_STITCHES) {
      return {
        lateralOffset: i % 2 === 0 ? 1 : 0,
        advance: -1,
        stage: "right rail",
      };
    }
    // Phase 4: bartack at near end
    return {
      lateralOffset: i % 2 === 0 ? -1 : 1,
      advance: 0,
      stage: "bartack (near)",
    };
  },
};

export const STITCH_CONFIGS: Record<StitchKind, StitchConfig> = {
  straight: STRAIGHT,
  zigzag: ZIGZAG,
  buttonhole: BUTTONHOLE,
};
