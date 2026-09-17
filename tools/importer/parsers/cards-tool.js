/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-tool. Base: cards. Model: collection (2-column).
 * Source: https://www.hdfcsec.com/ (.edge-bottom)
 * Structure: first row = block name; each subsequent row is one card =
 *   [ body cell (heading, bold, description, CTA), screenshot image cell ].
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > .eb-card'));
  const cells = [];

  cards.forEach((card) => {
    const bodyCell = [];
    const heading = card.querySelector('h1, h2, h3, h4');
    if (heading) bodyCell.push(heading);
    const bold = card.querySelector('.eb-bold');
    if (bold) bodyCell.push(bold);
    card.querySelectorAll('p').forEach((p) => bodyCell.push(p));
    const cta = card.querySelector('.btn-edge, a');
    if (cta) bodyCell.push(cta);

    const image = card.querySelector('.eb-phone-wrap img, img');

    if (bodyCell.length === 0 && !image) return;

    cells.push([bodyCell, image || '']);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-tool', cells });
  element.replaceWith(block);
}
