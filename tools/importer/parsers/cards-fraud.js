/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-fraud. Base: cards. Model: collection (2-column).
 * Source: https://www.hdfcsec.com/ (.fraud-cards)
 * Structure: first row = block name; each subsequent row is one card =
 *   [ icon image cell, body cell (title, description) ].
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > .fcard'));
  const cells = [];

  cards.forEach((card) => {
    const icon = card.querySelector('.fcard-icon img, img');

    const bodyCell = [];
    const title = card.querySelector('.fcard-title');
    if (title) bodyCell.push(title);
    const desc = card.querySelector('.fcard-desc');
    if (desc) bodyCell.push(desc);

    if (!icon && bodyCell.length === 0) return;

    cells.push([icon || '', bodyCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-fraud', cells });
  element.replaceWith(block);
}
