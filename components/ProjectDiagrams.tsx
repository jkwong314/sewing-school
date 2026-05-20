/**
 * Per-section diagrams for project walkthroughs.
 * Each is an inline SVG sized to fill its container.
 */

const C = {
  cream: "#faf6ee",
  creamDeep: "#f5efe2",
  ink: "#3a2e22",
  inkSoft: "#5a4632",
  brown: "#7a4a2b",
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
  "aria-hidden": true,
};

/** Hem jeans: measure the desired length on the wearer */
export function JeansMeasureDiagram() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Person standing — abstract outline */}
      <g fill="none" stroke={C.ink} strokeWidth="1.5">
        {/* Torso */}
        <path d="M170 30 L230 30 L235 75 L165 75 Z" fill={C.cream} />
        {/* Belt */}
        <line x1={165} y1={75} x2={235} y2={75} strokeWidth="2" />
      </g>
      {/* Original-length jeans (excess shown as semi-transparent) */}
      <g>
        {/* Full-length jean shape (the original) */}
        <path d="M165 75 L235 75 L228 200 L172 200 Z" fill={C.denim} opacity="0.45" />
        {/* Folded-up part overlay showing the new length */}
        <path d="M165 75 L235 75 L232 160 L168 160 Z" fill={C.denim} />
        {/* Fold line where the cuff sits */}
        <line x1={168} y1={160} x2={232} y2={160} stroke={C.blushDeep} strokeWidth="2.5" strokeDasharray="4,3" />
        {/* Original hem at original length */}
        <line x1={172} y1={195} x2={228} y2={195} stroke={C.ink} strokeWidth="2" />
        {/* "Fold to here" indicator */}
        <g stroke={C.blushDeep} strokeWidth="1.5" fill="none">
          <line x1={260} y1={160} x2={290} y2={160} />
          <text x={295} y={155} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.ink}>
            new length
          </text>
          <text x={295} y={170} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
            (fold here)
          </text>
        </g>
        {/* Excess label */}
        <g>
          <line x1={290} y1={180} x2={260} y2={180} stroke={C.inkSoft} strokeWidth="1" />
          <text x={295} y={184} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
            excess to trim
          </text>
        </g>
      </g>
      {/* Shoes */}
      <g fill={C.ink}>
        <ellipse cx={185} cy={205} rx={15} ry={5} />
        <ellipse cx={215} cy={205} rx={15} ry={5} />
      </g>
    </svg>
  );
}

/** Hem jeans: cross-section of the folded cuff showing the new stitch line */
export function JeansFoldCrossSection() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Diagrammatic side view of one leg cuff */}
      {/* Outer fabric (the visible outside of the jeans) */}
      <g>
        <rect x={60} y={30} width={280} height={28} fill={C.denim} />
        <text x={350} y={48} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
          outside
        </text>
      </g>
      {/* The fold — fabric goes up then doubles down inside */}
      <g>
        {/* Inner fold layer (the bit folded inside) */}
        <rect x={60} y={62} width={280} height={28} fill={C.denimLight} />
        <text x={350} y={80} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
          fold (inside)
        </text>
      </g>
      {/* Factory hem — represented as a folded edge with stitching */}
      <g>
        <rect x={60} y={92} width={280} height={20} fill={C.denimDeep} />
        <line x1={60} y1={105} x2={340} y2={105} stroke={C.cream} strokeWidth="1" strokeDasharray="6,4" />
        <text x={350} y={104} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
          factory hem
        </text>
      </g>
      {/* NEW stitch line — drawn just above factory hem */}
      <g>
        <line x1={70} y1={88} x2={330} y2={88} stroke={C.blushDeep} strokeWidth="2.5" strokeDasharray="6,3" />
        <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.blushDeep}>
          <text x={70} y={75}>new stitch line — just above the factory hem</text>
        </g>
        {/* Arrow pointing to new stitch */}
        <line x1={200} y1={140} x2={200} y2={92} stroke={C.blushDeep} strokeWidth="1.5" />
        <polygon points="195,98 200,90 205,98" fill={C.blushDeep} />
        <text x={130} y={158} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.blushDeep}>
          stitch 1–2mm above the original
        </text>
      </g>
      {/* Cut-here line — for after sewing */}
      <g>
        <line x1={70} y1={172} x2={330} y2={172} stroke={C.ink} strokeWidth="1" strokeDasharray="3,3" />
        <text x={140} y={188} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.ink}>
          ✂ trim excess below (~1cm)
        </text>
      </g>
    </svg>
  );
}

