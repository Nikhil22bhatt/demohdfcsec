/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base: columns. Model: standalone (2-column).
 * Source: https://www.hdfcsec.com/ (.edge-top)
 * Structure: first row = block name; second row = 2 cells:
 *   [ content cell (heading, bold statement, paragraph, CTA), image cell ].
 */
export default function parse(element, { document }) {
  const left = element.querySelector('.et-left');
  const image = element.querySelector('.et-right img, img');

  const contentCell = [];
  if (left) {
    const heading = left.querySelector('h1, h2, h3, h4');
    if (heading) contentCell.push(heading);
    const bold = left.querySelector('.et-bold');
    if (bold) contentCell.push(bold);
    left.querySelectorAll('p').forEach((p) => contentCell.push(p));
    const cta = left.querySelector('.btn-edge, a');
    if (cta) contentCell.push(cta);
  }

  if (contentCell.length === 0 && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [
    [contentCell, image || ''],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
