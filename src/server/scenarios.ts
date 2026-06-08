import { getDb, persist } from '../db/client';
import type { DagNode, DagEdge, Scenario, NodeType } from '../types';

// ── Row types ─────────────────────────────────────────────────────────────────

export type ScenarioMapRow = {
  id: string;       // 'pp2-phone'
  storyId: string;
  name: string;
  sortOrder: number;
};

export type DagNodeRow = {
  id: string;       // 'pp2-phone::S33'
  mapId: string;
  nodeId: string;   // local ID within the map: 'S33'
  col: number;
  row: number;
  name: string;
  type: NodeType;
  shape: 'round' | 'rect' | null;
  details: string | null;
};

export type DagEdgeRow = {
  id?: number;
  mapId: string;
  fromNode: string;
  toNode: string;
  label: string | null;
};

export type ScenarioRow = {
  id: string;       // 'pp2-phone::PP2-TC-031'
  mapId: string;
  tcId: string;
  name: string;
  type: string;
  typeCls: string;
  activePath: string[];
  activeEdges: [string, string][];
};

export type TestStepRow = {
  id?: number;
  scenarioId: string;
  action: string;
  data: string;
  expect: string;
  sortOrder: number;
};

// ── Scenario Maps ─────────────────────────────────────────────────────────────

export async function getScenarioMaps(storyId: string): Promise<ScenarioMapRow[]> {
  const db  = await getDb();
  const res = db.exec(
    'SELECT id, story_id, name, sort_order FROM scenario_map WHERE story_id = ? ORDER BY sort_order',
    [storyId],
  );
  if (!res.length) return [];
  return (res[0].values as [string, string, string, number][]).map(
    ([id, sId, name, sortOrder]) => ({ id, storyId: sId, name, sortOrder }),
  );
}

export async function upsertScenarioMap(row: ScenarioMapRow): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO scenario_map (id, story_id, name, sort_order) VALUES (?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET story_id=excluded.story_id, name=excluded.name,
       sort_order=excluded.sort_order`,
    [row.id, row.storyId, row.name, row.sortOrder],
  );
  await persist();
}

// ── DAG Nodes ─────────────────────────────────────────────────────────────────

export async function getDagNodes(mapId: string): Promise<DagNodeRow[]> {
  const db  = await getDb();
  const res = db.exec(
    'SELECT id, map_id, node_id, col, row, name, type, shape, details FROM dag_node WHERE map_id = ?',
    [mapId],
  );
  if (!res.length) return [];
  return (res[0].values as [string, string, string, number, number, string, string, string | null, string | null][]).map(
    ([id, mId, nodeId, col, row, name, type, shape, details]) => ({
      id, mapId: mId, nodeId, col, row, name,
      type: type as NodeType,
      shape: (shape as 'round' | 'rect' | null) ?? null,
      details: details ?? null,
    }),
  );
}

export async function upsertDagNode(row: DagNodeRow): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO dag_node (id, map_id, node_id, col, row, name, type, shape, details)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET col=excluded.col, row=excluded.row, name=excluded.name,
       type=excluded.type, shape=excluded.shape, details=excluded.details`,
    [row.id, row.mapId, row.nodeId, row.col, row.row, row.name, row.type, row.shape, row.details],
  );
  await persist();
}

// ── DAG Edges ─────────────────────────────────────────────────────────────────

export async function getDagEdges(mapId: string): Promise<DagEdgeRow[]> {
  const db  = await getDb();
  const res = db.exec(
    'SELECT id, map_id, from_node, to_node, label FROM dag_edge WHERE map_id = ?',
    [mapId],
  );
  if (!res.length) return [];
  return (res[0].values as [number, string, string, string, string | null][]).map(
    ([id, mId, fromNode, toNode, label]) => ({
      id, mapId: mId, fromNode, toNode, label: label ?? null,
    }),
  );
}