/** Hem jeans: zoomed-in close-up showing the new stitch right above the original */
export function JeansStitchCloseup() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Denim background with weave */}
      <rect x={20} y={20} width={360} height={185} fill={C.denim} />
      <g stroke={C.denimDeep} strokeWidth="0.5" opacity="0.5">
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={i} x1={20} y1={25 + i * 5} x2={380} y2={25 + i * 5} />
        ))}
      </g>
      {/* Factory hem stitching line */}
      <g stroke={C.cream} strokeWidth="2.5" strokeDasharray="10,5">
        <line x1={30} y1={150} x2={370} y2={150} />
      </g>
      {/* "factory hem" label */}
      <g fontFamily="ui-monospace,monospace" fontSize="11">
        <text x={30} y={175} fill={C.cream}>factory hem (don&rsquo;t touch)</text>
      </g>
      {/* New stitch line — close above */}
      <g stroke={C.blushDeep} strokeWidth="2" strokeDasharray="8,4">
        <line x1={30} y1={120} x2={370} y2={120} />
      </g>
      <g fontFamily="ui-monospace,monospace" fontSize="11">
        <text x={30} y={105} fill={C.blushDeep}>new stitch line — 1 to 2 mm above</text>
      </g>
      {/* Pin pointing perpendicular to the seam */}
      <g>
        <line x1={180} y1={60} x2={195} y2={130} stroke={C.cream} strokeWidth="1.5" />
        <circle cx={181} cy={58} r={3} fill={C.blushDeep} />
      </g>
    </svg>
  );
}

/** Hem jeans: finished cuff after pressing — factory hem visibly at the new length */
export function JeansFinishedDiagram() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Pant leg from outside, showing the finished hem at new length */}
      <g>
        <path d="M120 30 L280 30 L264 200 L136 200 Z" fill={C.denim} />
        {/* Factory hem — now at the new (shorter) length, indistinguishable from original */}
        <line x1={136} y1={190} x2={264} y2={190} stroke={C.cream} strokeWidth="2" strokeDasharray="6,4" />
        {/* Side seam */}
        <line x1={140} y1={40} x2={140} y2={190} stroke={C.denimDeep} strokeWidth="1" strokeDasharray="3,2" />
        <line x1={260} y1={40} x2={260} y2={190} stroke={C.denimDeep} strokeWidth="1" strokeDasharray="3,2" />
      </g>
      {/* Annotations */}
      <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
        <text x={285} y={195}>original factory hem,</text>
        <text x={285} y={208}>now at new length</text>
      </g>
      {/* Hidden-inside annotation */}
      <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.brown}>
        <text x={30} y={195}>new stitching</text>
        <text x={30} y={208}>tucked inside</text>
      </g>
      {/* Connector arrow */}
      <line x1={100} y1={195} x2={135} y2={185} stroke={C.brown} strokeWidth="1" />
    </svg>
  );
}

/** Ruffle skirt: cut two rectangles to size */
export function RuffleCutDiagram() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Two fabric rectangles */}
      <g>
        <rect x={30} y={40} width={155} height={150} fill={C.blush} stroke={C.ink} strokeWidth="1.5" />
        <rect x={215} y={40} width={155} height={150} fill={C.blush} stroke={C.ink} strokeWidth="1.5" />
      </g>
      {/* Width labels */}
      <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.ink}>
        <line x1={30} y1={20} x2={185} y2={20} stroke={C.ink} strokeWidth="1" />
        <polygon points="30,17 38,20 30,23" fill={C.ink} />
        <polygon points="185,17 177,20 185,23" fill={C.ink} />
        <text x={75} y={15} fill={C.ink}>waist × 1</text>
      </g>
      <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.ink}>
        <line x1={215} y1={20} x2={370} y2={20} stroke={C.ink} strokeWidth="1" />
        <polygon points="215,17 223,20 215,23" fill={C.ink} />
        <polygon points="370,17 362,20 370,23" fill={C.ink} />
        <text x={260} y={15} fill={C.ink}>waist × 1</text>
      </g>
      {/* Height label */}
      <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.ink}>
        <line x1={10} y1={40} x2={10} y2={190} stroke={C.ink} strokeWidth="1" />
        <polygon points="7,40 10,48 13,40" fill={C.ink} />
        <polygon points="7,190 10,182 13,190" fill={C.ink} />
        <text x={15} y={120} fill={C.ink}>length</text>
        <text x={15} y={133} fill={C.ink}>+ 6 cm</text>
      </g>
      {/* Top edge labels */}
      <g fontFamily="ui-monospace,monospace" fontSize="10" fill={C.blushDeep}>
        <text x={75} y={56}>top (waistband)</text>
        <text x={260} y={56}>top (waistband)</text>
      </g>
    </svg>
  );
}

/** Ruffle skirt: side seams sewn — rectangles become a tube */
export function RuffleTubeDiagram() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Tube viewed from above */}
      <g>
        <ellipse cx={200} cy={70} rx={120} ry={30} fill={C.blush} stroke={C.ink} strokeWidth="1.5" />
        <path d="M80 70 L80 180 Q200 220 320 180 L320 70 Z" fill={C.blush} stroke="none" />
        <line x1={80} y1={70} x2={80} y2={180} stroke={C.ink} strokeWidth="1.5" />
        <line x1={320} y1={70} x2={320} y2={180} stroke={C.ink} strokeWidth="1.5" />
        <path d="M80 180 Q200 220 320 180" fill="none" stroke={C.ink} strokeWidth="1.5" />
      </g>
      {/* Side seams highlighted on the cylinder edges */}
      <g stroke={C.blushDeep} strokeWidth="2.5" strokeDasharray="6,3">
        <line x1={80} y1={70} x2={80} y2={180} />
        <line x1={320} y1={70} x2={320} y2={180} />
      </g>
      {/* Labels */}
      <g fontFamily="ui-monospace,monospace" fontSize="11">
        <text x={30} y={130} fill={C.blushDeep}>side seam</text>
        <text x={330} y={130} fill={C.blushDeep}>side seam</text>
        <text x={155} y={60} fill={C.brown}>top of skirt (open)</text>
      </g>
    </svg>
  );
}

