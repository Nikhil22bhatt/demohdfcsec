/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-offering. Base: cards. Model: collection (2-column).
 * Source: https://www.hdfcsec.com/ (.wealth-cards)
 * Structure: first row = block name; each subsequent row is one card =
 *   [ logo image cell, body cell (badge, heading, feature list, CTA) ].
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll(':scope > .wc'));
  const cells = [];

  cards.forEach((card) => {
    const logo = card.querySelector('.wc-top img, img');

    const bodyCell = [];
    const badge = card.querySelector('.wc-badge');
    if (badge) bodyCell.push(badge);
    const heading = card.querySelector('.wc-heading');
    if (heading) bodyCell.push(heading);
    const list = card.querySelector('.wc-items');
    if (list) bodyCell.push(list);
    const cta = card.querySelector('.wc-footer a, .btn-wc');
    if (cta) bodyCell.push(cta);

    if (!logo && bodyCell.length === 0) return;

    cells.push([logo || '', bodyCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-offering', cells });
  element.replaceWith(block);
}