export async function replaceEdges(mapId: string, edges: DagEdge[]): Promise<void> {
  const db = await getDb();
  db.run('DELETE FROM dag_edge WHERE map_id = ?', [mapId]);
  for (const e of edges) {
    db.run(
      'INSERT INTO dag_edge (map_id, from_node, to_node, label) VALUES (?, ?, ?, ?)',
      [mapId, e.from, e.to, e.label ?? null],
    );
  }
  await persist();
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

export async function getScenarios(mapId: string): Promise<ScenarioRow[]> {
  const db  = await getDb();
  const res = db.exec(
    'SELECT id, map_id, tc_id, name, type, type_cls, active_path_json, active_edges_json FROM scenario WHERE map_id = ?',
    [mapId],
  );
  if (!res.length) return [];
  return (res[0].values as [string, string, string, string, string, string, string, string][]).map(
    ([id, mId, tcId, name, type, typeCls, apj, aej]) => ({
      id, mapId: mId, tcId, name, type, typeCls,
      activePath:  JSON.parse(apj)  as string[],
      activeEdges: JSON.parse(aej)  as [string, string][],
    }),
  );
}

export async function upsertScenario(row: ScenarioRow): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO scenario (id, map_id, tc_id, name, type, type_cls, active_path_json, active_edges_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET map_id=excluded.map_id, tc_id=excluded.tc_id,
       name=excluded.name, type=excluded.type, type_cls=excluded.type_cls,
       active_path_json=excluded.active_path_json, active_edges_json=excluded.active_edges_json`,
    [row.id, row.mapId, row.tcId, row.name, row.type, row.typeCls,
     JSON.stringify(row.activePath), JSON.stringify(row.activeEdges)],
  );
  await persist();
}

// ── Test Steps ────────────────────────────────────────────────────────────────

export async function getTestSteps(scenarioId: string): Promise<TestStepRow[]> {
  const db  = await getDb();
  const res = db.exec(
    'SELECT id, scenario_id, action, data, expect, sort_order FROM test_step WHERE scenario_id = ? ORDER BY sort_order',
    [scenarioId],
  );
  if (!res.length) return [];
  return (res[0].values as [number, string, string, string, string, number][]).map(
    ([id, sId, action, data, expect, sortOrder]) => ({
      id, scenarioId: sId, action, data, expect, sortOrder,
    }),
  );
}

export async function replaceTestSteps(scenarioId: string, steps: Array<{ action: string; data: string; expect: string }>): Promise<void> {
  const db = await getDb();
  db.run('DELETE FROM test_step WHERE scenario_id = ?', [scenarioId]);
  steps.forEach((s, i) => {
    db.run(
      'INSERT INTO test_step (scenario_id, action, data, expect, sort_order) VALUES (?, ?, ?, ?, ?)',
      [scenarioId, s.action, s.data, s.expect, i],
    );
  });
  await persist();
}

// ── Bulk import from static Scenario[] ───────────────────────────────────────

export async function importScenarioMap(
  storyId: string,
  mapId: string,
  mapName: string,
  sortOrder: number,
  nodes: DagNode[],
  edges: DagEdge[],
  scenarios: Scenario[],
): Promise<void> {
  const db = await getDb();

  db.run(
    `INSERT INTO scenario_map (id, story_id, name, sort_order) VALUES (?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET name=excluded.name, sort_order=excluded.sort_order`,
    [mapId, storyId, mapName, sortOrder],
  );

  for (const n of nodes) {
    const nodeRowId = `${mapId}::${n.id}`;
    db.run(
      `INSERT INTO dag_node (id, map_id, node_id, col, row, name, type, shape, details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET col=excluded.col, row=excluded.row, name=excluded.name,
         type=excluded.type, shape=excluded.shape, details=excluded.details`,
      [nodeRowId, mapId, n.id, n.col, n.row, n.name, n.type, n.shape ?? null, n.details ?? null],
    );
  }

  db.run('DELETE FROM dag_edge WHERE map_id = ?', [mapId]);
  for (const e of edges) {
    db.run(
      'INSERT INTO dag_edge (map_id, from_node, to_node, label) VALUES (?, ?, ?, ?)',
      [mapId, e.from, e.to, e.label ?? null],
    );
  }

  for (const sc of scenarios) {
    const scRowId = `${mapId}::${sc.id}`;
    db.run(
      `INSERT INTO scenario (id, map_id, tc_id, name, type, type_cls, active_path_json, active_edges_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET tc_id=excluded.tc_id, name=excluded.name,
         type=excluded.type, type_cls=excluded.type_cls,
         active_path_json=excluded.active_path_json, active_edges_json=excluded.active_edges_json`,
      [scRowId, mapId, sc.id, sc.name, sc.type, sc.typeCls,
       JSON.stringify(sc.activePath), JSON.stringify(sc.activeEdges)],
    );
    db.run('DELETE FROM test_step WHERE scenario_id = ?', [scRowId]);
    sc.steps.forEach((s, i) => {
      db.run(
        'INSERT INTO test_step (scenario_id, action, data, expect, sort_order) VALUES (?, ?, ?, ?, ?)',
        [scRowId, s.action, s.data, s.expect, i],
      );
    });
  }

  await persist();
}
