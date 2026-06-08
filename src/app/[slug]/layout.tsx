import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Sidebar from '@/client/components/Sidebar';
import type { NavSection } from '@/client/components/Sidebar';
import TabBar from '@/client/components/TabBar';
import { getDb } from '@/db/client';
import {
  getStory,
  getStoryPlatformMeta,
  getTechniqueRows,
  getCoverageRows,
  getCoverageStatCards,
  getAutomationCards,
  getTestDataRows,
  getScenarioSections,
} from '@/db/queries/story';
import { FLOWS_REGISTRY, CONFLICT_REGISTRY, SCENARIOMAP_META } from '@/data/registry';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const db = await getDb();
  const story = getStory(db, slug);
  if (!story) return { title: 'Not Found' };
  return {
    title: `${story.id} · ${story.title} — Test Design`,
    description: `Test design for ${story.title}.`,
  };
}

export default async function DynamicStoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = await getDb();
  const story = getStory(db, slug);
  if (!story) notFound();

  const { platform, framework } = getStoryPlatformMeta(db, story.id);
  const platformInfo = [platform, framework].filter(Boolean).join(' · ');

  // Load TypeScript modules needed for nav construction
  const flowsModule    = await FLOWS_REGISTRY[slug]?.();
  const conflictsModule = await CONFLICT_REGISTRY[slug]?.();

  // DB-driven section presence checks
  const techniqueRows    = getTechniqueRows(db, story.id);
  const coverageRows     = getCoverageRows(db, story.id);
  const coverageStatCards = getCoverageStatCards(db, story.id);
  const automationCards  = getAutomationCards(db, story.id);
  const testDataRows     = getTestDataRows(db, story.id);
  const scenarioSections = getScenarioSections(db, story.id);

  const conflictCount = conflictsModule
    ? conflictsModule.CONFLICT_ITEMS.filter((i: any) => i.status === 'pending' || i.status === 'on-hold').length
    : 0;

  const nav: NavSection[] = [];

  // Docs
  const docsLinks: NavSection['links'] = [{ href: '#requirements', label: 'Requirement' }];
  if (conflictsModule) docsLinks.push({ href: '#conflict-notes', label: 'Conflicts & Clarify' });
  nav.push({ title: 'Docs', links: docsLinks });

  // Overview
  const overviewLinks: NavSection['links'] = [{ href: '#hero', label: 'Summary' }];
  if (techniqueRows.length) overviewLinks.push({ href: '#techniques', label: 'Technique Selection' });
  if (coverageRows.length)  overviewLinks.push({ href: '#coverage',   label: 'Coverage Summary'   });
  nav.push({ title: 'Overview', links: overviewLinks });

  // Diagrams
  if (flowsModule?.MASTER_FLOW_SECTION) {
    const diagramLinks: NavSection['links'] = [
      { href: `#${flowsModule.MASTER_FLOW_SECTION.sectionId}`, label: flowsModule.MASTER_FLOW_SECTION.title },
    ];
    for (const flow of flowsModule.FLOW_SECTIONS) {
      if (flow) diagramLinks.push({ href: `#${flow.sectionId}`, label: flow.title });
    }
    nav.push({ title: 'Diagrams', links: diagramLinks });
  }

  // Analysis
  const analysisLinks: NavSection['links'] = [];
  if (coverageStatCards.length) analysisLinks.push({ href: '#coverage-map', label: 'Coverage Report'    });
  if (automationCards.length)   analysisLinks.push({ href: '#automation',   label: 'Automation Notes'   });
  if (testDataRows.length)      analysisLinks.push({ href: '#testdata',     label: 'Test Data'           });
  if (analysisLinks.length) nav.push({ title: 'Analysis', links: analysisLinks });

  // Scenario Maps
  const smapLinks: NavSection['links'] = [];
  if (scenarioSections.length) {
    // DB-driven (pp2): use data_key as sectionId suffix, strip "Scenario Map — " prefix for nav label
    for (const s of scenarioSections) {
      smapLinks.push({
        href: `#smap-${s.dataKey}`,
        label: s.title.replace(/^Scenario Map — /, ''),
      });
    }
  } else if (SCENARIOMAP_META[slug]) {
    const meta = SCENARIOMAP_META[slug];
    smapLinks.push({ href: `#${meta.sectionId}`, label: meta.title.replace(/^Scenario Map — /, '') });
  }
  if (smapLinks.length) nav.push({ title: 'Scenario Maps', links: smapLinks });

  return (
    <>
      <div className="topbar">
        <span className="badge-jira">{story.id}</span>
        <h1>{story.title} — Test Design</h1>
        {platformInfo && <span className="platform">{platformInfo}</span>}
      </div>
      <Sidebar nav={nav} />
      <main className="main">
        <TabBar conflictCount={conflictCount || undefined} />
        {children}
      </main>
    </>
  );
}
