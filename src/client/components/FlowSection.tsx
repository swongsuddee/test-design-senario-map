import type { FlowSectionDef } from '@/types';
import MermaidChart from './MermaidChart';

function RefGrid({ states, transitions }: { states: [string,string][]; transitions: [string,string][] }) {
  return (
    <div className="ref-grid">
      <div className="ref-block">
        <h4>States</h4>
        {states.map(([id, label]) => (
          <div key={id} className="ref-row">
            <span className="ref-id">{id}</span>
            <span className="ref-type">State</span>
            <span className="ref-label">{label}</span>
          </div>
        ))}
      </div>
      <div className="ref-block">
        <h4>Transitions</h4>
        {transitions.map(([id, label]) => (
          <div key={id} className="ref-row">
            <span className="ref-id">{id}</span>
            <span className="ref-type">Trans</span>
            <span className="ref-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FlowSection({ def }: { def: FlowSectionDef }) {
  return (
    <section className="section" id={def.sectionId}>
      <div className="section-header">
        <div className="section-number">{def.num}</div>
        <div className="section-title">{def.title}</div>
        <div className="section-subtitle">{def.subtitle}</div>
      </div>
      {def.states && def.transitions && (
        <RefGrid states={def.states} transitions={def.transitions} />
      )}
      <div className="diagram-card">
        {def.num === '1' && (
          <>
            <div className="diagram-title">Master Auth Flow</div>
            <div className="diagram-subtitle">From App Launch through all auth paths to Home Page</div>
          </>
        )}
        <MermaidChart chart={def.chart} />
      </div>
    </section>
  );
}
