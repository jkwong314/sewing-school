/**
 * Per-section diagrams for project walkthroughs.
 * All sized to viewBox 480×270 and labeled with WCAG-safe contrast pairs:
 *   - On cream/light backgrounds:  ink / brown / blushDeep text
 *   - On denim/dark backgrounds:   cream text
 * Labels stay inside the viewBox.
 */

const C = {
  cream: "#faf6ee",
  creamDeep: "#f5efe2",
  ink: "#3a2e22",
  inkSoft: "#5a4632",
  brown: "#7a4a2b",
  brownDeep: "#5a3a20",
  blush: "#e8a5a0",
  blushDeep: "#8e4544",
  border: "#c9a87a",
  denim: "#3b5d8a",
  denimDeep: "#2a426a",
  denimLight: "#6789b3",
};

const svgProps = {
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMid meet" as const,
  "aria-hidden": true as const,
};

const FONT = "ui-monospace,SFMono-Regular,Menlo,monospace";

/* ──────────────────────────────────────────────────────────────────────── */
/* HEM JEANS                                                                 */
/* ──────────────────────────────────────────────────────────────────────── */

/** Hem jeans: measure the desired length on the wearer */
export function JeansMeasureDiagram() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Torso */}
      <path d="M180 30 L260 30 L268 90 L172 90 Z" fill={C.creamDeep} stroke={C.ink} strokeWidth="1.5" />
      <line x1={172} y1={90} x2={268} y2={90} stroke={C.ink} strokeWidth="2.5" />

      {/* Full-length jeans (translucent — show the original length) */}
      <path d="M172 90 L268 90 L260 240 L180 240 Z" fill={C.denim} opacity="0.35" />

      {/* New (folded) length — opaque */}
      <path d="M172 90 L268 90 L264 190 L176 190 Z" fill={C.denim} />

      {/* New hem location — fold line */}
      <line x1={176} y1={190} x2={264} y2={190} stroke={C.blushDeep} strokeWidth="3" strokeDasharray="5,3" />

      {/* Original hem */}
      <line x1={180} y1={235} x2={260} y2={235} stroke={C.ink} strokeWidth="2" />

      {/* Shoes */}
      <ellipse cx={200} cy={250} rx={16} ry={5} fill={C.ink} />
      <ellipse cx={240} cy={250} rx={16} ry={5} fill={C.ink} />

      {/* Annotations on the right (within bounds) */}
      <g fontFamily={FONT} fontSize="13" fill={C.blushDeep}>
        <line x1={290} y1={190} x2={310} y2={190} stroke={C.blushDeep} strokeWidth="1.5" />
        <text x={315} y={186}>new length</text>
        <text x={315} y={200} fill={C.inkSoft} fontSize="11">(fold here)</text>
      </g>

      <g fontFamily={FONT} fontSize="11" fill={C.inkSoft}>
        <line x1={290} y1={235} x2={310} y2={235} stroke={C.inkSoft} strokeWidth="1" />
        <text x={315} y={239}>original hem</text>
      </g>

      <g fontFamily={FONT} fontSize="11" fill={C.brown}>
        <line x1={290} y1={213} x2={310} y2={213} stroke={C.brown} strokeWidth="1" />
        <text x={315} y={217}>excess to trim</text>
      </g>
    </svg>
  );
}

/** Hem jeans: side-view cross-section of the folded cuff while sewing.
 * Shows the U-fold: outer leg coming down, folding back up inside, with the
 * factory hem now pointing up into the leg cavity and the new stitch line
 * passing through BOTH layers just outboard of where the factory hem ends. */
