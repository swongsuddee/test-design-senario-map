import Dagre from '@dagrejs/dagre';
import { parseMermaidFlowchart } from '@/lib/flowchart-parser';
import type { FNode, FEdge } from '@/lib/flowchart-parser';

// ── theme ─────────────────────────────────────────────────────────────────────
const T = {
  bg:          '#1a1d27',
  nodeFill:    '#2e3347',
  nodeBorder:  '#4a4f6a',
  text:        '#e8eaf0',
  subText:     '#b0b5cc',
  edge:        '#8b90a7',
  font:        13,
  lineH:       17,
};

// ── sizing ────────────────────────────────────────────────────────────────────
const CHAR_W = 7.2;
const PAD_X  = 20;
const PAD_Y  = 14;

function textSize(label: string) {
  const lines = label.split('\n');
  const w = Math.max(...lines.map(l => l.length)) * CHAR_W + PAD_X * 2;
  const h = lines.length * T.lineH + PAD_Y * 2;
  return { w, h, lines };
}

function nodeDims(n: FNode) {
  const { w, h } = textSize(n.label);
  switch (n.shape) {
    case 'diamond':  return { width: Math.max(110, w * 1.35), height: Math.max(60, h * 1.35) };
    case 'stadium':  return { width: Math.max(90,  w + 30),   height: Math.max(38, h) };
    case 'circle':   return { width: Math.max(60,  w),        height: Math.max(60, w) };
    case 'cylinder': return { width: Math.max(90,  w),        height: Math.max(50, h + 14) };
    default:         return { width: Math.max(80,  w),        height: Math.max(36, h) };
  }
}

// ── layout ────────────────────────────────────────────────────────────────────
interface LayoutNode extends FNode { x: number; y: number; width: number; height: number }
interface LayoutEdge extends FEdge { points: { x: number; y: number }[] }

function layout(nodes: FNode[], edges: FEdge[], dir: string) {
  const g = new Dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({ rankdir: dir, nodesep: 40, ranksep: 55, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));
  nodes.forEach(n => g.setNode(n.id, nodeDims(n)));
  edges.forEach(e => g.setEdge(e.from, e.to, {}, e.id));
  Dagre.layout(g);

  const lnodes: LayoutNode[] = nodes.map(n => {
    const p = g.node(n.id);
    return { ...n, x: p.x, y: p.y, width: p.width, height: p.height };
  });

  const ledges: LayoutEdge[] = edges.map(e => {
    const pts = g.edge({ v: e.from, w: e.to, name: e.id })?.points ?? [];
    return { ...e, points: pts };
  });

  const gg = g.graph();
  return { nodes: lnodes, edges: ledges, width: gg.width ?? 200, height: gg.height ?? 200 };
}

// ── path helpers ─────────────────────────────────────────────────────────────
function ptsToPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  if (pts.length === 2) return `M${pts[0].x},${pts[0].y}L${pts[1].x},${pts[1].y}`;
  // smooth catmull-rom like polyline using quadratic bezier at midpoints
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    if (i === pts.length - 2) { d += `L${b.x},${b.y}`; }
    else {
      const mx = (b.x + pts[i + 2].x) / 2;
      const my = (b.y + pts[i + 2].y) / 2;
      d += `Q${b.x},${b.y} ${mx},${my}`;
    }
  }
  return d;
}

function midPoint(pts: { x: number; y: number }[]) {
  if (pts.length === 0) return { x: 0, y: 0 };
  const mid = Math.floor(pts.length / 2);
  return pts.length % 2 === 1
    ? pts[mid]
    : { x: (pts[mid - 1].x + pts[mid].x) / 2, y: (pts[mid - 1].y + pts[mid].y) / 2 };
}

