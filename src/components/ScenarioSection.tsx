'use client';

import { usePathname } from 'next/navigation';
import type { DagEdge, DagNode, Scenario } from '@/types';
import DagGraph from './DagGraph';
import { useReviews } from '@/hooks/useReviews';
import type { ReviewType } from '@/hooks/useReviews';

interface Props {
  sectionId: string;
  sectionLetter: string;
  title: string;
  subtitle: string;
  overviewTitle: string;
  techniqueBadge?: { label: string; cls: string };
  nodes: DagNode[];
  edges: DagEdge[];
  scenarios: Scenario[];
  overviewOpts?: { cellW?: number; cellH?: number; pad?: number };
}

const CHECK_TYPES: { type: ReviewType; label: string; short: string; color: string }[] = [
  { type: 'reviewed', label: 'Reviewed',    short: 'Rev', color: '#4CAF50' },
  { type: 'gpt',      label: 'GPT Reviewed',short: 'GPT', color: '#7C3AED' },
  { type: 'testrun',  label: 'Test Run',    short: 'Run', color: '#FF9800' },
];

function Badge({ cls, label }: { cls: string; label: string }) {
  return <span className={`badge badge-${cls}`}>{label}</span>;
}

function StepsTable({ steps }: { steps: Scenario['steps'] }) {
  return (
    <table className="steps-tbl">
      <colgroup>
        <col className="col-n" /><col className="col-step" />
        <col className="col-data" /><col className="col-exp" />
      </colgroup>
      <thead>
        <tr><th>#</th><th>Test Step</th><th>Test Data</th><th>Expected Result</th></tr>
      </thead>
      <tbody>
        {steps.map((s, i) => (
          <tr key={i}>
            <td className="sn">{i + 1}</td>
            <td className="sa">{s.action}</td>
            <td className="sd">{s.data}</td>
            <td className="se">{s.expect}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CheckBox({ checked, label, color, onToggle }: {
  checked: boolean; label: string; short: string; color: string; onToggle: () => void;
}) {
  return (
    <button
      className={`smap-check${checked ? ' smap-check-done' : ''}`}
      style={{ '--check-color': color } as React.CSSProperties}
      onClick={e => { e.stopPropagation(); onToggle(); }}
      title={label}
    >
      <span className="smap-check-box">
        {checked && (
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="smap-check-lbl">{label}</span>
    </button>
  );
}

function ScenarioCard({ sc, nodes, edges, overviewOpts, checkStates, onToggle }: {
  sc: Scenario;
  nodes: DagNode[];
  edges: DagEdge[];
  overviewOpts: { cellW?: number; cellH?: number; pad?: number };
  checkStates: Record<ReviewType, boolean>;
  onToggle: (type: ReviewType) => void;
}) {
  const allDone = CHECK_TYPES.every(c => checkStates[c.type]);
  return (
    <div className={`smap-card${allDone ? ' smap-card-reviewed' : ''}`}>
      <div className="smap-head">
        <div className="smap-checks">
          {CHECK_TYPES.map(c => (
            <CheckBox key={c.type} checked={checkStates[c.type]} label={c.label}
              short={c.short} color={c.color} onToggle={() => onToggle(c.type)} />
          ))}
        </div>
        <span className="tc-id">{sc.id}</span>
        <span style={{ fontSize: '13px', flex: 1, lineHeight: 1.4 }}>{sc.name}</span>
        <Badge cls={sc.typeCls} label={sc.type} />
      </div>
      <div className="smap-body">
        <div className="smap-steps">
          <StepsTable steps={sc.steps} />
        </div>
        <div className="smap-dag">
          <div className="smap-dag-label">State &amp; Transition Path</div>
          <DagGraph
            nodes={nodes} edges={edges}
            activeNodes={sc.activePath}
            activeEdges={sc.activeEdges}
            {...overviewOpts}
          />
        </div>
      </div>
    </div>
  );
}

const DagLegend = () => (
  <div className="dag-legend">
    <div className="dag-legend-item">
      <div className="dag-legend-dot" style={{ borderColor: '#5a6080', background: '#1a1d2e', borderRadius: '50%' }} />
      State (round)
    </div>
    <div className="dag-legend-item">
      <div className="dag-legend-dot" style={{ borderColor: '#5a6080', background: '#1a1d2e', borderRadius: '3px', width: 20, height: 12 }} />
      Action (rect)
    </div>
    <div className="dag-legend-item" style={{ marginLeft: 6 }}>
      <div className="dag-legend-dot" style={{ borderColor: '#FF6B35', background: '#1e2438', borderRadius: '50%' }} />
      Active path
    </div>
    <div className="dag-legend-item">
      <div className="dag-legend-dot" style={{ borderColor: '#4CAF50', background: '#132018', borderRadius: '50%' }} />
      Terminal / success
    </div>
    <div className="dag-legend-item">
      <div className="dag-legend-dot" style={{ borderColor: '#FF9800', background: '#241c10', borderRadius: '50%' }} />
      Decision / error
    </div>
  </div>
);

export default function ScenarioSection({
  sectionId, sectionLetter, title, subtitle, overviewTitle,
  techniqueBadge, nodes, edges, scenarios,
  overviewOpts = { cellW: 180, cellH: 110, pad: 64 },
}: Props) {
  const pathname = usePathname();
  const storyId  = pathname?.split('/')[1] ?? '';
  const { state, toggle } = useReviews(storyId);

  const progressItems = CHECK_TYPES.map(c => ({
    ...c,
    count: scenarios.filter(sc => state[c.type].has(sc.id)).length,
  })).filter(p => p.count > 0);

  return (
    <section className="section" id={sectionId}>
      <div className="section-header">
        <div className="section-number">{sectionLetter}</div>
        <div className="section-title">{title}</div>
        <div className="section-subtitle">{subtitle}</div>
        {progressItems.length > 0 && (
          <div className="smap-progress-row">
            {progressItems.map(p => (
              <div key={p.type} className="smap-progress" style={{ '--prog-color': p.color } as React.CSSProperties}>
                <span className="smap-progress-bar" style={{ width: `${(p.count / scenarios.length) * 100}%` }} />
                <span className="smap-progress-label">{p.short} {p.count}/{scenarios.length}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dag-overview-card">
        <div className="dag-overview-header">
          <span className="dag-overview-title">{overviewTitle}</span>
          {techniqueBadge && <Badge cls={techniqueBadge.cls} label={techniqueBadge.label} />}
        </div>
        <DagGraph nodes={nodes} edges={edges} {...overviewOpts} />
        <DagLegend />
      </div>

      <div>
        {scenarios.map(sc => (
          <ScenarioCard
            key={sc.id}
            sc={sc}
            nodes={nodes}
            edges={edges}
            overviewOpts={overviewOpts}
            checkStates={{
              reviewed: state.reviewed.has(sc.id),
              gpt:      state.gpt.has(sc.id),
              testrun:  state.testrun.has(sc.id),
            }}
            onToggle={type => toggle(sc.id, type)}
          />
        ))}
      </div>
    </section>
  );
}