export function JeansFoldCrossSection() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Title */}
      <text x={240} y={26} textAnchor="middle" fontFamily={FONT} fontSize="13" fill={C.ink} fontWeight="bold">
        SIDE VIEW: THE U-FOLD WHILE YOU SEW
      </text>

      {/* Knee direction arrow */}
      <g fill={C.inkSoft} fontFamily={FONT} fontSize="10">
        <text x={20} y={50}>↑ toward knee</text>
      </g>
      {/* Cuff edge direction arrow */}
      <g fill={C.inkSoft} fontFamily={FONT} fontSize="10">
        <text x={20} y={260}>↓ visible cuff edge</text>
      </g>

      {/* The folded cuff drawn as a U-path:
          - Outer leg comes DOWN on the left (from y=40 to y=215)
          - Curves around the bottom (the cuff fold)
          - Inside-fold layer goes back UP on the right, shorter (terminates at y=110)
       */}
      <path
        d="M 192 40
           L 192 215
           Q 192 235 212 235
           L 268 235
           Q 288 235 288 215
           L 288 110
           L 252 110
           L 252 215
           L 228 215
           L 228 40 Z"
        fill={C.denim}
        stroke={C.ink}
        strokeWidth="1.5"
      />

      {/* Factory hem stitching — sits at the TOP of the inside-fold layer
          (the inner layer is inverted, so the original bottom-of-jeans is here) */}
      <line x1={252} y1={125} x2={288} y2={125} stroke={C.cream} strokeWidth="2" strokeDasharray="5,3" />

      {/* NEW stitch line — crosses BOTH layers, slightly above the factory hem
          (above in this view = toward the knee, which is "above" in original
          orientation too) */}
      <line x1={170} y1={100} x2={310} y2={100} stroke={C.blush} strokeWidth="3" strokeDasharray="8,4" />

      {/* Left-side label for the outer leg */}
      <g fontFamily={FONT} fontSize="12" fill={C.ink}>
        <line x1={150} y1={170} x2={188} y2={150} stroke={C.ink} strokeWidth="1" />
        <text x={146} y={172} textAnchor="end">outer leg</text>
        <text x={146} y={186} textAnchor="end" fontSize="10" fill={C.inkSoft}>
          (visible side)
        </text>
      </g>

      {/* Right-side label for the inside fold */}
      <g fontFamily={FONT} fontSize="12" fill={C.ink}>
        <line x1={332} y1={170} x2={290} y2={150} stroke={C.ink} strokeWidth="1" />
        <text x={336} y={172}>inside of fold</text>
        <text x={336} y={186} fontSize="10" fill={C.inkSoft}>
          (excess, folded up)
        </text>
      </g>

      {/* Factory hem callout (right) */}
      <g fontFamily={FONT} fontSize="11" fill={C.brown}>
        <line x1={332} y1={125} x2={292} y2={125} stroke={C.brown} strokeWidth="1" />
        <text x={336} y={120}>factory hem stitching</text>
        <text x={336} y={134} fontSize="10" fill={C.inkSoft}>
          (now pointing up)
        </text>
      </g>

      {/* New stitch line callout (left) */}
      <g fontFamily={FONT}>
        <line x1={150} y1={100} x2={170} y2={100} stroke={C.blushDeep} strokeWidth="1.5" />
        <text x={146} y={94} textAnchor="end" fontSize="13" fill={C.blushDeep} fontWeight="bold">
          NEW STITCH LINE
        </text>
        <text x={146} y={108} textAnchor="end" fontSize="10" fill={C.brown}>
          through both layers,
        </text>
        <text x={146} y={120} textAnchor="end" fontSize="10" fill={C.brown}>
          1–2 mm above the factory hem
        </text>
      </g>
    </svg>
  );
}

/** Hem jeans: zoomed-in close-up showing the new stitch right above the original */
export function JeansStitchCloseup() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Denim background filling the frame */}
      <rect x={20} y={20} width={440} height={230} fill={C.denim} />

      {/* Subtle weave lines */}
      <g stroke={C.denimDeep} strokeWidth="0.5" opacity="0.4">
        {Array.from({ length: 36 }).map((_, i) => (
          <line key={i} x1={20} y1={25 + i * 6} x2={460} y2={25 + i * 6} />
        ))}
      </g>

      {/* Top label: NEW stitch line (cream on denim for contrast) */}
      <text x={240} y={75} textAnchor="middle" fontFamily={FONT} fontSize="14" fill={C.cream} fontWeight="bold">
        NEW STITCH LINE — 1 TO 2 MM ABOVE
      </text>

      {/* New stitch dashed line */}
      <line x1={40} y1={100} x2={440} y2={100} stroke={C.blush} strokeWidth="3" strokeDasharray="10,4" />

      {/* Gap area (the fabric between the two lines is where the magic happens) */}

      {/* Factory hem dashed line */}
      <line x1={40} y1={170} x2={440} y2={170} stroke={C.cream} strokeWidth="3" strokeDasharray="14,6" />

      {/* Bottom label: factory hem */}
      <text x={240} y={205} textAnchor="middle" fontFamily={FONT} fontSize="14" fill={C.cream} fontWeight="bold">
        FACTORY HEM (DON&apos;T TOUCH)
      </text>

      {/* Small pin in the corner — won't overlap labels */}
      <g>
        <line x1={62} y1={42} x2={92} y2={130} stroke={C.cream} strokeWidth="2" strokeLinecap="round" />
        <circle cx={61} cy={40} r={4} fill={C.blushDeep} stroke={C.cream} strokeWidth="1" />
      </g>
    </svg>
  );
}

