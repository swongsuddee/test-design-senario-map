// Server component — renders the DAG as pure SVG JSX (no browser APIs needed).
import type { DagEdge, DagNode, NodeType } from '@/types';

interface Props {
  nodes: DagNode[];
  edges: DagEdge[];
  activeNodes?: string[];
  activeEdges?: [string, string][];
  cellW?: number;
  cellH?: number;
  pad?: number;
}

// ── Fixed node dimensions ──────────────────────────────────────────────────────
const NODE_R = 30;    // circle radius  → diameter = 60
const NODE_H = 60;    // rect height    → matches circle diameter

// Auto-width: fit longest text line + horizontal padding
function nw(node: DagNode): number {
  const maxLen = Math.max(...node.name.split('\n').map(l => l.length));
  return Math.max(90, maxLen * 7 + 48);
}

// ── Color palette ──────────────────────────────────────────────────────────────
const COLORS: Record<NodeType, {
  a: { fill: string; stroke: string };
  m: { fill: string; stroke: string };
}> = {
  action:   { a: { fill: '#1e2438', stroke: '#FF6B35' }, m: { fill: '#13151f', stroke: '#2c3050' } },
  decision: { a: { fill: '#241c10', stroke: '#FF9800' }, m: { fill: '#13151f', stroke: '#2c3050' } },
  expect:   { a: { fill: '#132018', stroke: '#4CAF50' }, m: { fill: '#13151f', stroke: '#2c3050' } },
};
const ACCENT: Record<NodeType, string> = {
  action: '#FF6B35', decision: '#FF9800', expect: '#4CAF50',
};
const MARKERS: [string, string][] = [
  ['dag-mh-o', '#FF6B35'],
  ['dag-mh-a', '#FF9800'],
  ['dag-mh-g', '#4CAF50'],
  ['dag-mh-m', '#3a3f58'],
];
const MARKER_ID: Record<string, string> = {
  action: 'dag-mh-o', decision: 'dag-mh-a', expect: 'dag-mh-g', muted: 'dag-mh-m',
};

// ── Layout helpers ─────────────────────────────────────────────────────────────
function ncx(n: DagNode, cw: number, p: number) { return p + n.col * cw + cw / 2; }
function ncy(n: DagNode, ch: number, p: number) { return p + n.row * ch + ch / 2; }

// Point on the node boundary in direction (ux, uy) from center
function boundaryPt(n: DagNode, ux: number, uy: number, cw: number, ch: number, p: number) {
  const px = ncx(n, cw, p), py = ncy(n, ch, p);
  if (n.shape === 'rect') {
    const hw = nw(n) / 2, hh = NODE_H / 2;
    const tx = Math.abs(ux) > 1e-9 ? hw / Math.abs(ux) : 1e18;
    const ty = Math.abs(uy) > 1e-9 ? hh / Math.abs(uy) : 1e18;
    const t = Math.min(tx, ty);
    return { x: px + t * ux, y: py + t * uy };
  }
  return { x: px + ux * NODE_R, y: py + uy * NODE_R };
}

