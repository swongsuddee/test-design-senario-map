'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import type { ClarifyItem, ClarifyType, ClarifyStatus } from '@/types';
import type { Comment } from '@/client/hooks/useClarifyComments';
import { useClarifyComments } from '@/client/hooks/useClarifyComments';

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

const TAG_COLORS: Record<string, string> = {
  PASS: '#4CAF50', BLOCK: '#F44336', NOTE: '#2196F3',
  QUESTION: '#FF9800', UPDATE: '#00BCD4', DECISION: '#EC4899', REJECT: '#F44336',
};

interface Props {
  items: ClarifyItem[];
}

const DEFAULT_AUTHORS = ['claude', 'gpt', 'ba', 'dev', 'qa', 'pm', 'me'];

function parseTag(content: string): { tag: string | null; title: string; body: string } {
  const nl = content.indexOf('\n');
  const firstLine = nl === -1 ? content : content.slice(0, nl);
  const rest      = nl === -1 ? ''      : content.slice(nl + 1);
  const m = firstLine.match(/^\[([A-Z]+)\]\s*(.*)/);
  if (!m) return { tag: null, title: firstLine, body: content };
  return { tag: m[1], title: m[2].trim(), body: rest };
}

function ReplyBubble({ content }: { content: string }) {
  const { tag, title, body } = parseTag(content);
  const color = tag ? (TAG_COLORS[tag] ?? '#9aa0c0') : null;
  return (
    <div className="smap-chat-text">
      {tag ? (
        <>
          <div className="smap-comment-header">
            <span className="smap-comment-tag" style={{ background: color + '22', color: color ?? undefined, borderColor: color + '55' } as React.CSSProperties}>
              {tag}
            </span>
            {title && <span className="smap-comment-title">{title}</span>}
          </div>
          {body.trim() && <div className="smap-comment-body">{body.trimStart()}</div>}
        </>
      ) : content.split(/(@\w+)/g).map((part, i) =>
          /^@\w+$/.test(part)
            ? <span key={i} className="smap-mention">{part}</span>
            : part
        )}
    </div>
  );
}

