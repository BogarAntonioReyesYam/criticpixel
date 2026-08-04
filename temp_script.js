const fs = require('fs');
const path = require('path');
const mdPath = path.join(process.cwd(), 'MATRIZ_DE_PRUEBA.md');
const htmlPath = path.join(process.cwd(), 'matriz_temp.html');
const pdfPath = path.join(process.cwd(), 'MATRIZ_DE_PRUEBA.pdf');
const content = fs.readFileSync(mdPath, 'utf8');
const lines = content.split(/\r?\n/);
let html = '';
let inTable = false;
let tableRows = [];
const flushTable = () => {
  if (!tableRows.length) return;
  html += '<table>';
  tableRows.forEach((row, idx) => {
    const cells = row.split('|').slice(1, -1).map(c => c.trim());
    const tag = idx === 0 ? 'th' : 'td';
    html += `<tr>${cells.map(cell => `<${tag}>${escapeHtml(cell)}</${tag}>`).join('')}</tr>`;
  });
  html += '</table>';
  tableRows = [];
};
function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
for (let line of lines) {
  const trimmed = line.trim();
  if (!trimmed) {
    if (inTable) { flushTable(); inTable = false; }
    continue;
  }
  if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
    if (!inTable) { inTable = true; }
    tableRows.push(trimmed);
    continue;
  }
  if (inTable) { flushTable(); inTable = false; }
  if (/^#{1,6}\s+/.test(trimmed)) {
    const level = trimmed.match(/^#+/)[0].length;
    const text = trimmed.replace(/^#{1,6}\s+/, '');
    html += `<h${level}>${escapeHtml(text)}</h${level}>`;
  } else if (/^[-*]\s+/.test(trimmed)) {
    html += `<li>${escapeHtml(trimmed.replace(/^[-*]\s+/, ''))}</li>`;
  } else if (/^>\s/.test(trimmed)) {
    html += `<blockquote>${escapeHtml(trimmed.replace(/^>\s/, ''))}</blockquote>`;
  } else if (/^\d+\.\s+/.test(trimmed)) {
    html += `<p>${escapeHtml(trimmed)}</p>`;
  } else if (/^\*\*.*\*\*$/.test(trimmed)) {
    html += `<p>${escapeHtml(trimmed)}</p>`;
  } else {
    html += `<p>${escapeHtml(trimmed)}</p>`;
  }
}
if (inTable) flushTable();
const fullHtml = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8" /><title>Matriz de Pruebas - CriticPixel</title><style>body{font-family:Arial,sans-serif;line-height:1.45;margin:24px;color:#111}h1,h2,h3{color:#0f172a}p,li{font-size:11px}table{border-collapse:collapse;width:100%;font-size:9px;margin:8px 0}th,td{border:1px solid #cbd5e1;padding:6px;text-align:left;vertical-align:top}th{background:#f1f5f9}ul{padding-left:18px}blockquote{border-left:3px solid #cbd5e1;padding-left:10px;color:#475569}</style></head><body>${html}</body></html>`;
fs.writeFileSync(htmlPath, fullHtml, 'utf8');
console.log('HTML_LISTO');
