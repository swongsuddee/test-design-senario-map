export type NodeShape = 'rect' | 'diamond' | 'stadium' | 'cylinder' | 'circle';

export interface FNode {
  id: string;
  label: string;
  shape: NodeShape;
  style?: { fill?: string; color?: string; stroke?: string };
}

export interface FEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface ParsedFlow {
  direction: 'TB' | 'LR' | 'BT' | 'RL';
  nodes: FNode[];
  edges: FEdge[];
}

function parseNodeSpec(spec: string): { id: string; label: string; shape: NodeShape } | null {
  const s = spec.trim();
  if (!s) return null;
  let m: RegExpMatchArray | null;

  // Stadium: ID([label])
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)\(\[([^\]]*)\]\)/);
  if (m) return { id: m[1], label: m[2], shape: 'stadium' };

  // Cylinder: ID[(label)]
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)\[\(([^)]*)\)\]/);
  if (m) return { id: m[1], label: m[2], shape: 'cylinder' };

  // Circle: ID((label))
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)\(\(([^)]*)\)\)/);
  if (m) return { id: m[1], label: m[2], shape: 'circle' };

  // Diamond: ID{label}
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)\{([^}]*)\}/);
  if (m) return { id: m[1], label: m[2], shape: 'diamond' };

  // Rect double-bracket: ID[["label"]]
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)\[\[([^\]]*)\]\]/);
  if (m) return { id: m[1], label: m[2].replace(/^"|"$/g, ''), shape: 'rect' };

  // Rect: ID[label]
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)\[([^\]]*)\]/);
  if (m) return { id: m[1], label: m[2], shape: 'rect' };

  // Round paren (treat as stadium): ID(label)
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)\(([^)]*)\)/);
  if (m) return { id: m[1], label: m[2], shape: 'stadium' };

  // Bare ID
  m = s.match(/^([A-Za-z_][A-Za-z0-9_-]*)/);
  if (m) return { id: m[1], label: m[1], shape: 'rect' };

  return null;
}

function decodeLabel(raw: string): string {
  let s = raw.trim();
  if (s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
  return s.replace(/\\n/g, '\n');
}

function parseStyleAttr(str: string): FNode['style'] {
  const out: FNode['style'] = {};
  for (const part of str.split(',')) {
    const [k, v] = part.split(':').map(x => x.trim());
    if (k === 'fill') out.fill = v;
    else if (k === 'color') out.color = v;
    else if (k === 'stroke') out.stroke = v;
  }
  return out;
}

export function parseMermaidFlowchart(chart: string): ParsedFlow {
  const lines = chart.split('\n').map(l => l.trim()).filter(Boolean);

  let direction: ParsedFlow['direction'] = 'TB';
  const nodeMap = new Map<string, FNode>();
  const edges: FEdge[] = [];
  let edgeIdx = 0;

  function upsertNode(spec: string): string {
    const parsed = parseNodeSpec(spec);
    if (!parsed) return spec.trim();
    const { id, label, shape } = parsed;
    if (!nodeMap.has(id)) {
      nodeMap.set(id, { id, label: decodeLabel(label), shape });
    } else if (label !== id) {
      const n = nodeMap.get(id)!;
      if (n.label === n.id) {
        n.label = decodeLabel(label);
        n.shape = shape;
      }
    }
    return id;
  }

  for (const line of lines) {
    if (line.startsWith('%%')) continue;

    // Direction
    const dirM = line.match(/^flowchart\s+(TD|TB|LR|BT|RL)/i);
    if (dirM) {
      const d = dirM[1].toUpperCase();
      direction = (d === 'TD' ? 'TB' : d) as ParsedFlow['direction'];
      continue;
    }

    // Style
    if (line.startsWith('style ')) {
      const m = line.match(/^style\s+([A-Za-z_][A-Za-z0-9_-]*)\s+(.+)/);
      if (m) {
        const [, id, styleStr] = m;
        if (!nodeMap.has(id)) nodeMap.set(id, { id, label: id, shape: 'rect' });
        nodeMap.get(id)!.style = parseStyleAttr(styleStr);
      }
      continue;
    }

    if (line.startsWith('classDef ') || line.startsWith('class ')) continue;
    if (line.startsWith('subgraph') || line === 'end') continue;

    // Edge
    if (line.includes('-->')) {
      const arrowIdx = line.indexOf('-->');
      const leftSpec = line.slice(0, arrowIdx).trim();
      let rest = line.slice(arrowIdx + 3).trim();

      let label: string | undefined;
      if (rest.startsWith('|')) {
        const end = rest.indexOf('|', 1);
        if (end > 0) {
          label = decodeLabel(rest.slice(1, end).trim());
          rest = rest.slice(end + 1).trim();
        }
      }

      const fromId = upsertNode(leftSpec);
      const toId = upsertNode(rest);
      if (fromId && toId) {
        edges.push({ id: `e${edgeIdx++}`, from: fromId, to: toId, label });
      }
      continue;
    }

    // Standalone node definition
    if (/^[A-Za-z_][A-Za-z0-9_-]*[\[{(]/.test(line)) {
      upsertNode(line);
    }
  }

  return { direction, nodes: Array.from(nodeMap.values()), edges };
}
