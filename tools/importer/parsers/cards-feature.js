/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature. Base: cards. Model: collection (2-column).
 * Source: https://www.hdfcsec.com/ (.intel-bottom)
 * Structure: first row = block name; each subsequent row is one card =
 *   [ icon image cell, body cell (title, description) ].
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > .intel-card'));
  const cells = [];

  cards.forEach((card) => {
    const icon = card.querySelector('.ic-icon, img');

    const bodyCell = [];
    const title = card.querySelector('.ic-title');
    if (title) bodyCell.push(title);
    const desc = card.querySelector('.ic-desc');
    if (desc) bodyCell.push(desc);

    if (!icon && bodyCell.length === 0) return;

    cells.push([icon || '', bodyCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
