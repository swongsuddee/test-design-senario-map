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

function TcRowItem({ row, cols }: { row: TcRow; cols: TcSectionDef['cols'] }) {
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
    </tr>
  );
}

export default function TcSection({ def }: { def: TcSectionDef }) {
  const hasModule = def.cols.includes('module');
  const hasType   = def.cols.includes('type');
  const hasLabels = def.cols.includes('labels');
  return (
    <section className="section" id={def.sectionId}>
      <div className="section-header">
        <div className="section-number">{def.num}</div>
        <div className="section-title">{def.title}</div>
        {def.subtitle && <div className="section-subtitle">{def.subtitle}</div>}
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
            </tr>
          </thead>
          <tbody>
            {def.rows.map(row => <TcRowItem key={row.id} row={row} cols={def.cols} />)}
          </tbody>
        </table>
      </div>
    </section>
  );
}
