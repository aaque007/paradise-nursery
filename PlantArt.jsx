// A small illustration system: each plant declares a `variant` and a couple
// of colors, and this component renders a distinct hand-built SVG for it.
// Keeps the catalog dependency-free (no external image hosting) while still
// giving every plant its own silhouette.

function Pot({ color = '#A8593A' }) {
  return (
    <g>
      <path d="M34 96 L86 96 L80 130 Q60 136 40 130 Z" fill={color} />
      <rect x="30" y="88" width="60" height="10" rx="3" fill={color} />
    </g>
  );
}

function Blade({ leaf, dark }) {
  // Snake plant: upright striped blades
  return (
    <g>
      <Pot />
      {[[-16, 0], [-6, -6], [6, -4], [16, 2]].map(([dx, rot], i) => (
        <g key={i} transform={`translate(${60 + dx} 90) rotate(${rot})`}>
          <path
            d="M0 0 C-8 -30 -6 -58 0 -76 C6 -58 8 -30 0 0 Z"
            fill={i % 2 === 0 ? leaf : dark}
          />
        </g>
      ))}
    </g>
  );
}

function Leafy({ leaf, dark }) {
  // Peace lily: broad glossy leaves with a pale bloom spike
  return (
    <g>
      <Pot />
      {[[-18, -10], [0, -6], [18, -10]].map(([dx, dy], i) => (
        <path
          key={i}
          d={`M${60 + dx} 92 C${44 + dx} ${60 + dy} ${48 + dx} ${30 + dy} ${62 + dx} ${18 + dy} C${74 + dx} ${30 + dy} ${76 + dx} ${60 + dy} ${60 + dx} 92 Z`}
          fill={i === 1 ? leaf : dark}
        />
      ))}
      <path d="M60 40 C58 26 60 16 64 8" stroke="#EDE6D2" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="65" cy="8" rx="5" ry="9" fill="#F6F1E4" />
    </g>
  );
}

function Palm({ leaf, dark }) {
  // Areca palm: arching fronds
  return (
    <g>
      <Pot />
      {[-40, -22, -4, 14, 32].map((rot, i) => (
        <g key={i} transform={`translate(60 92) rotate(${rot})`}>
          <path
            d="M0 0 C10 -24 30 -46 46 -54"
            stroke={i % 2 === 0 ? leaf : dark}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {[10, 20, 30, 40].map((t) => (
            <path
              key={t}
              d={`M${t * 0.9} ${-t * 0.95} l7 -6`}
              stroke={i % 2 === 0 ? leaf : dark}
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

function Rosette({ leaf, dark }) {
  // Echeveria: succulent rosette, no pot needed (often sold bare-root style)
  return (
    <g>
      <Pot color="#C7BBA0" />
      <circle cx="60" cy="80" r="6" fill={dark} />
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const r = 22;
        const x = 60 + Math.cos(angle) * r;
        const y = 80 + Math.sin(angle) * r * 0.6;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="12"
            ry="7"
            fill={i % 2 === 0 ? leaf : dark}
            transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
          />
        );
      })}
    </g>
  );
}

function Barrel({ leaf, dark }) {
  // Barrel cactus: round ribbed body with tiny blossom
  return (
    <g>
      <Pot color="#C7BBA0" />
      <ellipse cx="60" cy="70" rx="30" ry="26" fill={leaf} />
      {[-20, -10, 0, 10, 20].map((dx, i) => (
        <path key={i} d={`M${60 + dx} 46 Q${60 + dx * 1.3} 70 ${60 + dx} 94`} stroke={dark} strokeWidth="2" fill="none" opacity="0.6" />
      ))}
      <circle cx="60" cy="42" r="6" fill="#D9A441" />
    </g>
  );
}

function Jade({ leaf, dark }) {
  // Jade plant: branching stems with small round leaflets
  return (
    <g>
      <Pot />
      <path d="M60 92 C58 70 62 60 56 40 M60 70 C64 60 70 54 76 46 M58 62 C52 54 46 50 40 46" stroke={dark} strokeWidth="3" fill="none" strokeLinecap="round" />
      {[[56, 40], [76, 46], [40, 46], [62, 26], [50, 60], [70, 66]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={i % 2 === 0 ? leaf : dark} />
      ))}
    </g>
  );
}

function Flower({ leaf, dark, petal = '#C7527A', shape = 'oval' }) {
  // Shared flowering-plant body: leaves + a bloom cluster on top.
  const leafPath =
    shape === 'heart'
      ? 'M60 90 C40 78 38 54 60 40 C82 54 80 78 60 90 Z'
      : shape === 'round'
      ? 'M60 90 C40 84 36 60 60 46 C84 60 80 84 60 90 Z'
      : 'M60 90 C42 82 40 56 60 40 C80 56 78 82 60 90 Z';
  return (
    <g>
      <Pot />
      <path d={leafPath} fill={leaf} transform="translate(-16 0)" />
      <path d={leafPath} fill={dark} transform="translate(16 0) scale(0.9) translate(6 8)" />
      <g transform="translate(60 30)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx={0} cy={-10} rx="7" ry="11" fill={petal} transform={`rotate(${a})`} />
        ))}
        <circle r="5" fill="#D9A441" />
      </g>
    </g>
  );
}

const RENDERERS = { blade: Blade, leafy: Leafy, palm: Palm, rosette: Rosette, barrel: Barrel, jade: Jade, flower: Flower };

export default function PlantArt({ variant, leaf, dark, petal, shape, className }) {
  const Renderer = RENDERERS[variant] || Leafy;
  return (
    <svg viewBox="0 0 120 140" className={className} role="img" aria-hidden="true">
      <Renderer leaf={leaf} dark={dark} petal={petal} shape={shape} />
    </svg>
  );
}