// ── SVG node shapes ───────────────────────────────────────────────────────────
function NodeShape({ n }: { n: LayoutNode }) {
  const { x, y, width: w, height: h, shape, style } = n;
  const fill   = style?.fill   ?? T.nodeFill;
  const stroke = style?.stroke ?? T.nodeBorder;
  const color  = style?.color  ?? T.text;
  const cx = x, cy = y;

  const { lines } = textSize(n.label);
  const totalH = lines.length * T.lineH;
  const tyStart = cy - totalH / 2 + T.lineH * 0.75;

  const label = (
    <text
      x={cx} y={tyStart}
      textAnchor="middle" dominantBaseline="auto"
      fill={color} fontSize={T.font} fontFamily="'Segoe UI', system-ui, sans-serif"
      style={{ pointerEvents: 'none' }}
    >
      {lines.map((line, i) => (
        <tspan key={i} x={cx} dy={i === 0 ? 0 : T.lineH}>{line}</tspan>
      ))}
    </text>
  );

  if (shape === 'diamond') {
    const hw = w / 2, hh = h / 2;
    const pts = `${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`;
    return <g><polygon points={pts} fill={fill} stroke={stroke} strokeWidth={1.5} />{label}</g>;
  }

  if (shape === 'stadium') {
    const rx = h / 2;
    return <g><rect x={cx - w/2} y={cy - h/2} width={w} height={h} rx={rx} ry={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />{label}</g>;
  }

  if (shape === 'circle') {
    const r = Math.min(w, h) / 2;
    return <g><ellipse cx={cx} cy={cy} rx={r} ry={r} fill={fill} stroke={stroke} strokeWidth={1.5} />{label}</g>;
  }

  if (shape === 'cylinder') {
    const rx2 = w / 2, ry2 = 8;
    const x0 = cx - rx2, x1 = cx + rx2, y0 = cy - h/2, y1 = cy + h/2;
    const d = `M${x0},${y0 + ry2} A${rx2},${ry2} 0 0 0 ${x1},${y0 + ry2} L${x1},${y1 - ry2} A${rx2},${ry2} 0 0 1 ${x0},${y1 - ry2} Z`;
    const cap = `M${x0},${y0 + ry2} A${rx2},${ry2} 0 0 0 ${x1},${y0 + ry2}`;
    return <g><path d={d} fill={fill} stroke={stroke} strokeWidth={1.5} /><path d={cap} fill="none" stroke={stroke} strokeWidth={1.5} />{label}</g>;
  }

  // default rect
  return <g><rect x={cx - w/2} y={cy - h/2} width={w} height={h} rx={6} ry={6} fill={fill} stroke={stroke} strokeWidth={1.5} />{label}</g>;
}

// ── SVG edge ──────────────────────────────────────────────────────────────────
function EdgeShape({ e, markerId }: { e: LayoutEdge; markerId: string }) {
  if (e.points.length < 2) return null;
  const d = ptsToPath(e.points);
  const mid = midPoint(e.points);

  return (
    <g>
      <path d={d} fill="none" stroke={T.edge} strokeWidth={1.5} markerEnd={`url(#${markerId})`} />
      {e.label && (
        <text
          x={mid.x} y={mid.y - 5}
          textAnchor="middle" dominantBaseline="auto"
          fill={T.subText} fontSize={11} fontFamily="'Segoe UI', system-ui, sans-serif"
          style={{ pointerEvents: 'none' }}
        >
          {e.label}
        </text>
      )}
    </g>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function FlowChart({ chart }: { chart: string }) {
  const parsed = parseMermaidFlowchart(chart);
  const { nodes, edges, width, height } = layout(parsed.nodes, parsed.edges, parsed.direction);

  const pad = 8;
  const vw = width  + pad * 2;
  const vh = height + pad * 2;
  const markerId = 'arr';

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${vw} ${vh}`}
      width="100%" style={{ display: 'block', maxHeight: 800, background: T.bg, borderRadius: 8 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id={markerId} markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill={T.edge} />
        </marker>
      </defs>
      <g>
        {edges.map(e => <EdgeShape key={e.id} e={e} markerId={markerId} />)}
        {nodes.map(n => <NodeShape key={n.id} n={n} />)}
      </g>
    </svg>
  );
}
