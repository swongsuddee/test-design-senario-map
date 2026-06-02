export type NodeType = 'action' | 'decision' | 'expect';

export interface DagNode {
  id: string;
  col: number;
  row: number;
  name: string;
  type: NodeType;
  shape?: 'round' | 'rect'; // round = state (circle), rect = action (rectangle); defaults to round
  details?: string;
}

export interface DagEdge {
  from: string;
  to: string;
  label?: string;
}

export interface TestStep {
  action: string;
  data: string;
  expect: string;
}

export interface Scenario {
  id: string;
  name: string;
  type: string;
  typeCls: string;
  steps: TestStep[];
  activePath: string[];
  activeEdges: [string, string][];
}

// ── Flow section ──────────────────────────────────────────────────────────────
export interface FlowSectionDef {
  sectionId: string;
  num: string;
  title: string;
  subtitle: string;
  chart: string;
  states?: [string, string][];
  transitions?: [string, string][];
}

// ── TC section ────────────────────────────────────────────────────────────────
export type AutoCls = 'auto' | 'partial' | 'manual' | 'no';
export type PriCls  = 'high' | 'medium' | 'low';

export interface TcRow {
  id: string;
  isNew?: boolean;
  module?: string;
  summary: string;
  type?: string;
  priority: PriCls;
  auto: AutoCls;
  labels?: [string, string][];
}

export interface TcSectionDef {
  sectionId: string;
  num: string;
  title: string;
  subtitle?: string;
  cols: Array<'module' | 'type' | 'labels'>;
  rows: TcRow[];
}

// ── Clarify / Conflict section ────────────────────────────────────────────────
export type ClarifyType   = 'conflict' | 'question' | 'suggestion';
export type ClarifyStatus = 'resolved' | 'pending' | 'on-hold' | 'closed';

export interface ClarifyItem {
  id: string;
  type: ClarifyType;
  status: ClarifyStatus;
  title: string;
  body: string;
  resolution?: string;
  affectedTc?: string;
  date?: string;
}
