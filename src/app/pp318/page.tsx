import RequirementSection from '@/components/RequirementSection';

const META_CARDS = [
  { label: 'Jira Story', value: 'PP-318',         cls: 'blue'  },
  { label: 'Platform',   value: 'Web (Backoffice)',        cls: ''      },
  { label: 'Framework',  value: 'WebdriverIO + Appium + Mocha', cls: '' },
  { label: 'Language',   value: 'TypeScript',         cls: ''      },
  { label: 'App',        value: 'POPPA App',           cls: ''      },
  { label: 'Status',     value: 'In Progress',            cls: 'orange' },
];

export default function PP318Page() {
  return (
    <>
      <div className="hero" id="hero">
        <div className="hero-badge">Draft · POPPA Story</div>
        <h2><span>PP-318</span> · Your Vibes — BO Management</h2>
        <p>Requirement document for Your Vibes — BO Management. Test design and flow diagrams will be added when development is complete.</p>
        <div className="hero-stats">
          {[['—','Test Cases'],['—','States & Transitions'],['—','Coverage'],['—','Automatable']].map(([v, l]) => (
            <div key={l} className="stat">
              <div className="stat-value">{v}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="meta-grid">
        {META_CARDS.map(({ label, value, cls }) => (
          <div key={label} className="meta-card">
            <div className="meta-label">{label}</div>
            <div className={`meta-value${cls ? ` ${cls}` : ''}`}>{value}</div>
          </div>
        ))}
      </div>

      <section className="section" id="requirements">
        <RequirementSection story="PP-318" />
      </section>
    </>
  );
}
