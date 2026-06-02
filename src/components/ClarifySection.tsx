import type { ClarifyItem, ClarifyType, ClarifyStatus } from '@/types';

const TYPE_META: Record<ClarifyType, { cls: string; label: string }> = {
  conflict:   { cls: 'conflict', label: 'Conflict'   },
  question:   { cls: 'question', label: 'Question'   },
  suggestion: { cls: 'suggest',  label: 'Suggestion' },
};

const STATUS_META: Record<ClarifyStatus, { cls: string; label: string }> = {
  resolved:  { cls: 'resolved', label: 'Resolved' },
  pending:   { cls: 'pending',  label: 'Pending'  },
  'on-hold': { cls: 'onhold',   label: 'On Hold'  },
  closed:    { cls: 'closed',   label: 'Closed'   },
};

interface Props {
  items: ClarifyItem[];
}

function ClarifyCard({ item }: { item: ClarifyItem }) {
  const tm = TYPE_META[item.type];
  const sm = STATUS_META[item.status];
  return (
    <div className={`clarify-card clarify-type-${item.type}`}>
      <div className="clarify-meta">
        <span className="clarify-id">{item.id}</span>
        <span className={`badge badge-${tm.cls}`}>{tm.label}</span>
        <span className={`badge badge-${sm.cls}`}>{sm.label}</span>
        {item.affectedTc && <span className="clarify-tc">{item.affectedTc}</span>}
        {item.date && <span className="clarify-date">{item.date}</span>}
      </div>
      <div className="clarify-title">{item.title}</div>
      <p className="clarify-body">{item.body}</p>
      {item.resolution && (
        <div className="clarify-resolution">
          <span className="clarify-resolution-label">Resolution</span>
          {item.resolution}
        </div>
      )}
    </div>
  );
}

export default function ClarifySection({ items }: Props) {
  const open     = items.filter(i => i.status === 'pending' || i.status === 'on-hold');
  const resolved = items.filter(i => i.status === 'resolved' || i.status === 'closed');

  return (
    <div className="clarify-list">
      {open.map(item => <ClarifyCard key={item.id} item={item} />)}

      {resolved.length > 0 && (
        <details className="clarify-resolved-group">
          <summary className="clarify-resolved-toggle">
            {resolved.length} resolved
          </summary>
          <div className="clarify-resolved-body">
            {resolved.map(item => <ClarifyCard key={item.id} item={item} />)}
          </div>
        </details>
      )}
    </div>
  );
}