/** Hem jeans: finished cuff after pressing — factory hem visibly at the new length */
export function JeansFinishedDiagram() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Pant leg from outside, finished hem at new length */}
      <path d="M170 30 L310 30 L294 240 L186 240 Z" fill={C.denim} />

      {/* Side seams */}
      <line x1={186} y1={36} x2={186} y2={234} stroke={C.denimDeep} strokeWidth="1" strokeDasharray="3,2" />
      <line x1={294} y1={36} x2={294} y2={234} stroke={C.denimDeep} strokeWidth="1" strokeDasharray="3,2" />

      {/* The factory hem — now at the new length */}
      <line x1={186} y1={228} x2={294} y2={228} stroke={C.cream} strokeWidth="2.5" strokeDasharray="8,4" />

      {/* Annotations — well inside the frame */}
      <g fontFamily={FONT} fontSize="12">
        {/* Left annotation */}
        <line x1={140} y1={150} x2={184} y2={170} stroke={C.brown} strokeWidth="1" />
        <text x={20} y={140} fill={C.brown}>NEW STITCHING</text>
        <text x={20} y={155} fill={C.brown}>TUCKED INSIDE</text>
        <text x={20} y={170} fill={C.inkSoft}>(invisible from outside)</text>

        {/* Right annotation */}
        <line x1={340} y1={222} x2={296} y2={228} stroke={C.inkSoft} strokeWidth="1" />
        <text x={345} y={222} fill={C.inkSoft}>ORIGINAL FACTORY HEM,</text>
        <text x={345} y={237} fill={C.inkSoft}>NOW AT THE NEW LENGTH</text>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/* RUFFLE SKIRT                                                              */
/* ──────────────────────────────────────────────────────────────────────── */

/** Ruffle skirt: cut two rectangles to size */
export function RuffleCutDiagram() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Two fabric rectangles, each labeled */}
      <rect x={50} y={70} width={170} height={160} fill={C.blush} stroke={C.ink} strokeWidth="1.5" />
      <rect x={260} y={70} width={170} height={160} fill={C.blush} stroke={C.ink} strokeWidth="1.5" />

      {/* Top edge label highlight */}
      <rect x={50} y={70} width={170} height={14} fill={C.blushDeep} />
      <rect x={260} y={70} width={170} height={14} fill={C.blushDeep} />
      <text x={135} y={81} textAnchor="middle" fontFamily={FONT} fontSize="11" fill={C.cream}>TOP (waistband)</text>
      <text x={345} y={81} textAnchor="middle" fontFamily={FONT} fontSize="11" fill={C.cream}>TOP (waistband)</text>

      {/* Width labels above each rectangle */}
      <g fontFamily={FONT} fontSize="12" fill={C.ink}>
        <line x1={50} y1={50} x2={220} y2={50} stroke={C.ink} strokeWidth="1" />
        <polygon points="50,47 58,50 50,53" fill={C.ink} />
        <polygon points="220,47 212,50 220,53" fill={C.ink} />
        <text x={135} y={42} textAnchor="middle">waist × 1</text>

        <line x1={260} y1={50} x2={430} y2={50} stroke={C.ink} strokeWidth="1" />
        <polygon points="260,47 268,50 260,53" fill={C.ink} />
        <polygon points="430,47 422,50 430,53" fill={C.ink} />
        <text x={345} y={42} textAnchor="middle">waist × 1</text>
      </g>

      {/* Total width below */}
      <g fontFamily={FONT} fontSize="11" fill={C.brown}>
        <text x={240} y={250} textAnchor="middle">two rectangles together = waist × 2</text>
      </g>

      {/* Height label on the left, inside the frame */}
      <g fontFamily={FONT} fontSize="12" fill={C.ink}>
        <line x1={32} y1={70} x2={32} y2={230} stroke={C.ink} strokeWidth="1" />
        <polygon points="29,70 32,78 35,70" fill={C.ink} />
        <polygon points="29,230 32,222 35,230" fill={C.ink} />
        <text x={36} y={148} fill={C.ink}>length + 6 cm</text>
      </g>
    </svg>
  );
}

