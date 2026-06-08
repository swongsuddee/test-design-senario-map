import type { DagEdge, DagNode, Scenario } from '@/types';

interface Props {
  nodes: DagNode[];
  edges: DagEdge[];
  scenarios: Scenario[];
  cellW?: number;
  cellH?: number;
  pad?: number;
}

const NODE_R = 30;
const NODE_H = 60;

function nw(n: DagNode): number {
  return Math.max(90, Math.max(...n.name.split('\n').map(l => l.length)) * 7 + 48);
}
function ncx(n: DagNode, cw: number, p: number) { return p + n.col * cw + cw / 2; }
function ncy(n: DagNode, ch: number, p: number) { return p + n.row * ch + ch / 2; }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// cold (#0e0f18 / #252840) → hot (#301200 / #FF6B35)
function heatFill(t: number) {
  return `rgb(${Math.round(lerp(14,48,t))},${Math.round(lerp(15,18,t))},${Math.round(lerp(24,0,t))})`;
}
function heatStroke(t: number) {
  return `rgb(${Math.round(lerp(37,255,t))},${Math.round(lerp(40,107,t))},${Math.round(lerp(64,53,t))})`;
}

function boundaryPt(n: DagNode, ux: number, uy: number, cw: number, ch: number, p: number) {
  const px = ncx(n, cw, p), py = ncy(n, ch, p);
  if (n.shape === 'rect') {
    const hw = nw(n) / 2, hh = NODE_H / 2;
    const tx = Math.abs(ux) > 1e-9 ? hw / Math.abs(ux) : 1e18;
    const ty = Math.abs(uy) > 1e-9 ? hh / Math.abs(uy) : 1e18;
    const t  = Math.min(tx, ty);
    return { x: px + t * ux, y: py + t * uy };
  }
  return { x: px + ux * NODE_R, y: py + uy * NODE_R };
}

function edgePath(
  sp: { x: number; y: number }, ep: { x: number; y: number },
  fcx: number, fcy: number, tcx: number, tcy: number,
): string {
  const dx = tcx - fcx, dy = tcy - fcy;
  if (Math.abs(dx) < 4 || Math.abs(dy) < 4) return `M ${sp.x} ${sp.y} L ${ep.x} ${ep.y}`;
  const my = (sp.y + ep.y) / 2;
  return `M ${sp.x} ${sp.y} C ${sp.x} ${my}, ${ep.x} ${my}, ${ep.x} ${ep.y}`;
}

