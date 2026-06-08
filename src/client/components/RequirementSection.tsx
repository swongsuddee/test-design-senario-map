import { existsSync, readdirSync, readFileSync } from 'fs';
import path from 'path';

interface Props {
  story: string; // e.g., 'PP-2'
}

// ── Minimal markdown → HTML ────────────────────────────────────────────────────
function mdToHtml(md: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const inline = (t: string) =>
    t
      .replace(/`([^`]+)`/g, (_, c) => `<code>${esc(c)}</code>`)
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(esc(lines[i]));
        i++;
      }
      out.push(`<pre${lang ? ` data-lang="${lang}"` : ''}><code>${code.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    // HR
    if (/^-{3,}$/.test(line.trim())) {
      out.push('<hr>');
      i++;
      continue;
    }

    // Heading
    const hm = line.match(/^(#{1,6})\s+(.+)$/);
    if (hm) {
      const lvl = Math.min(hm[1].length + 1, 6);
      out.push(`<h${lvl}>${inline(hm[2])}</h${lvl}>`);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const bq: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        bq.push(inline(lines[i].slice(2)));
        i++;
      }
      out.push(`<blockquote>${bq.join('<br>')}</blockquote>`);
      continue;
    }

    // Table
    if (line.trim().startsWith('|') && line.includes('|', 1)) {
      let seenSep = false;
      const headers: string[] = [];
      const bodyRows: string[][] = [];

      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
        const isSep = cells.length > 0 && cells.every(c => /^:?-+:?$/.test(c));
        if (isSep) { seenSep = true; i++; continue; }
        if (!seenSep) {
          headers.push(...cells);
        } else {
          bodyRows.push(cells);
        }
        i++;
      }

      let t = '<div class="req-table-wrap"><table>';
      if (headers.length) {
        t += `<thead><tr>${headers.map(h => `<th>${inline(h)}</th>`).join('')}</tr></thead>`;
      }
      if (bodyRows.length) {
        t += `<tbody>${bodyRows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
      }
      t += '</table></div>';
      out.push(t);
      continue;
    }

    // List (unordered or ordered)
    if (/^\s*[-*+]\s/.test(line) || /^\s*\d+\.\s/.test(line)) {
      const isOl = /^\s*\d+\.\s/.test(line);
      const tag = isOl ? 'ol' : 'ul';
      const items: string[] = [];
      while (i < lines.length && (/^\s*[-*+]\s/.test(lines[i]) || /^\s*\d+\.\s/.test(lines[i]))) {
        items.push(`<li>${inline(lines[i].replace(/^\s*(?:[-*+]|\d+\.)\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    // Blank line
    if (line.trim() === '') { out.push(''); i++; continue; }

    // Paragraph
    out.push(`<p>${inline(line)}</p>`);
    i++;
  }

  return out.join('\n');
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function RequirementSection({ story }: Props) {
  const reqBase = path.join(process.cwd(), 'src', 'requirements');

  if (!existsSync(reqBase)) {
    return <div className="req-empty">Requirements directory not configured.</div>;
  }

  const dirs = readdirSync(reqBase);
  const storyDir = dirs.find(d => d === story || d.startsWith(story + '_'));

  if (!storyDir) {
    return (
      <div className="req-empty">
        No original requirement document found for <strong>{story}</strong>.
      </div>
    );
  }

  const dirPath = path.join(reqBase, storyDir);
  const allFiles = readdirSync(dirPath).filter(f => f.endsWith('.md')).sort();
  const mainFile = allFiles.find(f => f.startsWith(story + '_')) ?? allFiles[0];
  const subFiles = allFiles.filter(f => f !== mainFile);

  const mainContent = readFileSync(path.join(dirPath, mainFile), 'utf-8');
  const mainHtml = mdToHtml(mainContent);

  return (
    <div className="req-section">
      <div className="req-file-badge">{mainFile.replace('.md', '')}</div>
      <div className="req-content" dangerouslySetInnerHTML={{ __html: mainHtml }} />
      {subFiles.length > 0 && (
        <details className="req-subtasks">
          <summary className="req-subtasks-toggle">
            {subFiles.length} related sub-task file{subFiles.length !== 1 ? 's' : ''}
          </summary>
          <ul className="req-subtasks-list">
            {subFiles.map(f => (
              <li key={f} className="req-subtask-item">{f.replace('.md', '')}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
