'use client';

import { usePathname } from 'next/navigation';
import { useReviews } from '@/client/hooks/useReviews';
import type { ReviewType } from '@/client/hooks/useReviews';
import type { TcSectionDef, TcRow, AutoCls, PriCls } from '@/types';

const PRI_LABEL: Record<PriCls, string> = { high: 'High', medium: 'Medium', low: 'Low' };
const AUTO_LABEL: Record<AutoCls, string> = { auto: 'Yes', partial: 'Partial', manual: 'Manual', no: 'No' };

function B({ cls, label }: { cls: string; label: string }) {
  return <span className={`badge badge-${cls}`}>{label}</span>;
}

function TcId({ id, isNew }: { id: string; isNew?: boolean }) {
  return (
    <td style={{ whiteSpace: 'nowrap', fontWeight: 700, color: 'var(--accent)' }}>
      {id}{isNew && <> <span className="badge badge-new">▲ New</span></>}
    </td>
  );
}

function TcCheckbox({ checked, label, color, onToggle }: {
  checked: boolean; label: string; color: string; onToggle: () => void;
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

function TcRowItem({ row, cols, checkStates, onToggle }: {
  row: TcRow;
  cols: TcSectionDef['cols'];
  checkStates: Record<ReviewType, boolean>;
  onToggle: (type: ReviewType) => void;
}) {
  const hasModule = cols.includes('module');
  const hasType   = cols.includes('type');
  const hasLabels = cols.includes('labels');
  return (
    <tr style={row.isNew ? { background: 'rgba(33,150,243,.04)' } : undefined}>
      <TcId id={row.id} isNew={row.isNew} />
      {hasModule && <td>{row.module}</td>}
      <td>{row.summary}</td>
      {hasType && <td>{row.type}</td>}
      <td><B cls={row.priority} label={PRI_LABEL[row.priority]} /></td>
      <td><B cls={row.auto} label={AUTO_LABEL[row.auto]} /></td>
      {hasLabels && <td>{row.labels?.map(([c, l]) => <B key={c} cls={c} label={l} />)}</td>}
      <td style={{ whiteSpace: 'nowrap' }}>
        <TcCheckbox
          checked={checkStates.implemented}
          label="Implemented"
          color="#2196F3"
          onToggle={() => onToggle('implemented')}
        />
      </td>
      <td style={{ whiteSpace: 'nowrap' }}>
        <TcCheckbox
          checked={checkStates.testrun}
          label="Test Run"
          color="#FF9800"
          onToggle={() => onToggle('testrun')}
        />
      </td>
    </tr>
  );
}

export default function TcSection({ def }: { def: TcSectionDef }) {
  const pathname = usePathname();
  const storyId  = pathname?.split('/')[1] ?? '';
  const { state, toggle } = useReviews(storyId);

  const hasModule = def.cols.includes('module');
  const hasType   = def.cols.includes('type');
  const hasLabels = def.cols.includes('labels');

  const implCount = def.rows.filter(r => state.implemented.has(r.id)).length;
  const runCount  = def.rows.filter(r => state.testrun.has(r.id)).length;
  const total     = def.rows.length;

  return (
    <section className="section" id={def.sectionId}>
      <div className="section-header">
        <div className="section-number">{def.num}</div>
        <div className="section-title">{def.title}</div>
        {def.subtitle && <div className="section-subtitle">{def.subtitle}</div>}
        {(implCount > 0 || runCount > 0) && (
          <div className="smap-progress-row">
            {implCount > 0 && (
              <div className="smap-progress" style={{ '--prog-color': '#4CAF50' } as React.CSSProperties}>
                <span className="smap-progress-bar" style={{ width: `${(implCount / total) * 100}%` }} />
                <span className="smap-progress-label">Impl {implCount}/{total}</span>
              </div>
            )}
            {runCount > 0 && (
              <div className="smap-progress" style={{ '--prog-color': '#FF9800' } as React.CSSProperties}>
                <span className="smap-progress-bar" style={{ width: `${(runCount / total) * 100}%` }} />
                <span className="smap-progress-label">Run {runCount}/{total}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {hasModule && <th>Module</th>}
              <th>Summary</th>
              {hasType && <th>Type</th>}
              <th>Priority</th>
              <th>Automatable</th>
              {hasLabels && <th>Labels</th>}
              <th>Implemented</th>
              <th>Test Run</th>
            </tr>
          </thead>
          <tbody>
            {def.rows.map(row => (
              <TcRowItem
                key={row.id}
                row={row}
                cols={def.cols}
                checkStates={{
                  reviewed:    state.reviewed.has(row.id),
                  codex:       state.codex.has(row.id),
                  implemented: state.implemented.has(row.id),
                  testrun:     state.testrun.has(row.id),
                  rejected:    state.rejected.has(row.id),
                }}
                onToggle={type => toggle(row.id, type)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
