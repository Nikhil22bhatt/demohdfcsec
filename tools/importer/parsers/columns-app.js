/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-app. Base: columns. Model: standalone.
 * Source: https://www.hdfcsec.com/ (.app-center)
 * Structure: first row = block name; heading row; then a row split into one
 *   cell per app promo (logo, phone mockup, App Store / Google Play badges).
 * Rows are padded to a consistent column count.
 */
export default function parse(element, { document }) {
  const heading = element.querySelector('h1, h2, h3');

  const promos = Array.from(element.querySelectorAll('.app-stores > .position-relative'));

  const promoCells = promos.map((promo) => {
    const cell = [];
    // Logo (brand mark)
    const logo = promo.querySelector('.topImg img');
    if (logo) cell.push(logo);
    // Phone mockup / hero image (mobile visual)
    const mockup = promo.querySelector(':scope > img');
    if (mockup) cell.push(mockup);
    // Store badge links (App Store / Google Play)
    promo.querySelectorAll('a').forEach((a) => cell.push(a));
    return cell;
  });

  if (!heading && promoCells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const colCount = Math.max(promoCells.length, 1);
  const cells = [];

  if (heading) {
    const headingRow = [heading];
    while (headingRow.length < colCount) headingRow.push('');
    cells.push(headingRow);
  }

  if (promoCells.length) cells.push(promoCells);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-app', cells });
  element.replaceWith(block);
}
