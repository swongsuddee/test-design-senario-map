'use client';

import { useState } from 'react';
import type { ClarifyItem, ClarifyType, ClarifyStatus } from '@/types';

type Lang = 'en' | 'th';

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

function ClarifyCard({ item, lang }: { item: ClarifyItem; lang: Lang }) {
  const tm = TYPE_META[item.type];
  const sm = STATUS_META[item.status];
  const title      = (lang === 'th' && item.title_th)      ? item.title_th      : item.title;
  const body       = (lang === 'th' && item.body_th)       ? item.body_th       : item.body;
  const resolution = (lang === 'th' && item.resolution_th) ? item.resolution_th : item.resolution;

  return (
    <div className={`clarify-card clarify-type-${item.type}`}>
      <div className="clarify-meta">
        <span className="clarify-id">{item.id}</span>
        <span className={`badge badge-${tm.cls}`}>{tm.label}</span>
        <span className={`badge badge-${sm.cls}`}>{sm.label}</span>
        {item.affectedTc && <span className="clarify-tc">{item.affectedTc}</span>}
        {item.date && <span className="clarify-date">{item.date}</span>}
      </div>
      <div className="clarify-title">{title}</div>
      <p className="clarify-body">{body}</p>
      {resolution && (
        <div className="clarify-resolution">
          <span className="clarify-resolution-label">Resolution</span>
          {resolution}
        </div>
      )}
    </div>
  );
}

export default function ClarifySection({ items }: Props) {
  const hasTh = items.some(i => i.title_th || i.body_th);
  const [lang, setLang] = useState<Lang>(hasTh ? 'th' : 'en');

  const open     = items.filter(i => i.status === 'pending' || i.status === 'on-hold');
  const resolved = items.filter(i => i.status === 'resolved' || i.status === 'closed');

  return (
    <div className="clarify-wrap">
      {hasTh && (
        <div className="clarify-lang-bar">
          <button
            className={`clarify-lang-btn${lang === 'en' ? ' active' : ''}`}
            onClick={() => setLang('en')}
          >EN</button>
          <button
            className={`clarify-lang-btn${lang === 'th' ? ' active' : ''}`}
            onClick={() => setLang('th')}
          >TH</button>
        </div>
      )}
      <div className="clarify-list">
        {open.map(item => <ClarifyCard key={item.id} item={item} lang={lang} />)}

        {resolved.length > 0 && (
          <details className="clarify-resolved-group">
            <summary className="clarify-resolved-toggle">
              {resolved.length} resolved
            </summary>
            <div className="clarify-resolved-body">
              {resolved.map(item => <ClarifyCard key={item.id} item={item} lang={lang} />)}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
