'use client';

import { useState, useEffect, useCallback } from 'react';

const TABS = [
  { id: 'overview',    label: 'overview'           },
  { id: 'requirement', label: 'requirement'         },
  { id: 'conflicts',   label: 'conflict & clarify'  },
  { id: 'diagrams',    label: 'diagrams & analysis' },
  { id: 'testcases',   label: 'test case & map'     },
  { id: 'testdata',    label: 'test data'           },
] as const;

type TabId = typeof TABS[number]['id'];

function classifySection(el: Element): TabId {
  const id = el.id;
  if (el.classList.contains('hero') || el.classList.contains('meta-grid')) return 'overview';
  if (id === 'techniques' || id === 'coverage') return 'overview';
  if (id.startsWith('heatmap-')) return 'overview';
  if (id === 'requirements') return 'requirement';
  if (id === 'master-flow' || id.startsWith('flow-')) return 'diagrams';
  if (id === 'coverage-map' || id === 'automation') return 'diagrams';
  if (id.startsWith('tc-') || id.startsWith('smap-')) return 'testcases';
  if (id === 'testdata') return 'testdata';
  if (id.startsWith('conflict') || id.startsWith('clarify')) return 'conflicts';
  return 'overview';
}

interface TabBarProps {
  conflictCount?: number;
}

export default function TabBar({ conflictCount = 0 }: TabBarProps) {
  const [active, setActive] = useState<TabId>('overview');
  const [noConflicts, setNoConflicts] = useState(false);

  const applyTab = useCallback((tab: TabId) => {
    const main = document.querySelector<HTMLElement>('.main');
    if (!main) return;

    const elements = main.querySelectorAll<HTMLElement>('.section, .hero, .meta-grid');
    let hasConflictSection = false;

    elements.forEach(el => {
      const elTab = classifySection(el);
      if (elTab === 'conflicts') hasConflictSection = true;
      el.style.display = elTab === tab ? '' : 'none';
    });

    if (tab === 'conflicts') setNoConflicts(!hasConflictSection);
  }, []);

  useEffect(() => {
    applyTab(active);
  }, [active, applyTab]);

  useEffect(() => {
    const onNavigate = (e: Event) => {
      const href = (e as CustomEvent<{ href: string }>).detail?.href;
      if (!href?.startsWith('#')) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      const tab = classifySection(target);
      setActive(tab);
      // scroll after tab reveals the section
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };
    window.addEventListener('sidebar:navigate', onNavigate);
    return () => window.removeEventListener('sidebar:navigate', onNavigate);
  }, [applyTab]);

  return (
    <>
      <div className="tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn${active === tab.id ? ' active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
            {tab.id === 'conflicts' && conflictCount > 0 && (
              <span className="tab-conflict-badge">{conflictCount} <span className="tab-conflict-icon">?</span></span>
            )}
          </button>
        ))}
      </div>
      {active === 'conflicts' && noConflicts && (
        <div className="tab-empty">
          No conflict or clarification notes recorded for this story.
        </div>
      )}
    </>
  );
}
