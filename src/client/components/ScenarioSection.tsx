'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { DagEdge, DagNode, Scenario, TcRow, PriCls, AutoCls } from '@/types';
import DagGraph from './DagGraph';
import DagHeatmap from './DagHeatmap';
import { useReviews } from '@/client/hooks/useReviews';
import type { ReviewType, Comment } from '@/client/hooks/useReviews';

const PRI_LABEL: Record<PriCls, string>  = { high: 'High', medium: 'Medium', low: 'Low' };
const AUTO_LABEL: Record<AutoCls, string> = { auto: 'Auto', partial: 'Partial', manual: 'Manual', no: 'No' };

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
  tcMeta?: TcRow[];
}

const TAG_COLORS: Record<string, string> = {
  PASS:     '#4CAF50',
  BLOCK:    '#F44336',
  NOTE:     '#2196F3',
  QUESTION: '#FF9800',
  UPDATE:   '#00BCD4',
  DECISION: '#EC4899',
  REJECT:   '#F44336',
};


function parseTag(content: string): { tag: string | null; title: string; body: string } {
  const nl = content.indexOf('\n');
  const firstLine = nl === -1 ? content : content.slice(0, nl);
  const rest      = nl === -1 ? ''      : content.slice(nl + 1);
  const m = firstLine.match(/^\[([A-Z]+)\]\s*(.*)/);
  if (!m) return { tag: null, title: firstLine, body: content };
  return { tag: m[1], title: m[2].trim(), body: rest };
}

function renderWithMentions(text: string): React.ReactNode[] {
  return text.split(/(@\w+)/g).map((part, i) =>
    /^@\w+$/.test(part) ? <span key={i} className="smap-mention">{part}</span> : part
  );
}

function CommentBody({ content }: { content: string }) {
  const { tag, title, body } = parseTag(content);
  const color = tag ? (TAG_COLORS[tag] ?? '#9aa0c0') : null;
  if (!tag) return <div className="smap-chat-text">{renderWithMentions(content)}</div>;
  return (
    <div className="smap-chat-text">
      <div className="smap-comment-header">
        <span className="smap-comment-tag" style={{ background: color + '22', color: color ?? undefined, borderColor: color + '55' } as React.CSSProperties}>
          {tag}
        </span>
        {title && <span className="smap-comment-title">{renderWithMentions(title)}</span>}
      </div>
      {body.trim() && <div className="smap-comment-body">{renderWithMentions(body.trimStart())}</div>}
    </div>
  );
}

