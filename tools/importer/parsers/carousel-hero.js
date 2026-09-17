/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-hero. Base: carousel. Model: collection (2-column).
 * Source: https://www.hdfcsec.com/ (.hero-slider)
 * Structure: first row = block name; each subsequent row is one slide =
 *   [ image cell, content cell (tag, heading, subheading, CTA) ].
 * Excludes slick-cloned duplicate slides.
 */
export default function parse(element, { document }) {
  // Real slides only — skip Slick's cloned duplicates.
  const slides = Array.from(element.querySelectorAll('.hero-slide'))
    .filter((slide) => !slide.classList.contains('slick-cloned'));

  const cells = [];

  slides.forEach((slide) => {
    // --- Image cell: prefer the background/overlay visual for the slide ---
    const image = slide.querySelector('.hs-bg img, .hs-overlay img, .s4-visual img, .hs-content img');

    // --- Content cell: tag, heading, subheading(s), and CTA links ---
    const contentCell = [];
    const tag = slide.querySelector('.hero-tag');
    if (tag) contentCell.push(tag);
    const heading = slide.querySelector('.hs-h1, h1, h2');
    if (heading) contentCell.push(heading);
    const subHeading = slide.querySelector('.hs-h1-sub');
    if (subHeading) contentCell.push(subHeading);
    const sub = slide.querySelector('.hs-sub');
    if (sub) contentCell.push(sub);
    const ctaLinks = Array.from(slide.querySelectorAll('.hs-btns a'));
    contentCell.push(...ctaLinks);

    // Skip empty slides (e.g. bg-only decorative clones that slipped through).
    if (!image && contentCell.length === 0) return;

    cells.push([image || '', contentCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
