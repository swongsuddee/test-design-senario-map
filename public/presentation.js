/**
 * presentation.js
 *
 * Shared bootstrap for test-design presentation pages.
 * Initialises Mermaid (dark theme) and wires the sidebar active-link observer.
 *
 * Depends on: mermaid (loaded via CDN before this script)
 */

mermaid.initialize({
  startOnLoad: true,
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

// Highlight the matching sidebar link as the user scrolls
(function initSidebarObserver() {
  var sections = document.querySelectorAll('.section, #hero');
  var links    = document.querySelectorAll('.sidebar a');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        links.forEach(function(l) { l.classList.remove('active'); });
        var link = document.querySelector('.sidebar a[href="#' + e.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(function(s) { observer.observe(s); });
})();