/** Ruffle skirt: cross-section of folded waistband casing */
export function RuffleCasingCrossSection() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Side view of the folded top edge */}
      <g>
        {/* Outer skirt fabric coming up from below */}
        <rect x={60} y={150} width={280} height={50} fill={C.blush} />
        {/* The first fold (1 cm under) */}
        <rect x={60} y={130} width={280} height={20} fill={C.blush} stroke={C.ink} strokeWidth="0.5" />
        {/* Second fold (3 cm forming the casing) */}
        <rect x={60} y={90} width={280} height={40} fill={C.blush} stroke={C.ink} strokeWidth="0.5" />
      </g>
      {/* Stitch line near the bottom of the casing */}
      <g stroke={C.blushDeep} strokeWidth="2.5" strokeDasharray="6,3">
        <line x1={70} y1={130} x2={330} y2={130} />
      </g>
      {/* Elastic visualized as a circle inside the tunnel */}
      <g>
        <ellipse cx={200} cy={110} rx={120} ry={8} fill={C.inkSoft} opacity="0.35" />
        <line x1={80} y1={110} x2={320} y2={110} stroke={C.inkSoft} strokeWidth="6" strokeLinecap="round" opacity="0.4" />
      </g>
      {/* Labels */}
      <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
        <text x={70} y={108}>elastic threads through here</text>
        <text x={70} y={148} fill={C.blushDeep}>stitch line (leave 4 cm gap)</text>
        <text x={70} y={180}>skirt body</text>
      </g>
    </svg>
  );
}

/** Ruffle skirt: threading elastic with a safety pin */
export function RuffleElasticDiagram() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Casing tunnel (rectangle) */}
      <g>
        <rect x={40} y={80} width={320} height={64} fill={C.cream} stroke={C.ink} strokeWidth="1.5" />
        <line x1={40} y1={80} x2={360} y2={80} stroke={C.blushDeep} strokeWidth="2" strokeDasharray="6,3" />
        <line x1={40} y1={144} x2={360} y2={144} stroke={C.blushDeep} strokeWidth="2" strokeDasharray="6,3" />
      </g>
      {/* Gap on the left */}
      <rect x={40} y={80} width={50} height={64} fill={C.creamDeep} stroke="none" />
      <text x={48} y={75} fontFamily="ui-monospace,monospace" fontSize="10" fill={C.brown}>4 cm gap</text>
      {/* Elastic with safety pin */}
      <g>
        {/* Elastic strip — partially threaded */}
        <rect x={20} y={104} width={220} height={16} fill={C.inkSoft} rx={2} />
        {/* Safety pin at the leading edge */}
        <g transform="translate(240, 112)">
          <circle cx={0} cy={0} r={6} fill={C.brown} />
          <line x1={-6} y1={0} x2={-18} y2={-2} stroke={C.brown} strokeWidth="2.5" />
        </g>
      </g>
      {/* Direction arrow */}
      <g stroke={C.blushDeep} strokeWidth="1.5" fill="none">
        <line x1={140} y1={170} x2={280} y2={170} />
        <polygon points="275,166 285,170 275,174" fill={C.blushDeep} />
        <text x={180} y={190} fontFamily="ui-monospace,monospace" fontSize="11" fill={C.blushDeep}>
          push through the casing
        </text>
      </g>
    </svg>
  );
}

/** Ruffle skirt: double-fold hem cross-section */
export function RuffleHemCrossSection() {
  return (
    <svg viewBox="0 0 400 225" {...svgProps}>
      {/* Side view of the bottom edge */}
      <g>
        {/* Fabric body coming down */}
        <rect x={60} y={40} width={280} height={70} fill={C.blush} stroke={C.ink} strokeWidth="0.5" />
        {/* First fold under (1cm) */}
        <rect x={60} y={110} width={280} height={20} fill={C.blush} stroke={C.ink} strokeWidth="0.5" />
        {/* Second fold (1 cm — the visible hem) */}
        <rect x={60} y={130} width={280} height={20} fill={C.blush} stroke={C.ink} strokeWidth="0.5" />
      </g>
      {/* Stitch line near the top of the hem fold */}
      <g stroke={C.blushDeep} strokeWidth="2.5" strokeDasharray="6,3">
        <line x1={70} y1={132} x2={330} y2={132} />
      </g>
      {/* Labels */}
      <g fontFamily="ui-monospace,monospace" fontSize="11" fill={C.inkSoft}>
        <text x={70} y={75}>skirt body</text>
        <text x={70} y={170} fill={C.blushDeep}>stitch around 2 mm from upper fold</text>
        <text x={70} y={185}>raw edge hidden inside the double fold</text>
      </g>
    </svg>
  );
}
