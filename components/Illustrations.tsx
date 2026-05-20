/**
 * Inline SVG illustrations and previews for card heroes.
 * All sized to fill their container via width/height 100%.
 * Designed to fit the warm/crafty palette (cream + ink + brown + blush).
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
};

function Bg({ color = C.creamDeep }: { color?: string }) {
  return <rect x="0" y="0" width="200" height="120" fill={color} />;
}

export function StitchPreview({ kind }: { kind: "straight" | "zigzag" | "buttonhole" }) {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg />
      {kind === "straight" && (
        <g stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" fill={C.brown}>
          {Array.from({ length: 7 }).map((_, i) => {
            const x = 26 + i * 24;
            return (
              <g key={i}>
                <line x1={x} y1={60} x2={x + 16} y2={60} />
                <circle cx={x} cy={60} r={2.5} stroke="none" />
              </g>
            );
          })}
          <circle cx={26 + 7 * 24} cy={60} r={2.5} stroke="none" />
        </g>
      )}
      {kind === "zigzag" && (
        <g stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline
            points={
              Array.from({ length: 9 })
                .map((_, i) => `${20 + i * 22},${i % 2 === 0 ? 44 : 76}`)
                .join(" ")
            }
          />
          <g fill={C.brown} stroke="none">
            {Array.from({ length: 9 }).map((_, i) => (
              <circle key={i} cx={20 + i * 22} cy={i % 2 === 0 ? 44 : 76} r={2.5} />
            ))}
          </g>
        </g>
      )}
      {kind === "buttonhole" && (
        <g>
          {/* Two rails */}
          <g stroke={C.ink} strokeWidth="2" strokeLinecap="round">
            <line x1={40} y1={50} x2={160} y2={50} />
            <line x1={40} y1={70} x2={160} y2={70} />
            {/* Tight zigzag detail on rails */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`l-${i}`} x1={45 + i * 12} y1={48} x2={51 + i * 12} y2={52} strokeWidth="1.5" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`r-${i}`} x1={45 + i * 12} y1={68} x2={51 + i * 12} y2={72} strokeWidth="1.5" />
            ))}
            {/* Bartacks */}
            <line x1={40} y1={48} x2={40} y2={72} strokeWidth="3.5" />
            <line x1={160} y1={48} x2={160} y2={72} strokeWidth="3.5" />
          </g>
          {/* Cut line indicator */}
          <line x1={56} y1={60} x2={144} y2={60} stroke={C.blushDeep} strokeWidth="1" strokeDasharray="3,3" />
        </g>
      )}
    </svg>
  );
}

export function JeansHeroIllustration() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg color="#eaddc0" />
      {/* Jeans silhouette — two legs */}
      <g>
        {/* Waistband */}
        <path d="M50 20 L150 20 L155 38 L45 38 Z" fill={C.denim} />
        <line x1={50} y1={26} x2={150} y2={26} stroke={C.brown} strokeWidth="1" strokeDasharray="3,2" />
        <circle cx={100} cy={30} r={3} fill={C.brown} />
        {/* Left leg */}
        <path d="M45 38 L93 38 L88 110 L60 110 Z" fill={C.denim} />
        {/* Right leg */}
        <path d="M107 38 L155 38 L140 110 L112 110 Z" fill={C.denim} />
        {/* Center seam */}
        <line x1={100} y1={38} x2={100} y2={50} stroke={C.denimDeep} strokeWidth="1" strokeDasharray="2,2" />
        {/* Side seams */}
        <line x1={62} y1={50} x2={62} y2={106} stroke={C.denimDeep} strokeWidth="1" strokeDasharray="2,2" />
        <line x1={138} y1={50} x2={138} y2={106} stroke={C.denimDeep} strokeWidth="1" strokeDasharray="2,2" />
        {/* Hem stitching (highlight) */}
        <line x1={60} y1={102} x2={88} y2={102} stroke={C.blushDeep} strokeWidth="2" />
        <line x1={112} y1={102} x2={140} y2={102} stroke={C.blushDeep} strokeWidth="2" />
        {/* Fold indicators */}
        <path d="M60 110 L88 110 L86 105 L62 105 Z" fill={C.denimDeep} opacity="0.4" />
        <path d="M112 110 L140 110 L138 105 L114 105 Z" fill={C.denimDeep} opacity="0.4" />
      </g>
    </svg>
  );
}

