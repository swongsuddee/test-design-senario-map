'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ALL_STORIES } from '@/data/stories';

export interface NavLink    { href: string; label: string; badge?: number; }
export interface NavSection { title: string; links: NavLink[]; }

const STORAGE_KEY = 'sidebar-stories-h';
const DEFAULT_H   = 300;

// Build ordered group list preserving declaration order in stories.ts
const GROUP_ORDER = [...new Set(ALL_STORIES.map(s => s.group))];
const GROUPED = GROUP_ORDER.reduce<Record<string, typeof ALL_STORIES>>((acc, g) => {
  acc[g] = ALL_STORIES.filter(s => s.group === g);
  return acc;
}, {});

export default function Sidebar({ nav }: { nav: NavSection[] }) {
  const pathname = usePathname();
  const [storiesH, setStoriesH] = useState(DEFAULT_H);
  const draggingRef = useRef(false);

  useEffect(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v) setStoriesH(Math.max(80, parseInt(v)));
  }, []);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startY  = e.clientY;
    const startH  = storiesH;
    draggingRef.current = true;

    const clamp = (h: number) => Math.max(80, Math.min(window.innerHeight - 200, h));

    const onMove = (ev: MouseEvent) => {
      if (!draggingRef.current) return;
      setStoriesH(clamp(startH + ev.clientY - startY));
    };
    const onUp = (ev: MouseEvent) => {
      const h = clamp(startH + ev.clientY - startY);
      setStoriesH(h);
      localStorage.setItem(STORAGE_KEY, String(h));
      draggingRef.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [storiesH]);

  const handleSectionClick = useCallback((href: string) => {
    window.dispatchEvent(new CustomEvent('sidebar:navigate', { detail: { href } }));
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section, #hero');
    const links    = document.querySelectorAll<HTMLAnchorElement>('.sidebar-sections a');

    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const link = document.querySelector<HTMLAnchorElement>(
            `.sidebar-sections a[href="#${e.target.id}"]`,
          );
          link?.classList.add('active');
        }
      }
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const hasNav = nav.length > 0;

  return (
    <nav className="sidebar">
      <Link href="/" className="sidebar-home">← Home</Link>

      {/* ── Stories panel (resizable) ── */}
      <div className="sidebar-stories" style={{ height: storiesH }}>
        {GROUP_ORDER.map(group => (
          <div key={group}>
            <div className="sidebar-group-hdr">{group}</div>
            {GROUPED[group].map(story => (
              <Link
                key={story.id}
                href={story.href}
                className={`sidebar-story-link${pathname === story.href ? ' active' : ''}`}
              >
                <div className="sidebar-story-row">
                  <span className="sidebar-story-id">{story.id}</span>
                  {story.pending != null && story.pending > 0 && (
                    <span className="nav-badge">
                      {story.pending} <span className="nav-badge-icon">?</span>
                    </span>
                  )}
                </div>
                <span className="sidebar-story-title">{story.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* ── Drag handle ── */}
      {hasNav && (
        <div className="sidebar-drag-handle" onMouseDown={onDragStart} title="Drag to resize" />
      )}
      {!hasNav && <div className="sidebar-divider" />}

      {/* ── Section nav (fills remaining height) ── */}
      {hasNav && (
        <div className="sidebar-sections">
          {nav.map((section) => (
            <div key={section.title}>
              <div className="sidebar-section">{section.title}</div>
              {section.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleSectionClick(link.href)}
                >
                  {link.label}
                  {link.badge != null && link.badge > 0 && (
                    <span className="nav-badge">
                      {link.badge} <span className="nav-badge-icon">?</span>
                    </span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