/** Ruffle skirt: side seams sewn — rectangles become a tube */
export function RuffleTubeDiagram() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Tube viewed slightly from above */}
      <ellipse cx={240} cy={70} rx={140} ry={32} fill={C.blush} stroke={C.ink} strokeWidth="1.5" />
      <path d="M100 70 L100 200 Q240 240 380 200 L380 70 Z" fill={C.blush} stroke="none" />
      <line x1={100} y1={70} x2={100} y2={200} stroke={C.ink} strokeWidth="1.5" />
      <line x1={380} y1={70} x2={380} y2={200} stroke={C.ink} strokeWidth="1.5" />
      <path d="M100 200 Q240 240 380 200" fill="none" stroke={C.ink} strokeWidth="1.5" />

      {/* Side seams highlighted */}
      <line x1={100} y1={70} x2={100} y2={200} stroke={C.blushDeep} strokeWidth="3" strokeDasharray="6,3" />
      <line x1={380} y1={70} x2={380} y2={200} stroke={C.blushDeep} strokeWidth="3" strokeDasharray="6,3" />

      {/* Labels — placed clear of the cylinder */}
      <g fontFamily={FONT} fontSize="12">
        <text x={50} y={140} textAnchor="middle" fill={C.blushDeep} fontWeight="bold">SIDE</text>
        <text x={50} y={155} textAnchor="middle" fill={C.blushDeep} fontWeight="bold">SEAM</text>
        <text x={430} y={140} textAnchor="middle" fill={C.blushDeep} fontWeight="bold">SIDE</text>
        <text x={430} y={155} textAnchor="middle" fill={C.blushDeep} fontWeight="bold">SEAM</text>
        <text x={240} y={250} textAnchor="middle" fill={C.brown}>top of skirt — still open</text>
      </g>
    </svg>
  );
}

/** Ruffle skirt: cross-section of folded waistband casing */
export function RuffleCasingCrossSection() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Side view of the folded top edge */}

      {/* Skirt body (lowest section, below the casing) */}
      <rect x={60} y={170} width={360} height={70} fill={C.blush} />
      <text x={240} y={210} textAnchor="middle" fontFamily={FONT} fontSize="12" fill={C.cream} fontWeight="bold">
        SKIRT BODY
      </text>

      {/* First fold (1 cm) */}
      <rect x={60} y={150} width={360} height={20} fill={C.blush} stroke={C.ink} strokeWidth="0.5" opacity="0.95" />

      {/* Second fold (3 cm tunnel) */}
      <rect x={60} y={100} width={360} height={50} fill={C.blush} stroke={C.ink} strokeWidth="0.5" opacity="0.85" />

      {/* Tunnel interior — elastic visible */}
      <line x1={80} y1={125} x2={400} y2={125} stroke={C.ink} strokeWidth="8" strokeLinecap="round" opacity="0.5" />
      <text x={240} y={129} textAnchor="middle" fontFamily={FONT} fontSize="11" fill={C.cream} fontWeight="bold">
        ELASTIC THREADS THROUGH HERE
      </text>

      {/* Stitch line near the bottom of the casing */}
      <line x1={80} y1={150} x2={400} y2={150} stroke={C.blushDeep} strokeWidth="3" strokeDasharray="6,3" />
      <text x={240} y={167} textAnchor="middle" fontFamily={FONT} fontSize="11" fill={C.blushDeep} fontWeight="bold">
        STITCH LINE (LEAVE A 4 CM GAP)
      </text>

      {/* Header */}
      <text x={240} y={50} textAnchor="middle" fontFamily={FONT} fontSize="13" fill={C.ink} fontWeight="bold">
        SIDE VIEW: THE FOLDED CASING
      </text>
      <text x={240} y={68} textAnchor="middle" fontFamily={FONT} fontSize="11" fill={C.inkSoft}>
        fold the top edge down 1 cm, then down another 3 cm
      </text>
    </svg>
  );
}