// S-curve for diagonal, straight line for axis-aligned
function edgePath(
  sp: { x: number; y: number },
  ep: { x: number; y: number },
  fcx: number, fcy: number,
  tcx: number, tcy: number,
): string {
  const dx = tcx - fcx, dy = tcy - fcy;
  if (Math.abs(dx) < 4) return `M ${sp.x} ${sp.y} L ${ep.x} ${ep.y}`; // vertical
  if (Math.abs(dy) < 4) return `M ${sp.x} ${sp.y} L ${ep.x} ${ep.y}`; // horizontal
  const my = (sp.y + ep.y) / 2;
  return `M ${sp.x} ${sp.y} C ${sp.x} ${my}, ${ep.x} ${my}, ${ep.x} ${ep.y}`;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function DagGraph({
  nodes, edges,
  activeNodes = [], activeEdges = [],
  cellW = 170, cellH = 100, pad = 52,
}: Props) {
  const maxCol = Math.max(...nodes.map(n => n.col), 0);
  const maxRow = Math.max(...nodes.map(n => n.row), 0);
  const W = (maxCol + 1) * cellW + pad * 2;
  const H = (maxRow + 1) * cellH + pad * 2;

  const activeNodeSet = new Set(activeNodes);
  const activeEdgeSet = new Set(activeEdges.map(([f, t]) => `${f}→${t}`));

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', width: '100%', maxWidth: W, height: 'auto' }}>
      <defs>
        {MARKERS.map(([id, fill]) => (
          <marker key={id} id={id} markerWidth={8} markerHeight={8}
            refX={6} refY={3} orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill={fill} />
          </marker>
        ))}
      </defs>

      {/* Edges */}
      {edges.map((edge) => {
        const fn = nodes.find(n => n.id === edge.from);
        const tn = nodes.find(n => n.id === edge.to);
        if (!fn || !tn) return null;

        const fcx = ncx(fn, cellW, pad), fcy = ncy(fn, cellH, pad);
        const tcx = ncx(tn, cellW, pad), tcy = ncy(tn, cellH, pad);
        const ddx = tcx - fcx, ddy = tcy - fcy;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
        const ux = ddx / dist, uy = ddy / dist;

        const sp = boundaryPt(fn,  ux,  uy, cellW, cellH, pad);
        const ep = boundaryPt(tn, -ux, -uy, cellW, cellH, pad);

        const active = activeEdgeSet.has(`${edge.from}→${edge.to}`);
        const ttype = (tn.type ?? 'action') as NodeType;
        const stroke = active ? ACCENT[ttype] : '#3a3f58';
        const markerId = active ? MARKER_ID[ttype] : MARKER_ID.muted;

        const d = edgePath(sp, ep, fcx, fcy, tcx, tcy);

        const isVert = Math.abs(ddy) > Math.abs(ddx);
        const lx = (sp.x + ep.x) / 2 + (isVert ? 14 : 0);
        const ly = (sp.y + ep.y) / 2 + (isVert ? 0 : -8);

        return (
          <g key={`${edge.from}->${edge.to}`}>
            <path d={d} stroke={stroke} strokeWidth={active ? 2 : 1.5}
              fill="none" markerEnd={`url(#${markerId})`}
              opacity={active ? 1 : 0.35} />
            {edge.label && (
              <text x={lx} y={ly}
                textAnchor={isVert ? 'start' : 'middle'}
                fill={active ? stroke : '#404568'}
                fontSize="8.5px" opacity={active ? 0.85 : 0.45}
                fontFamily="Segoe UI,system-ui,sans-serif">
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const px = ncx(node, cellW, pad);
        const py = ncy(node, cellH, pad);
        const active = activeNodeSet.has(node.id);
        const clr = COLORS[node.type][active ? 'a' : 'm'];
        const accent = ACCENT[node.type];
        const isRect = node.shape === 'rect';
        const lines = node.name.split('\n');
        const lh = 13;
        const textY0 = py - (lines.length - 1) * lh / 2;

        return (
          <g key={node.id}>
            {/* glow ring */}
            {active && (isRect ? (
              <rect x={px - nw(node) / 2 - 7} y={py - NODE_H / 2 - 7}
                width={nw(node) + 14} height={NODE_H + 14}
                rx={10} fill="none" stroke={accent} strokeWidth={1} opacity={0.2} />
            ) : (
              <circle cx={px} cy={py} r={NODE_R + 7}
                fill="none" stroke={accent} strokeWidth={1} opacity={0.2} />
            ))}

            {/* shape */}
            {isRect ? (
              <rect x={px - nw(node) / 2} y={py - NODE_H / 2}
                width={nw(node)} height={NODE_H} rx={6}
                fill={clr.fill} stroke={clr.stroke} strokeWidth={active ? 2 : 1.5} />
            ) : (
              <circle cx={px} cy={py} r={NODE_R}
                fill={clr.fill} stroke={clr.stroke} strokeWidth={active ? 2 : 1.5} />
            )}

            {/* label lines */}
            {lines.map((ln, i) => (
              <text key={i} x={px} y={textY0 + i * lh}
                textAnchor="middle" dominantBaseline="middle"
                fill={active ? '#e8eaf0' : '#505878'}
                fontSize={isRect ? '10px' : '9.5px'}
                fontWeight={active ? '700' : '400'}
                fontFamily="Segoe UI,system-ui,sans-serif">
                {ln}
              </text>
            ))}

            {/* id below node */}
            <text x={px} y={py + NODE_H / 2 + 12}
              textAnchor="middle"
              fill={active ? accent : '#383d60'}
              fontSize="8px" fontWeight="700"
              fontFamily="Segoe UI,system-ui,sans-serif">
              {node.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
