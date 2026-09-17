/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-stat. Base: columns. Model: standalone.
 * Source: https://www.hdfcsec.com/ (.diff-stats-row)
 * Structure: first row = block name; second row split into three cells,
 *   each a big number + label.
 */
export default function parse(element, { document }) {
  const statCells = Array.from(element.querySelectorAll(':scope > .ds-item')).map((item) => {
    const cell = [];
    const num = item.querySelector('.ds-num');
    if (num) cell.push(num);
    const label = item.querySelector('.ds-label');
    if (label) cell.push(label);
    return cell;
  });

  if (statCells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [statCells];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-stat', cells });
  element.replaceWith(block);
}
