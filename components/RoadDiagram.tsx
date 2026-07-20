import type { ReactElement } from 'react';

import type { DiagramKey } from '@/lib/types';

/**
 * Dependency-free SVG road scenes for situation/hazard questions.
 *
 * Drawing them inline keeps the app fully offline and avoids any third-party
 * image licensing. Each scene is described in `title`/`desc` for screen readers.
 */

const ROAD = '#455063';
const ROAD_EDGE = '#2b3444';
const MARKING = '#f8fafc';
const CAR_YOU = '#1f47d8';
const CAR_OTHER = '#e11d48';
const GRASS = '#e8efe6';

function Car({
  x,
  y,
  fill,
  rotate = 0,
  label,
}: {
  x: number;
  y: number;
  fill: string;
  rotate?: number;
  label?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x={-9} y={-15} width={18} height={30} rx={4} fill={fill} />
      <rect x={-6} y={-9} width={12} height={9} rx={2} fill="#ffffff" opacity={0.85} />
      <rect x={-6} y={4} width={12} height={7} rx={2} fill="#ffffff" opacity={0.55} />
      {label ? (
        <text x={0} y={26} textAnchor="middle" fontSize={9} fontWeight={700} fill={fill}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Person({ x, y, fill = '#111826' }: { x: number; y: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={0} cy={-7} r={4} fill={fill} />
      <rect x={-3} y={-3} width={6} height={11} rx={3} fill={fill} />
    </g>
  );
}

const SCENES: Record<DiagramKey, { title: string; desc: string; render: () => ReactElement }> = {
  'uncontrolled-intersection': {
    title: 'Unmarked intersection',
    desc: 'A crossroads with no signs. Your car approaches from the south, another car approaches from the east on your right, and a child stands on the west kerb.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill={GRASS} />
        <rect x={120} y={0} width={80} height={220} fill={ROAD} />
        <rect x={0} y={80} width={320} height={70} fill={ROAD} />
        <line x1={160} y1={0} x2={160} y2={70} stroke={MARKING} strokeWidth={2} strokeDasharray="10 10" />
        <line x1={160} y1={160} x2={160} y2={220} stroke={MARKING} strokeWidth={2} strokeDasharray="10 10" />
        <line x1={0} y1={115} x2={110} y2={115} stroke={MARKING} strokeWidth={2} strokeDasharray="10 10" />
        <line x1={210} y1={115} x2={320} y2={115} stroke={MARKING} strokeWidth={2} strokeDasharray="10 10" />
        <Car x={142} y={185} fill={CAR_YOU} label="YOU" />
        <Car x={255} y={98} fill={CAR_OTHER} rotate={-90} />
        <Person x={104} y={72} />
      </>
    ),
  },
  roundabout: {
    title: 'Roundabout entry',
    desc: 'A roundabout with your car at the southern entry and another vehicle already circulating, approaching your entry point.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill={GRASS} />
        <circle cx={160} cy={110} r={78} fill={ROAD} />
        <circle cx={160} cy={110} r={34} fill={GRASS} stroke={ROAD_EDGE} strokeWidth={3} />
        <rect x={132} y={0} width={56} height={40} fill={ROAD} />
        <rect x={132} y={180} width={56} height={40} fill={ROAD} />
        <rect x={0} y={82} width={90} height={56} fill={ROAD} />
        <rect x={230} y={82} width={90} height={56} fill={ROAD} />
        <circle
          cx={160}
          cy={110}
          r={56}
          fill="none"
          stroke={MARKING}
          strokeWidth={2}
          strokeDasharray="8 10"
          opacity={0.7}
        />
        <Car x={160} y={196} fill={CAR_YOU} label="YOU" />
        <Car x={160} y={45} fill={CAR_OTHER} rotate={90} />
        <path
          d="M118 150 A 56 56 0 0 0 160 166"
          fill="none"
          stroke={CAR_OTHER}
          strokeWidth={2.5}
          strokeDasharray="5 4"
        />
      </>
    ),
  },
  'tram-crossing': {
    title: 'Tram at an intersection',
    desc: 'An intersection with tram rails crossing from the left. A tram approaches from your left as you wait to cross.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill={GRASS} />
        <rect x={125} y={0} width={70} height={220} fill={ROAD} />
        <rect x={0} y={82} width={320} height={70} fill={ROAD} />
        <line x1={0} y1={104} x2={320} y2={104} stroke="#c9ced8" strokeWidth={3} />
        <line x1={0} y1={130} x2={320} y2={130} stroke="#c9ced8" strokeWidth={3} />
        <g transform="translate(46 117)">
          <rect x={-40} y={-16} width={80} height={32} rx={6} fill="#0f766e" />
          <rect x={-32} y={-10} width={22} height={12} rx={2} fill="#ffffff" opacity={0.85} />
          <rect x={-4} y={-10} width={22} height={12} rx={2} fill="#ffffff" opacity={0.85} />
          <text x={0} y={30} textAnchor="middle" fontSize={9} fontWeight={700} fill="#0f766e">
            TRAM
          </text>
        </g>
        <Car x={148} y={190} fill={CAR_YOU} label="YOU" />
      </>
    ),
  },
  'pedestrian-crossing': {
    title: 'Pedestrian crossing',
    desc: 'A zebra crossing ahead of your car, with a pedestrian standing at the kerb about to step onto it.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill={GRASS} />
        <rect x={0} y={55} width={320} height={110} fill={ROAD} />
        <line x1={0} y1={110} x2={320} y2={110} stroke={MARKING} strokeWidth={2} strokeDasharray="12 12" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={186} y={60 + i * 22} width={40} height={13} fill={MARKING} />
        ))}
        <Car x={90} y={140} fill={CAR_YOU} rotate={90} label="YOU" />
        <Person x={168} y={45} />
        <path d="M176 45 L 200 45" stroke="#111826" strokeWidth={2} strokeDasharray="4 3" markerEnd="" />
      </>
    ),
  },
  'motorway-merge': {
    title: 'Motorway merge',
    desc: 'An acceleration lane joining a motorway carrying dense traffic in the right-hand lane.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill={GRASS} />
        <rect x={0} y={30} width={320} height={90} fill={ROAD} />
        <path d="M0 200 L120 200 L320 120 L320 120 L60 150 Z" fill={ROAD} />
        <line x1={0} y1={75} x2={320} y2={75} stroke={MARKING} strokeWidth={2} strokeDasharray="14 12" />
        <line x1={0} y1={120} x2={320} y2={120} stroke={MARKING} strokeWidth={2} />
        <Car x={70} y={98} fill={CAR_OTHER} rotate={90} />
        <Car x={175} y={98} fill={CAR_OTHER} rotate={90} />
        <Car x={110} y={172} fill={CAR_YOU} rotate={70} label="YOU" />
      </>
    ),
  },
  'narrow-winter-road': {
    title: 'Narrow winter road',
    desc: 'A snow-covered two-lane road with high snow banks on both sides and an oncoming vehicle.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill="#eef3f8" />
        <path d="M120 0 L200 0 L280 220 L40 220 Z" fill="#9aa6b8" />
        <path d="M124 0 L196 0 L272 220 L48 220 Z" fill="#b6c1d0" />
        <line x1={160} y1={0} x2={160} y2={220} stroke="#e7edf4" strokeWidth={3} strokeDasharray="16 14" />
        <path d="M110 0 L120 0 L40 220 L14 220 Z" fill="#f4f8fc" />
        <path d="M200 0 L210 0 L306 220 L280 220 Z" fill="#f4f8fc" />
        <Car x={120} y={175} fill={CAR_YOU} label="YOU" />
        <Car x={188} y={58} fill={CAR_OTHER} rotate={180} />
      </>
    ),
  },
  'sign-yield': {
    title: 'Give way sign',
    desc: 'A downward-pointing triangular sign with a red border and white centre.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill="#ffffff" />
        <polygon points="160,190 40,40 280,40" fill="#ffffff" stroke="#d32027" strokeWidth={20} strokeLinejoin="round" />
      </>
    ),
  },
  'sign-priority-road': {
    title: 'Priority road sign',
    desc: 'A yellow diamond with a white border, indicating a priority road.',
    render: () => (
      <>
        <rect x={0} y={0} width={320} height={220} fill="#ffffff" />
        <polygon points="160,25 275,110 160,195 45,110" fill="#ffffff" stroke="#111826" strokeWidth={3} />
        <polygon points="160,55 245,110 160,165 75,110" fill="#f5c400" />
      </>
    ),
  },
};

export function RoadDiagram({ diagram, className }: { diagram: DiagramKey; className?: string }) {
  const scene = SCENES[diagram];
  if (!scene) return null;

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 320 220"
        role="img"
        aria-labelledby={`${diagram}-title ${diagram}-desc`}
        className="h-auto w-full rounded-xl border border-ink-200 bg-white"
      >
        <title id={`${diagram}-title`}>{scene.title}</title>
        <desc id={`${diagram}-desc`}>{scene.desc}</desc>
        {scene.render()}
      </svg>
      <figcaption className="mt-2 text-xs text-ink-500">{scene.title}</figcaption>
    </figure>
  );
}
