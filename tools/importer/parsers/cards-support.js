/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-support. Base: cards. Model: collection (2-column).
 * Source: https://www.hdfcsec.com/ (.support-grid)
 * Structure: first row = block name; each subsequent row is one card =
 *   [ photo image cell, body cell (title, description) ].
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > .sc'));
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.sc-img img, img');

    const bodyCell = [];
    const title = card.querySelector('.sc-title');
    if (title) bodyCell.push(title);
    const desc = card.querySelector('.sc-desc');
    if (desc) bodyCell.push(desc);

    if (!image && bodyCell.length === 0) return;

    cells.push([image || '', bodyCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-support', cells });
  element.replaceWith(block);
}
