'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    mermaid: {
      initialize: (config: Record<string, unknown>) => void;
      run: (opts: { nodes: Element[] }) => Promise<void>;
    };
  }
}

interface Props {
  chart: string;
}

let initialised = false;

export default function MermaidChart({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;

    const run = async () => {
      if (cancelled || !ref.current) return;

      if (!initialised) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            darkMode: true,
            background: '#1a1d27',
            primaryColor: '#2e3347',
            primaryTextColor: '#e8eaf0',
            primaryBorderColor: '#4a4f6a',
            lineColor: '#8b90a7',
            secondaryColor: '#22263a',
            tertiaryColor: '#12141f',
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            fontSize: '13px',
          },
          flowchart: { curve: 'basis', padding: 20 },
        });
        initialised = true;
      }

      if (cancelled || !ref.current) return;
      ref.current.removeAttribute('data-processed');
      ref.current.innerHTML = chart;

      try {
        await window.mermaid.run({ nodes: [ref.current] });
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : (err as { message?: string })?.message;
          console.warn('[MermaidChart]', msg ?? err);
        }
      }
    };

    if (typeof window !== 'undefined' && window.mermaid) {
      run();
    } else {
      const script = document.getElementById('mermaid-cdn') as HTMLScriptElement | null;
      if (!script) {
        const s = document.createElement('script');
        s.id = 'mermaid-cdn';
        s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        s.onload = () => run();
        document.head.appendChild(s);
      } else {
        script.addEventListener('load', () => run(), { once: true });
      }
    }

    return () => { cancelled = true; };
  }, [chart]);

  return <div ref={ref} className="mermaid" data-src={chart}>{chart}</div>;
}