export default function DagHeatmap({
  nodes, edges, scenarios,
  cellW = 170, cellH = 100, pad = 52,
}: Props) {
  // ── Count how many scenarios hit each node / edge ─────────────────────────
  const nodeCounts: Record<string, number> = {};
  const edgeCounts: Record<string, number> = {};
  const autoHitNodes = new Set<string>();

  for (const sc of scenarios) {
    for (const id of sc.activePath)
      nodeCounts[id] = (nodeCounts[id] ?? 0) + 1;
    for (const [f, t] of sc.activeEdges) {
      const k = `${f}→${t}`;
      edgeCounts[k] = (edgeCounts[k] ?? 0) + 1;
    }
    if (sc.typeCls !== 'manual') {
      for (const id of sc.activePath) autoHitNodes.add(id);
    }
  }

  const maxNode = Math.max(1, ...Object.values(nodeCounts));
  const maxEdge = Math.max(1, ...Object.values(edgeCounts));
  const total   = scenarios.length;

  const maxCol = Math.max(...nodes.map(n => n.col), 0);
  const maxRow = Math.max(...nodes.map(n => n.row), 0);
  const W = (maxCol + 1) * cellW + pad * 2;
  const H = (maxRow + 1) * cellH + pad * 2;

  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', width: '100%', maxWidth: W, height: 'auto' }}>
        <defs>
          <marker id="hm-arr-hot" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="#FF6B35" opacity={0.8} />
          </marker>
          <marker id="hm-arr-m" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="#3a3f58" />
          </marker>
        </defs>

        {/* ── Edges ── */}
        {edges.map(edge => {
          const fn = nodes.find(n => n.id === edge.from);
          const tn = nodes.find(n => n.id === edge.to);
          if (!fn || !tn) return null;

          const count = edgeCounts[`${edge.from}→${edge.to}`] ?? 0;
          const t     = count / maxEdge;

          const fcx = ncx(fn, cellW, pad), fcy = ncy(fn, cellH, pad);
          const tcx = ncx(tn, cellW, pad), tcy = ncy(tn, cellH, pad);
          const ddx = tcx - fcx, ddy = tcy - fcy;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
          const ux = ddx / dist, uy = ddy / dist;

          const sp = boundaryPt(fn,  ux,  uy, cellW, cellH, pad);
          const ep = boundaryPt(tn, -ux, -uy, cellW, cellH, pad);
          const d  = edgePath(sp, ep, fcx, fcy, tcx, tcy);

          return (
            <path key={`${edge.from}->${edge.to}`}
              d={d}
              stroke={count > 0 ? heatStroke(t) : '#252840'}
              strokeWidth={count > 0 ? lerp(1.5, 3.5, t) : 1}
              fill="none"
              opacity={count > 0 ? lerp(0.35, 1, t) : 0.18}
              markerEnd={`url(#${count > 0 ? 'hm-arr-hot' : 'hm-arr-m'})`}
            />
          );
        })}

        {/* ── Nodes ── */}
        {nodes.map(node => {
          const count       = nodeCounts[node.id] ?? 0;
          const manualOnly  = count > 0 && !autoHitNodes.has(node.id);
          const t           = count / maxNode;
          const px     = ncx(node, cellW, pad);
          const py     = ncy(node, cellH, pad);
          const isRect = node.shape === 'rect';
          const lines  = node.name.split('\n');
          const lh     = 13;
          const textY0 = py - (lines.length - 1) * lh / 2;

          const bx = isRect ? px + nw(node) / 2 : px + NODE_R * 0.72;
          const by = isRect ? py - NODE_H / 2    : py - NODE_R * 0.72;

          return (
            <g key={node.id}>
              {isRect ? (
                <rect x={px - nw(node) / 2} y={py - NODE_H / 2}
                  width={nw(node)} height={NODE_H} rx={6}
                  fill={heatFill(t)} stroke={heatStroke(t)}
                  strokeWidth={count > 0 ? lerp(1.5, 2.5, t) : 1} />
              ) : (
                <circle cx={px} cy={py} r={NODE_R}
                  fill={heatFill(t)} stroke={heatStroke(t)}
                  strokeWidth={count > 0 ? lerp(1.5, 2.5, t) : 1} />
              )}

              {lines.map((ln, i) => (
                <text key={i} x={px} y={textY0 + i * lh}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={t > 0.4 ? '#d0d4f0' : '#505878'}
                  fontSize={isRect ? '10px' : '9.5px'}
                  fontFamily="Segoe UI,system-ui,sans-serif">
                  {ln}
                </text>
              ))}

              <text x={px} y={py + (isRect ? NODE_H / 2 : NODE_R) + 12}
                textAnchor="middle"
                fill={t > 0.3 ? heatStroke(t) : '#383d60'}
                fontSize="8px" fontWeight="700"
                fontFamily="Segoe UI,system-ui,sans-serif">
                {node.id}
              </text>

              {count > 0 && !manualOnly && (
                <g>
                  <circle cx={bx} cy={by} r={9}
                    fill={t > 0.5 ? '#FF6B35' : '#2a1f10'}
                    stroke={heatStroke(t)} strokeWidth={1} />
                  <text x={bx} y={by}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="#fff" fontSize="8px" fontWeight="700"
                    fontFamily="Segoe UI,system-ui,sans-serif">
                    {count}
                  </text>
                </g>
              )}
              {manualOnly && (
                <g>
                  <circle cx={bx} cy={by} r={9}
                    fill="#1e2032" stroke="#505878" strokeWidth={1} />
                  <text x={bx} y={by}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="#8090b0" fontSize="10px" fontWeight="700"
                    fontFamily="Segoe UI,system-ui,sans-serif">
                    ×
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* ── Heat legend ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 8px 2px', fontSize: 11, color: '#505878' }}>
        <span>Hit count:</span>
        <span style={{ fontSize: 10 }}>0</span>
        {([0, 0.2, 0.4, 0.6, 0.8, 1] as const).map(t => (
          <div key={t} style={{
            width: 14, height: 14, borderRadius: 3,
            background: heatFill(t),
            border: `1.5px solid ${heatStroke(t)}`,
            flexShrink: 0,
          }} />
        ))}
        <span style={{ fontSize: 10 }}>{maxNode}</span>
        <span style={{ marginLeft: 6, fontSize: 10, color: '#404568' }}>({total} scenarios)</span>
        <span style={{ marginLeft: 10, color: '#3a3f58' }}>|</span>
        <svg width={18} height={18} style={{ flexShrink: 0 }}>
          <circle cx={9} cy={9} r={9} fill="#1e2032" stroke="#505878" strokeWidth={1} />
          <text x={9} y={9} textAnchor="middle" dominantBaseline="middle"
            fill="#8090b0" fontSize="10" fontWeight="700"
            fontFamily="Segoe UI,system-ui,sans-serif">×</text>
        </svg>
        <span style={{ fontSize: 10, color: '#505878' }}>Manual only</span>
      </div>
    </div>
  );
}
