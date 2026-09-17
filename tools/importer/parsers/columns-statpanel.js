/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-statpanel. Base: columns. Model: standalone.
 * Source: https://www.hdfcsec.com/ (.intel-stat-card)
 * Structure (matches blocks/columns-statpanel CSS where the LAST row is the
 * horizontal stats row):
 *   first row = block name;
 *   copy row = single cell (label, big statement, subheading, description, CTA);
 *   final stats row = three cells, each a number + label.
 */
export default function parse(element, { document }) {
  // --- Copy cell: label, big statement, subheading, description, CTA ---
  const contentCell = [];
  const small = element.querySelector('.isc-small');
  if (small) contentCell.push(small);
  const big = element.querySelector('.isc-big');
  if (big) contentCell.push(big);
  const sub = element.querySelector('.isc-sub');
  if (sub) contentCell.push(sub);
  const desc = element.querySelector('.isc-desc');
  if (desc) contentCell.push(desc);
  const cta = element.querySelector('.btn-intel, a');
  if (cta) contentCell.push(cta);

  // --- Stats: one cell per stat (number + label) ---
  const statCells = Array.from(element.querySelectorAll('.intel-stats-row .ist')).map((stat) => {
    const cell = [];
    const num = stat.querySelector('.ist-num');
    if (num) cell.push(num);
    const label = stat.querySelector('.ist-label');
    if (label) cell.push(label);
    return cell;
  });

  if (contentCell.length === 0 && statCells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  if (contentCell.length) cells.push([contentCell]);
  if (statCells.length) cells.push(statCells); // final row = stats, one cell per stat

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-statpanel', cells });
  element.replaceWith(block);
}