function ClarifyCard({
  item, lang, comments, onAdd, onEdit, onDelete,
}: {
  item: ClarifyItem;
  lang: Lang;
  comments: Comment[];
  onAdd: (clarifyId: string, author: string, content: string) => Promise<void>;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}) {
  const tm = TYPE_META[item.type];
  const sm = STATUS_META[item.status];
  const title      = (lang === 'th' && item.title_th)      ? item.title_th      : item.title;
  const body       = (lang === 'th' && item.body_th)       ? item.body_th       : item.body;
  const resolution = (lang === 'th' && item.resolution_th) ? item.resolution_th : item.resolution;

  const [draft,         setDraft]         = useState('');
  const [editId,        setEditId]        = useState<number | null>(null);
  const [editTxt,       setEditTxt]       = useState('');
  const [sending,       setSending]       = useState(false);
  const [mentionAnchor, setMentionAnchor] = useState<{ start: number; query: string } | null>(null);
  const [mentionIdx,    setMentionIdx]    = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const mentionSuggestions = useMemo(() =>
    mentionAnchor
      ? DEFAULT_AUTHORS.filter(a => a.toLowerCase().startsWith(mentionAnchor.query.toLowerCase()))
      : [],
    [mentionAnchor]
  );

  const insertMention = useCallback((username: string) => {
    if (!mentionAnchor) return;
    const { start, query } = mentionAnchor;
    const newText = draft.slice(0, start) + '@' + username + ' ' + draft.slice(start + 1 + query.length);
    setDraft(newText);
    setMentionAnchor(null);
    setMentionIdx(0);
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [draft, mentionAnchor]);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      await onAdd(item.id, 'Me', text);
      setDraft('');
      setMentionAnchor(null);
      setMentionIdx(0);
    } finally { setSending(false); }
  }, [draft, sending, onAdd, item.id]);

  const handleDraftChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val    = e.target.value;
    const cursor = e.target.selectionStart ?? val.length;
    setDraft(val);
    const before = val.slice(0, cursor);
    const m = before.match(/(?:^|[\s\n])(@(\w*))$/);
    if (m) {
      setMentionAnchor({ start: before.length - m[1].length, query: m[2] });
      setMentionIdx(0);
    } else {
      setMentionAnchor(null);
    }
  }, []);

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mentionAnchor) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setMentionIdx(i => Math.min(i + 1, mentionSuggestions.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setMentionIdx(i => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); setMentionAnchor(null); return; }
      if ((e.key === 'Enter' || e.key === 'Tab') && mentionSuggestions.length > 0) {
        e.preventDefault();
        insertMention(mentionSuggestions[mentionIdx]);
        return;
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }, [mentionAnchor, mentionSuggestions, mentionIdx, insertMention, send]);

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

      <div className="clarify-reply-area">
        {comments.length === 0
          ? <div className="smap-chat-empty">No comments yet</div>
          : comments.map(c => {
              const isEditing = editId === c.id;
              const cls = c.author.toLowerCase();
              return (
                <div key={c.id} className={`smap-chat-msg smap-chat-${cls}`}>
                  <div className="smap-chat-meta">
                    <span className="smap-chat-author">{c.author}</span>
                    {!isEditing && (
                      <div className="smap-chat-actions">
                        {c.author === 'Me' && (
                          <button className="smap-chat-act" onClick={() => { setEditId(c.id); setEditTxt(c.content); }} title="Edit">✎</button>
                        )}
                        <button className="smap-chat-act smap-chat-act-del" onClick={() => onDelete(c.id)} title="Delete">✕</button>
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="smap-chat-edit">
                      <textarea
                        className="smap-chat-edit-input"
                        value={editTxt}
                        onChange={e => setEditTxt(e.target.value)}
                        rows={3}
                        autoFocus
                      />
                      <div className="smap-chat-edit-btns">
                        <button className="smap-chat-edit-save" onClick={() => { onEdit(c.id, editTxt.trim()); setEditId(null); }}>Save</button>
                        <button className="smap-chat-edit-cancel" onClick={() => setEditId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <ReplyBubble content={c.content} />
                  )}
                </div>
              );
            })
        }

        <div className="smap-comment-tpl-row">
          {(['PASS','BLOCK','NOTE','QUESTION','UPDATE','DECISION','REJECT'] as const).map(tag => (
            <button
              key={tag}
              className="smap-tpl-tag-btn"
              style={{ '--tag-color': TAG_COLORS[tag] } as React.CSSProperties}
              onClick={() => setDraft(`[${tag}] \n\nPurpose :\nActual  :\nAction  : `)}
              tabIndex={-1}
            >{tag}</button>
          ))}
        </div>
        <div className="smap-mention-anchor">
          {mentionAnchor && mentionSuggestions.length > 0 && (
            <div className="smap-mention-popup">
              {mentionSuggestions.map((a, i) => (
                <button
                  key={a}
                  className={`smap-mention-item${i === mentionIdx ? ' active' : ''}`}
                  onMouseDown={ev => { ev.preventDefault(); insertMention(a); }}
                >
                  <span className="smap-mention-at">@</span>{a}
                </button>
              ))}
            </div>
          )}
          <div className="smap-chat-input-row">
            <textarea
              ref={textareaRef}
              className="smap-chat-input"
              value={draft}
              onChange={handleDraftChange}
              onKeyDown={handleKey}
              placeholder={`[TAG] Title\n\nPurpose :\nActual  :\nAction  : `}
              rows={3}
            />
            <button
              className="smap-chat-send smap-author-me"
              onClick={send}
              disabled={!draft.trim() || sending}
            >›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClarifySection({ items }: Props) {
  const pathname = usePathname();
  const storyId  = pathname?.split('/')[1] ?? '';

  const { comments, addComment, editComment, deleteComment } = useClarifyComments(storyId);

  const hasTh = items.some(i => i.title_th || i.body_th);
  const [lang, setLang] = useState<Lang>(hasTh ? 'th' : 'en');

  const open     = items.filter(i => i.status === 'pending' || i.status === 'on-hold');
  const resolved = items.filter(i => i.status === 'resolved' || i.status === 'closed');

  function card(item: ClarifyItem) {
    return (
      <ClarifyCard
        key={item.id}
        item={item}
        lang={lang}
        comments={comments[item.id] ?? []}
        onAdd={addComment}
        onEdit={editComment}
        onDelete={deleteComment}
      />
    );
  }

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
        {open.map(card)}

        {resolved.length > 0 && (
          <details className="clarify-resolved-group">
            <summary className="clarify-resolved-toggle">
              {resolved.length} resolved
            </summary>
            <div className="clarify-resolved-body">
              {resolved.map(card)}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
