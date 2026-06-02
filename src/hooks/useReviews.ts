'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ReviewType, ReviewMap } from '@/db/reviews';

export type { ReviewType };

type ReviewState = Record<ReviewType, Set<string>>;

function toState(map: Partial<ReviewMap>): ReviewState {
  return {
    reviewed: new Set(map.reviewed ?? []),
    gpt:      new Set(map.gpt      ?? []),
    testrun:  new Set(map.testrun  ?? []),
  };
}

export function useReviews(storyId: string) {
  const [state, setState] = useState<ReviewState>(toState({}));

  useEffect(() => {
    if (!storyId) return;
    fetch(`/api/reviews?storyId=${encodeURIComponent(storyId)}`)
      .then(r => r.json())
      .then((data: Partial<ReviewMap>) => setState(toState(data)));
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

  return { state, toggle };
}
