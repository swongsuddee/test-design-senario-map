'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ALL_STORIES } from '@/data/stories';

export interface NavLink    { href: string; label: string; badge?: number; }
export interface NavSection { title: string; links: NavLink[]; }

export default function Sidebar({ nav }: { nav: NavSection[] }) {
  const pathname = usePathname();

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
          const link = document.querySelector<HTMLAnchorElement>(`.sidebar-sections a[href="#${e.target.id}"]`);
          link?.classList.add('active');
        }
      }
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sidebar">
      <Link href="/" className="sidebar-home">← Home</Link>
      <div className="sidebar-stories">
        {ALL_STORIES.map((story) => (
          <Link
            key={story.id}
            href={story.href}
            className={`sidebar-story-link${pathname === story.href ? ' active' : ''}`}
          >
            <div className="sidebar-story-row">
              <span className="sidebar-story-id">{story.id}</span>
              {story.pending != null && story.pending > 0 && (
                <span className="nav-badge">{story.pending} <span className="nav-badge-icon">?</span></span>
              )}
            </div>
            <span className="sidebar-story-title">{story.title}</span>
          </Link>
        ))}
      </div>

      {nav.length > 0 && (
        <>
          <div className="sidebar-divider" />
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
                      <span className="nav-badge">{link.badge} <span className="nav-badge-icon">?</span></span>
                    )}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