const CHECK_TYPES: { type: Exclude<ReviewType, 'rejected'>; label: string; short: string; color: string }[] = [
  { type: 'reviewed',    label: 'Reviewed',      short: 'Rev',   color: '#4CAF50' },
  { type: 'codex',       label: 'Codex Reviewed', short: 'Codex', color: '#7C3AED' },
  { type: 'implemented', label: 'Implemented',    short: 'Impl',  color: '#2196F3' },
  { type: 'testrun',     label: 'Test Run',       short: 'Run',   color: '#FF9800' },
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

function CheckBox({ checked, label, color, onToggle, readOnly }: {
  checked: boolean; label: string; short: string; color: string; onToggle: () => void; readOnly?: boolean;
}) {
  return (
    <button
      className={`smap-check${checked ? ' smap-check-done' : ''}${readOnly ? ' smap-check-auto' : ''}`}
      style={{ '--check-color': color } as React.CSSProperties}
      onClick={e => { e.stopPropagation(); if (!readOnly) onToggle(); }}
      title={readOnly ? `${label} (auto-set from comments)` : label}
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

function fmtTs(s: string): string {
  try {
    return new Date(s.includes('T') ? s : s.replace(' ', 'T') + 'Z')
      .toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
  } catch { return s; }
}


function ReviewPanel({ comments, allAuthors, onAddComment, onEditComment, onDeleteComment }: {
  comments: Comment[];
  allAuthors: string[];
  onAddComment: (author: string, content: string) => Promise<void>;
  onEditComment: (id: number, content: string) => void;
  onDeleteComment: (id: number) => void;
}) {
  const [editId,  setEditId]  = useState<number | null>(null);
  const [editTxt, setEditTxt] = useState('');
  const [draft,   setDraft]   = useState('');
  const [sending, setSending] = useState(false);
  const [mentionAnchor, setMentionAnchor] = useState<{ start: number; query: string } | null>(null);
  const [mentionIdx,    setMentionIdx]    = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mentionSuggestions = useMemo(() =>
    mentionAnchor
      ? allAuthors.filter(a => a.toLowerCase().startsWith(mentionAnchor.query.toLowerCase()))
      : [],
    [mentionAnchor, allAuthors]
  );

  const startEdit = useCallback((id: number, text: string) => {
    setEditId(id); setEditTxt(text);
  }, []);

  const confirmEdit = useCallback((id: number) => {
    const text = editTxt.trim();
    if (!text) return;
    onEditComment(id, text);
    setEditId(null);
  }, [editTxt, onEditComment]);

  const insertMention = useCallback((username: string) => {
    if (!mentionAnchor) return;
    const { start, query } = mentionAnchor;
    const newText = draft.slice(0, start) + '@' + username + ' ' + draft.slice(start + 1 + query.length);
    setDraft(newText);
    setMentionAnchor(null);
    setMentionIdx(0);
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [draft, mentionAnchor]);

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      await onAddComment('Me', text);
      setDraft('');
      setMentionAnchor(null);
      setMentionIdx(0);
    }
    finally { setSending(false); }
  }, [draft, sending, onAddComment]);

  const handleDraftChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mentionAnchor) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (mentionSuggestions.length > 0) setMentionIdx(i => Math.min(i + 1, mentionSuggestions.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (mentionSuggestions.length > 0) setMentionIdx(i => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Escape')    { e.preventDefault(); setMentionAnchor(null); return; }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (mentionSuggestions.length > 0) insertMention(mentionSuggestions[mentionIdx]);
        return;
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }, [mentionAnchor, mentionSuggestions, mentionIdx, insertMention, handleSend]);

  return (
    <div className="smap-review-panel">
      <div className="smap-chat-history">
        {comments.length === 0 && (
          <div className="smap-chat-empty">No comments yet</div>
        )}
        {comments.map(comment => {
          const cls = comment.author.toLowerCase();
          const isEditing = editId === comment.id;
          return (
            <div key={comment.id} className={`smap-chat-msg smap-chat-${cls}`}>
              <div className="smap-chat-meta">
                <span className="smap-chat-author">{comment.author}</span>
                <span className="smap-chat-ts">{fmtTs(comment.createdAt)}</span>
                {!isEditing && (
                  <div className="smap-chat-actions">
                    <button className="smap-chat-act" onClick={() => startEdit(comment.id, comment.content)} title="Edit">✎</button>
                    <button className="smap-chat-act smap-chat-act-del" onClick={() => onDeleteComment(comment.id)} title="Delete">✕</button>
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
                    <button className="smap-chat-edit-save" onClick={() => confirmEdit(comment.id)}>Save</button>
                    <button className="smap-chat-edit-cancel" onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <CommentBody content={comment.content} />
              )}
            </div>
          );
        })}
      </div>

      <div className="smap-chat-input-area">
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
          {mentionAnchor && (
            <div className="smap-mention-popup">
              {mentionSuggestions.length > 0
                ? mentionSuggestions.map((a, i) => (
                    <button
                      key={a}
                      className={`smap-mention-item${i === mentionIdx ? ' active' : ''}`}
                      onMouseDown={ev => { ev.preventDefault(); insertMention(a); }}
                    >
                      <span className="smap-mention-at">@</span>{a}
                    </button>
                  ))
                : <span className="smap-mention-empty">No user found</span>
              }
            </div>
          )}
          <div className="smap-chat-input-row">
            <textarea
              ref={textareaRef}
              className="smap-chat-input"
              value={draft}
              onChange={handleDraftChange}
              onKeyDown={handleKeyDown}
              placeholder={`[TAG] Title\n\nPurpose :\nActual  :\nAction  : `}
              rows={3}
            />
            <button
              className="smap-chat-send smap-author-me"
              onClick={handleSend}
              disabled={!draft.trim() || sending}
            >›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioCard({ sc, nodes, edges, overviewOpts, checkStates, comments, tcRow, allAuthors, onToggle, onAddComment, onEditComment, onDeleteComment }: {
  sc: Scenario; nodes: DagNode[]; edges: DagEdge[];
  overviewOpts: { cellW?: number; cellH?: number; pad?: number };
  checkStates: Record<Exclude<ReviewType, 'rejected'>, boolean>;
  comments: Comment[]; tcRow?: TcRow; allAuthors: string[];
  onToggle: (type: ReviewType) => void;
  onAddComment: (author: string, content: string) => Promise<void>;
  onEditComment: (id: number, content: string) => void;
  onDeleteComment: (id: number) => void;
}) {
  const isReviewed = comments.some(c => c.author.toLowerCase() === 'me' && parseTag(c.content).tag === 'PASS');
  const isCodex    = comments.some(c => c.author.toLowerCase() === 'gpt' && parseTag(c.content).tag === 'PASS');

  const derivedStates: Record<Exclude<ReviewType, 'rejected'>, boolean> = {
    reviewed:    isReviewed,
    codex:       isCodex,
    implemented: checkStates.implemented,
    testrun:     checkStates.testrun,
  };

  const allChecked = CHECK_TYPES.every(c => derivedStates[c.type]);
  const isRejected = comments.some(c => parseTag(c.content).tag === 'REJECT');

  let cardCls = 'smap-card';
  if (isRejected) cardCls += ' smap-card-rejected';
  else if (allChecked) cardCls += ' smap-card-reviewed';

  return (
    <div className={cardCls}>
      <div className="smap-head">
        <div className="smap-head-row1">
          <span className="tc-id">{sc.id}</span>
          <span className="smap-tc-name">{sc.name}</span>
          <Badge cls={sc.typeCls} label={sc.type} />
          {tcRow && <>
            <Badge cls={tcRow.priority} label={PRI_LABEL[tcRow.priority]} />
            <Badge cls={tcRow.auto} label={AUTO_LABEL[tcRow.auto]} />
            {tcRow.labels?.map(([c, l]) => <Badge key={c} cls={c} label={l} />)}
          </>}
        </div>
        <div className="smap-head-row2">
          <div className="smap-checks">
            {CHECK_TYPES.map(c => {
              const auto = c.type === 'reviewed' || c.type === 'codex';
              return (
                <CheckBox
                  key={c.type}
                  checked={derivedStates[c.type]}
                  label={c.label}
                  short={c.short}
                  color={c.color}
                  onToggle={() => onToggle(c.type)}
                  readOnly={auto}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="smap-body">
        <div className="smap-left">
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
        <div className="smap-panel-anchor">
          <ReviewPanel
            comments={comments}
            allAuthors={allAuthors}
            onAddComment={onAddComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
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
  tcMeta,
}: Props) {
  const pathname = usePathname();
  const storyId  = pathname?.split('/')[1] ?? '';
  const { state, toggle, comments, addComment, editComment, deleteComment } = useReviews(storyId);
  const [heatmapFit, setHeatmapFit] = useState(true);

  const allAuthors = useMemo(() => {
    const seen = new Set<string>();
    for (const tcComments of Object.values(comments)) {
      for (const c of tcComments) seen.add(c.author);
    }
    return Array.from(seen);
  }, [comments]);

  const tcMetaMap = tcMeta
    ? Object.fromEntries(tcMeta.map(r => [r.id, r]))
    : {};

  const progressItems = CHECK_TYPES.map(c => ({
    ...c,
    count: scenarios.filter(sc => {
      const scComments = comments[sc.id] ?? [];
      if (c.type === 'reviewed') return scComments.some(cm => cm.author.toLowerCase() === 'me'  && parseTag(cm.content).tag === 'PASS');
      if (c.type === 'codex')    return scComments.some(cm => cm.author.toLowerCase() === 'gpt' && parseTag(cm.content).tag === 'PASS');
      return state[c.type].has(sc.id);
    }).length,
  })).filter(p => p.count > 0);

  return (
    <>
      <section className="section" id={`heatmap-${sectionId}`}>
        <div className="section-header">
          <div className="section-number">{sectionLetter}</div>
          <div className="section-title">Coverage Heatmap</div>
          <div className="section-subtitle">{overviewTitle} — {scenarios.length} scenarios</div>
        </div>
        <div className="dag-overview-card">
          <div className="dag-overview-header">
            <span className="dag-overview-title">Node Hit Frequency</span>
            {techniqueBadge && <Badge cls={techniqueBadge.cls} label={techniqueBadge.label} />}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
              <button
                onClick={() => setHeatmapFit(true)}
                title="Fit to width"
                style={{
                  padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                  borderRadius: '4px 0 0 4px', border: '1px solid var(--border)',
                  background: heatmapFit ? 'var(--accent)' : 'var(--surface)',
                  color: heatmapFit ? '#fff' : 'var(--muted)',
                  letterSpacing: '0.5px',
                }}>
                FIT
              </button>
              <button
                onClick={() => setHeatmapFit(false)}
                title="Scroll horizontally"
                style={{
                  padding: '3px 8px', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                  borderRadius: '0 4px 4px 0', border: '1px solid var(--border)', borderLeft: 'none',
                  background: !heatmapFit ? 'var(--accent)' : 'var(--surface)',
                  color: !heatmapFit ? '#fff' : 'var(--muted)',
                  letterSpacing: '0.5px',
                }}>
                SCROLL
              </button>
            </div>
          </div>
          <DagHeatmap nodes={nodes} edges={edges} scenarios={scenarios} {...overviewOpts} fit={heatmapFit} />
        </div>
      </section>

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
                reviewed:    state.reviewed.has(sc.id),
                codex:       state.codex.has(sc.id),
                implemented: state.implemented.has(sc.id),
                testrun:     state.testrun.has(sc.id),
              }}
              comments={comments[sc.id] ?? []}
              tcRow={tcMetaMap[sc.id]}
              allAuthors={allAuthors}
              onToggle={type => toggle(sc.id, type)}
              onAddComment={(author, content) => addComment(sc.id, author, content)}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
            />
          ))}
        </div>
      </section>
    </>
  );
}
