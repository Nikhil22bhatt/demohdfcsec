/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-enroll. Base: columns. Model: standalone.
 * Source: https://www.hdfcsec.com/ (.hero-enroll.numberchk, .hero-enroll.footerLast)
 * Structure: first row = block name; second row = 3 cells:
 *   [ promo text, mobile-number field label, CTA ].
 * In DA the plain-text field cell is rendered as an input.
 */
export default function parse(element, { document }) {
  const promo = element.querySelector('.he-text');
  const cta = element.querySelector('.btn-open-trading, button, a.btn, a');

  // Field cell — the source input carries no text; provide its label so DA
  // can render it as a mobile-number input.
  const fieldCell = document.createElement('p');
  fieldCell.textContent = 'Mobile Number';

  if (!promo && !cta) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const promoCell = promo || '';
  const ctaCell = cta || '';

  const cells = [
    [promoCell, fieldCell, ctaCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-enroll', cells });
  element.replaceWith(block);
}
