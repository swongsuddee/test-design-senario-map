/**
 * dag-renderer.js
 *
 * Reusable SVG DAG renderer for test-design presentation pages.
 *
 * Public API
 * ----------
 * renderDag(container, nodes, edges, opts?)
 *   Renders a directed graph into `container` (any DOM element).
 *
 *   nodes[]   { id, col, row, name, type:'action'|'decision'|'expect', details }
 *   edges[]   { from, to, label? }
 *   opts      { activeNodes[], activeEdges[[from,to]], cellW, cellH, r, pad }
 *
 * buildScenarioCards(containerId, nodes, edges, scenarios, dagOpts?)
 *   Appends one .smap-card per scenario into the element with the given id.
 *
 *   scenarios[] {
 *     id, name, type, typeCls,
 *     steps: [{ action, data, expect }],
 *     activePath: string[],
 *     activeEdges: [string, string][]
 *   }
 */

// ── renderDag ──────────────────────────────────────────────────────────────
function renderDag(container, nodes, edges, opts) {
  var _opts = opts || {};
  var activeNodes = _opts.activeNodes || [];
  var activeEdges = _opts.activeEdges || [];
  var cellW = _opts.cellW !== undefined ? _opts.cellW : 160;
  var cellH = _opts.cellH !== undefined ? _opts.cellH : 92;
  var r     = _opts.r     !== undefined ? _opts.r     : 28;
  var pad   = _opts.pad   !== undefined ? _opts.pad   : 52;

  var activeNodeSet = new Set(activeNodes);
  var activeEdgeSet = new Set(activeEdges.map(function(e) { return e[0] + '->' + e[1]; }));

  var maxCol = Math.max.apply(null, nodes.map(function(n) { return n.col; }));
  var maxRow = Math.max.apply(null, nodes.map(function(n) { return n.row; }));
  var W = (maxCol + 1) * cellW + pad * 2;
  var H = (maxRow + 1) * cellH + pad * 2;

  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    var a = attrs || {};
    for (var k in a) { e.setAttribute(k, a[k]); }
    if (text != null) { e.textContent = text; }
    return e;
  }

  function pos(id) {
    var n = null;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) { n = nodes[i]; break; }
    }
    if (!n) return null;
    return { x: pad + n.col * cellW + cellW / 2, y: pad + n.row * cellH + cellH / 2 };
  }

  var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, style: 'display:block' });

  // Arrowhead markers (one per accent color so active arrows tip correctly)
  var defs = el('defs');
  [
    ['dag-marr-action',   '#FF6B35'],
    ['dag-marr-muted',    '#3a3f58'],
    ['dag-marr-expect',   '#4CAF50'],
    ['dag-marr-decision', '#FF9800'],
  ].forEach(function(pair) {
    var mk = el('marker', { id: pair[0], markerWidth: 8, markerHeight: 8, refX: 6, refY: 3, orient: 'auto' });
    mk.appendChild(el('path', { d: 'M 0 0 L 6 3 L 0 6 Z', fill: pair[1] }));
    defs.appendChild(mk);
  });
  svg.appendChild(defs);

  // ── Edges ────────────────────────────────────────────────────────────────
  edges.forEach(function(edge) {
    var sp = pos(edge.from);
    var tp = pos(edge.to);
    if (!sp || !tp) return;

    var active = activeEdgeSet.has(edge.from + '->' + edge.to);

    // Target node type determines active arrow color
    var targetNode = null;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === edge.to) { targetNode = nodes[i]; break; }
    }
    var targetType = targetNode ? targetNode.type : 'action';
    var markerMap = { action: 'dag-marr-action', expect: 'dag-marr-expect', decision: 'dag-marr-decision' };
    var marker    = active ? 'url(#' + (markerMap[targetType] || 'dag-marr-action') + ')' : 'url(#dag-marr-muted)';
    var colorMap  = { action: '#FF6B35', expect: '#4CAF50', decision: '#FF9800' };
    var strokeColor = active ? (colorMap[targetType] || '#FF6B35') : '#3a3f58';

    var dx = tp.x - sp.x;
    var dy = tp.y - sp.y;
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / dist;
    var uy = dy / dist;
    var sx = sp.x + ux * r;
    var sy = sp.y + uy * r;
    var ex = tp.x - ux * (r + 7);
    var ey = tp.y - uy * (r + 7);

    var d;
    if (Math.abs(dy) < 6) {
      // Horizontal — straight line
      d = 'M ' + sx + ' ' + sy + ' L ' + ex + ' ' + ey;
    } else if (dx >= 0) {
      // Forward + downward — S-curve
      var midy = (sp.y + tp.y) / 2;
      d = 'M ' + sx + ' ' + sy +
          ' C ' + sp.x + ' ' + midy +
          ', '  + tp.x + ' ' + midy +
          ', '  + ex   + ' ' + ey;
    } else {
      // Back edge — arc above
      var archy = Math.min(sp.y, tp.y) - Math.abs(dx) * 0.35;
      d = 'M ' + sx + ' ' + sy +
          ' Q ' + ((sp.x + tp.x) / 2) + ' ' + archy +
          ', '  + ex + ' ' + ey;
    }

    svg.appendChild(el('path', {
      d: d,
      stroke: strokeColor,
      'stroke-width': active ? 2 : 1.5,
      fill: 'none',
      'marker-end': marker,
      opacity: active ? 1 : 0.35,
    }));

    if (edge.label) {
      var isVert = Math.abs(dy) > Math.abs(dx);
      var lx = (sp.x + tp.x) / 2 + (isVert ? 18 : 0);
      var ly = (sp.y + tp.y) / 2 + (isVert ? 0 : -9);
      svg.appendChild(el('text', {
        x: lx, y: ly,
        'text-anchor': isVert ? 'start' : 'middle',
        fill: active ? strokeColor : '#404568',
        'font-size': '9px',
        opacity: active ? 1 : 0.5,
        'font-family': 'Segoe UI,system-ui,sans-serif',
      }, edge.label));
    }
  });

  // ── Nodes ────────────────────────────────────────────────────────────────
  nodes.forEach(function(node) {
    var p = pos(node.id);
    if (!p) return;
    var active = activeNodeSet.has(node.id);

    var typeColors = {
      action:   active ? { fill: '#1e2438', stroke: '#FF6B35' } : { fill: '#13151f', stroke: '#2c3050' },
      decision: active ? { fill: '#241c10', stroke: '#FF9800' } : { fill: '#13151f', stroke: '#2c3050' },
      expect:   active ? { fill: '#132018', stroke: '#4CAF50' } : { fill: '#13151f', stroke: '#2c3050' },
    };
    var clr = typeColors[node.type] || typeColors.action;
    var accentColors = { action: '#FF6B35', decision: '#FF9800', expect: '#4CAF50' };
    var accentClr = accentColors[node.type] || '#FF6B35';

    // Glow ring for active nodes
    if (active) {
      svg.appendChild(el('circle', {
        cx: p.x, cy: p.y, r: r + 7,
        fill: 'none', stroke: accentClr, 'stroke-width': 1, opacity: 0.25,
      }));
    }

    // Node circle
    svg.appendChild(el('circle', {
      cx: p.x, cy: p.y, r: r,
      fill: clr.fill, stroke: clr.stroke,
      'stroke-width': active ? 2 : 1.5,
    }));

    // Label (supports \n for multi-line)
    var lines = node.name.split('\n');
    var lh = 11;
    lines.forEach(function(ln, i) {
      var textY = p.y - (lines.length - 1) * lh / 2 + i * lh + 3.5;
      svg.appendChild(el('text', {
        x: p.x, y: textY,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        fill: active ? '#e8eaf0' : '#505878',
        'font-size': '9.5px',
        'font-weight': active ? '700' : '400',
        'font-family': 'Segoe UI,system-ui,sans-serif',
      }, ln));
    });

    // Node ID below the circle
    svg.appendChild(el('text', {
      x: p.x, y: p.y + r + 12,
      'text-anchor': 'middle',
      fill: active ? accentClr : '#383d60',
      'font-size': '8px', 'font-weight': '700',
      'font-family': 'Segoe UI,system-ui,sans-serif',
    }, node.id));
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

// ── buildScenarioCards ─────────────────────────────────────────────────────
function buildScenarioCards(containerId, nodes, edges, scenarios, dagOpts) {
  var container = document.getElementById(containerId);
  if (!container) return;

  scenarios.forEach(function(sc) {
    var card = document.createElement('div');
    card.className = 'smap-card';

    // Header
    var head = document.createElement('div');
    head.className = 'smap-head';
    head.innerHTML =
      '<span class="tc-id">' + sc.id + '</span>' +
      '<span style="font-size:13px;flex:1;line-height:1.4">' + sc.name + '</span>' +
      '<span class="badge badge-' + sc.typeCls + '">' + sc.type + '</span>';
    card.appendChild(head);

    var body = document.createElement('div');
    body.className = 'smap-body';

    // Steps table
    var stepsPane = document.createElement('div');
    stepsPane.className = 'smap-steps';
    var rows = sc.steps.map(function(s, i) {
      return '<tr>' +
        '<td class="sn">' + (i + 1) + '</td>' +
        '<td class="sa">' + s.action + '</td>' +
        '<td class="sd">' + s.data + '</td>' +
        '<td class="se">' + s.expect + '</td>' +
        '</tr>';
    }).join('');
    stepsPane.innerHTML =
      '<table class="steps-tbl">' +
      '<colgroup>' +
        '<col class="col-n"><col class="col-step"><col class="col-data"><col class="col-exp">' +
      '</colgroup>' +
      '<thead><tr>' +
        '<th>#</th><th>Test Step</th><th>Test Data</th><th>Expected Result</th>' +
      '</tr></thead>' +
      '<tbody>' + rows + '</tbody>' +
      '</table>';
    body.appendChild(stepsPane);

    // DAG pane
    var dagPane = document.createElement('div');
    dagPane.className = 'smap-dag';
    var dagLabel = document.createElement('div');
    dagLabel.className = 'smap-dag-label';
    dagLabel.textContent = 'State & Transition Path';
    dagPane.appendChild(dagLabel);
    body.appendChild(dagPane);

    card.appendChild(body);
    container.appendChild(card);

    // Extend dagOpts with this scenario's active path
    var opts = {};
    if (dagOpts) {
      for (var k in dagOpts) { opts[k] = dagOpts[k]; }
    }
    opts.activeNodes = sc.activePath;
    opts.activeEdges = sc.activeEdges;

    renderDag(dagPane, nodes, edges, opts);
  });
}