/** Ruffle skirt: threading elastic with a safety pin */
export function RuffleElasticDiagram() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Casing tunnel (a tall flat rectangle) */}
      <rect x={50} y={100} width={380} height={70} fill={C.cream} stroke={C.ink} strokeWidth="1.5" />
      <line x1={50} y1={100} x2={430} y2={100} stroke={C.blushDeep} strokeWidth="2.5" strokeDasharray="6,3" />
      <line x1={50} y1={170} x2={430} y2={170} stroke={C.blushDeep} strokeWidth="2.5" strokeDasharray="6,3" />

      {/* Gap on the left (showing where the elastic enters) */}
      <rect x={50} y={100} width={60} height={70} fill={C.creamDeep} />
      <line x1={110} y1={100} x2={110} y2={170} stroke={C.ink} strokeWidth="1" strokeDasharray="2,2" />
      <text x={80} y={92} textAnchor="middle" fontFamily={FONT} fontSize="11" fill={C.brown} fontWeight="bold">
        4 CM GAP
      </text>

      {/* Elastic — already partly threaded */}
      <rect x={30} y={128} width={250} height={16} fill={C.inkSoft} rx={3} />

      {/* Safety pin at the leading edge */}
      <g transform="translate(285, 136)">
        <circle cx={0} cy={0} r={8} fill={C.brown} />
        <circle cx={0} cy={0} r={3} fill={C.cream} />
        <line x1={-7} y1={0} x2={-22} y2={-3} stroke={C.brown} strokeWidth="3" />
      </g>

      {/* Direction arrow below the casing */}
      <line x1={170} y1={210} x2={350} y2={210} stroke={C.blushDeep} strokeWidth="2" />
      <polygon points="345,205 358,210 345,215" fill={C.blushDeep} />
      <text x={260} y={235} textAnchor="middle" fontFamily={FONT} fontSize="13" fill={C.blushDeep} fontWeight="bold">
        PUSH THE PIN ALL THE WAY THROUGH
      </text>
    </svg>
  );
}

/** Ruffle skirt: double-fold hem cross-section */
export function RuffleHemCrossSection() {
  return (
    <svg viewBox="0 0 480 270" {...svgProps}>
      {/* Skirt body coming down */}
      <rect x={60} y={40} width={360} height={100} fill={C.blush} />
      <text x={240} y={95} textAnchor="middle" fontFamily={FONT} fontSize="12" fill={C.cream} fontWeight="bold">
        SKIRT BODY
      </text>

      {/* First fold (1 cm) */}
      <rect x={60} y={140} width={360} height={20} fill={C.blush} stroke={C.ink} strokeWidth="0.5" opacity="0.92" />

      {/* Second fold (1 cm — visible hem) */}
      <rect x={60} y={160} width={360} height={20} fill={C.blush} stroke={C.ink} strokeWidth="0.5" opacity="0.85" />

      {/* Stitch line near the top of the hem fold */}
      <line x1={80} y1={163} x2={400} y2={163} stroke={C.blushDeep} strokeWidth="3" strokeDasharray="6,3" />

      {/* Labels below */}
      <g fontFamily={FONT} fontSize="11">
        <text x={240} y={205} textAnchor="middle" fill={C.blushDeep} fontWeight="bold">
          STITCH 2 MM FROM THE UPPER FOLDED EDGE
        </text>
        <text x={240} y={224} textAnchor="middle" fill={C.inkSoft}>
          the raw edge is hidden inside the double fold
        </text>
      </g>

      {/* Header */}
      <text x={240} y={28} textAnchor="middle" fontFamily={FONT} fontSize="13" fill={C.ink} fontWeight="bold">
        DOUBLE-FOLD HEM — SIDE VIEW
      </text>
    </svg>
  );
}
