'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Comment, CommentsMap } from '@/server/reviews';

export type { Comment, CommentsMap };

export function useClarifyComments(storyId: string) {
  const [comments, setComments] = useState<CommentsMap>({});

  const refetch = useCallback(() => {
    if (!storyId) return;
    fetch(`/api/reviews?storyId=${encodeURIComponent(storyId)}`)
      .then(r => r.json())
      .then((data: { clarifyComments?: CommentsMap }) => {
        setComments(data.clarifyComments ?? {});
      });
  }, [storyId]);

  useEffect(() => { refetch(); }, [refetch]);

  const refetchRef = useRef(refetch);
  refetchRef.current = refetch;

  useEffect(() => {
    if (!storyId) return;
    const es = new EventSource(`/api/stream?storyId=${encodeURIComponent(storyId)}`);
    es.onmessage = () => refetchRef.current();
    es.onerror   = () => {};
    return () => es.close();
  }, [storyId]);

  const addComment = useCallback(async (clarifyId: string, author: string, content: string): Promise<void> => {
    const res  = await fetch('/api/clarify-comments', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ storyId, clarifyId, author, content }),
    });
    const data = await res.json() as { comment: Comment };
    setComments(prev => ({
      ...prev,
      [clarifyId]: [...(prev[clarifyId] ?? []), data.comment],
    }));
  }, [storyId]);

  const editComment = useCallback((id: number, content: string) => {
    setComments(prev => {
      const next = { ...prev };
      for (const cid in next) {
        next[cid] = next[cid].map(c =>
          c.id === id ? { ...c, content, updatedAt: new Date().toISOString() } : c
        );
      }
      return next;
    });
    fetch('/api/clarify-comments', {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id, content }),
    });
  }, []);

  const deleteComment = useCallback((id: number) => {
    setComments(prev => {
      const next = { ...prev };
      for (const cid in next) {
        next[cid] = next[cid].filter(c => c.id !== id);
      }
      return next;
    });
    fetch(`/api/clarify-comments?id=${id}`, { method: 'DELETE' });
  }, []);

  return { comments, addComment, editComment, deleteComment };
}