export function RuffleSkirtIllustration() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg color="#f8ece6" />
      {/* Waistband band */}
      <rect x="62" y="22" width="76" height="14" fill={C.blushDeep} rx="2" />
      {/* Elastic bumps */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1={66 + i * 6} y1={22} x2={66 + i * 6} y2={36} stroke="#a35c5b" strokeWidth="1" />
      ))}
      {/* Skirt body — ruffled trapezoid */}
      <path d="M58 36 L142 36 L172 108 L28 108 Z" fill={C.blush} />
      {/* Pleats / gathered lines */}
      <g stroke="#d28e89" strokeWidth="1.2" fill="none">
        <line x1={64} y1={40} x2={42} y2={104} />
        <line x1={80} y1={40} x2={68} y2={104} />
        <line x1={100} y1={40} x2={100} y2={104} />
        <line x1={120} y1={40} x2={132} y2={104} />
        <line x1={136} y1={40} x2={158} y2={104} />
      </g>
      {/* Bottom hem stitching */}
      <path d="M28 108 L172 108" stroke={C.ink} strokeWidth="1.5" strokeDasharray="4,3" fill="none" />
      {/* Gather scallops at top */}
      <g fill={C.blushDeep}>
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={64 + i * 11} cy={36} r={1.6} />
        ))}
      </g>
    </svg>
  );
}

export function NeedleIcon() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg />
      <g stroke={C.ink} strokeWidth="3" strokeLinecap="round" fill="none">
        <line x1={50} y1={30} x2={150} y2={90} />
      </g>
      {/* Needle eye */}
      <ellipse cx={60} cy={36} rx={3} ry={5} transform="rotate(31 60 36)" fill={C.cream} stroke={C.ink} strokeWidth="1" />
      {/* Thread */}
      <path d="M40 40 Q60 32 65 38" stroke={C.blushDeep} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M20 28 Q35 38 40 40" stroke={C.blushDeep} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ThreadSpoolIcon() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg />
      {/* Top cap */}
      <ellipse cx={100} cy={30} rx={36} ry={6} fill={C.brown} />
      <rect x={64} y={30} width={72} height={60} fill={C.brown} opacity="0.15" />
      {/* Thread body */}
      <ellipse cx={100} cy={30} rx={32} ry={4} fill={C.blushDeep} />
      <rect x={68} y={30} width={64} height={56} fill={C.blushDeep} />
      {/* Thread coils */}
      <g stroke="#7a3939" strokeWidth="0.6">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={68} y1={34 + i * 4} x2={132} y2={34 + i * 4} />
        ))}
      </g>
      {/* Bottom cap */}
      <ellipse cx={100} cy={86} rx={32} ry={5} fill={C.brown} />
      <ellipse cx={100} cy={90} rx={36} ry={6} fill={C.brown} />
    </svg>
  );
}

export function FabricIcon() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg />
      {/* Folded fabric */}
      <path d="M40 80 L100 30 L160 80 L100 100 Z" fill={C.blush} stroke={C.ink} strokeWidth="1.5" />
      <path d="M100 30 L100 100" stroke={C.ink} strokeWidth="1" strokeDasharray="3,2" fill="none" />
      {/* Weave pattern */}
      <g stroke={C.brown} strokeWidth="0.5" opacity="0.4">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={60 + i * 5} y1={70 - i * 5} x2={140 + i * 5} y2={70 - i * 5} />
        ))}
      </g>
    </svg>
  );
}

export function ToolboxIcon() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg />
      {/* Wrench/spanner outline + question mark vibe */}
      <g stroke={C.ink} strokeWidth="2.5" fill="none" strokeLinecap="round">
        <circle cx={100} cy={60} r={28} />
        <line x1={100} y1={48} x2={100} y2={60} />
        <line x1={100} y1={66} x2={100} y2={68} />
      </g>
      <circle cx={100} cy={74} r={2} fill={C.ink} />
      {/* Decorative stitches */}
      <g stroke={C.blushDeep} strokeWidth="1.5" strokeDasharray="3,2" fill="none">
        <path d="M40 96 L160 96" />
      </g>
    </svg>
  );
}

export function ThreadingIcon() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg />
      {/* Spool */}
      <ellipse cx={50} cy={30} rx={14} ry={4} fill={C.brown} />
      <rect x={36} y={30} width={28} height={26} fill={C.blushDeep} />
      <ellipse cx={50} cy={56} rx={14} ry={4} fill={C.brown} />
      {/* Thread path */}
      <path
        d="M50 56 Q55 70 80 60 Q105 50 110 70 Q115 90 140 80 L140 96 L138 100 L142 100 L140 96"
        stroke={C.blushDeep}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Needle */}
      <g stroke={C.ink} strokeWidth="3" strokeLinecap="round">
        <line x1={140} y1={78} x2={140} y2={102} />
      </g>
    </svg>
  );
}

export function DialIcon() {
  return (
    <svg viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Bg />
      <g stroke={C.ink} strokeWidth="2" fill={C.cream}>
        <circle cx={100} cy={60} r={32} />
      </g>
      <g stroke={C.brown} strokeWidth="1.5">
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
          const x1 = 100 + Math.cos(a) * 26;
          const y1 = 60 + Math.sin(a) * 26;
          const x2 = 100 + Math.cos(a) * 32;
          const y2 = 60 + Math.sin(a) * 32;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* Indicator */}
      <line x1={100} y1={60} x2={120} y2={48} stroke={C.blushDeep} strokeWidth="3" strokeLinecap="round" />
      <circle cx={100} cy={60} r={3} fill={C.ink} />
    </svg>
  );
}
