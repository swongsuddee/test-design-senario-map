'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReviewType, ReviewMap, Comment, CommentsMap, RejectionsMap } from '@/server/reviews';

export type { ReviewType, Comment, CommentsMap, RejectionsMap };

type ReviewState = Record<ReviewType, Set<string>>;

function toState(map: Partial<ReviewMap>): ReviewState {
  return {
    reviewed:    new Set(map.reviewed    ?? []),
    codex:       new Set(map.codex       ?? []),
    implemented: new Set(map.implemented ?? []),
    testrun:     new Set(map.testrun     ?? []),
    rejected:    new Set(map.rejected    ?? []),
  };
}

export function useReviews(storyId: string) {
  const [state,      setState]      = useState<ReviewState>(toState({}));
  const [comments,   setComments]   = useState<CommentsMap>({});
  const [rejections, setRejections] = useState<RejectionsMap>({});

  const refetch = useCallback(() => {
    if (!storyId) return;
    fetch(`/api/reviews?storyId=${encodeURIComponent(storyId)}`)
      .then(r => r.json())
      .then((data: Partial<ReviewMap> & { comments?: CommentsMap; rejections?: RejectionsMap }) => {
        setState(toState(data));
        setComments(data.comments ?? {});
        setRejections(data.rejections ?? {});
      });
  }, [storyId]);

  // initial load
  useEffect(() => { refetch(); }, [refetch]);

  // SSE — refetch whenever the server emits a refresh event for this story
  const refetchRef = useRef(refetch);
  refetchRef.current = refetch;

  useEffect(() => {
    if (!storyId) return;
    const es = new EventSource(`/api/stream?storyId=${encodeURIComponent(storyId)}`);
    es.onmessage = () => refetchRef.current();
    es.onerror   = () => {};   // suppress console noise on normal disconnect
    return () => es.close();
  }, [storyId]);

  const toggle = useCallback((tcId: string, type: ReviewType) => {
    setState(prev => {
      const next    = { ...prev, [type]: new Set(prev[type]) };
      const checked = !prev[type].has(tcId);
      checked ? next[type].add(tcId) : next[type].delete(tcId);
      fetch('/api/reviews', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ storyId, tcId, type, checked }),
      });
      return next;
    });
  }, [storyId]);

  const setReview = useCallback((tcId: string, type: ReviewType, checked: boolean) => {
    setState(prev => {
      if (prev[type].has(tcId) === checked) return prev;
      const next = { ...prev, [type]: new Set(prev[type]) };
      checked ? next[type].add(tcId) : next[type].delete(tcId);
      fetch('/api/reviews', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ storyId, tcId, type, checked }),
      });
      return next;
    });
  }, [storyId]);

  const addComment = useCallback(async (tcId: string, author: string, content: string): Promise<void> => {
    const res = await fetch('/api/comments', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ storyId, tcId, author, content }),
    });
    const data = await res.json() as { comment: Comment };
    setComments(prev => ({
      ...prev,
      [tcId]: [...(prev[tcId] ?? []), data.comment],
    }));
  }, [storyId]);

  const editComment = useCallback((id: number, content: string) => {
    setComments(prev => {
      const next = { ...prev };
      for (const tcId in next) {
        next[tcId] = next[tcId].map(c =>
          c.id === id ? { ...c, content, updatedAt: new Date().toISOString() } : c
        );
      }
      return next;
    });
    fetch('/api/comments', {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id, content }),
    });
  }, []);

  const deleteComment = useCallback((id: number) => {
    setComments(prev => {
      const next = { ...prev };
      for (const tcId in next) {
        next[tcId] = next[tcId].filter(c => c.id !== id);
      }
      return next;
    });
    fetch(`/api/comments?id=${id}`, { method: 'DELETE' });
  }, []);

  const setRejection = useCallback((tcId: string, reason: string) => {
    setRejections(prev => ({ ...prev, [tcId]: reason }));
    fetch('/api/rejections', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ storyId, tcId, reason }),
    });
  }, [storyId]);

  return { state, toggle, setReview, comments, rejections, addComment, editComment, deleteComment, setRejection };
}
