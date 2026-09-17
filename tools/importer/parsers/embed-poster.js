/* eslint-disable */
/* global WebImporter */
/**
 * Parser for embed-poster. Base: embed. Model: standalone (1-column).
 * Source: https://www.hdfcsec.com/ (.fraudSection)
 * Structure: first row = block name; second row = single cell containing an
 *   optional poster image, an optional overlaid heading, and a video URL link.
 */
export default function parse(element, { document }) {
  const contentCell = [];

  // Poster image: first image that is not the small inline play-button icon.
  const poster = Array.from(element.querySelectorAll('img'))
    .find((img) => !img.closest('.playButton'));
  if (poster) contentCell.push(poster);

  const heading = element.querySelector('.fraudTitle, h1, h2, h3');
  if (heading) contentCell.push(heading);

  // Video URL — take the href from the watch link and emit a clean anchor
  // so the embed block resolves it as the media source.
  const watchLink = element.querySelector('.watchButton, a[href]');
  if (watchLink && watchLink.getAttribute('href')) {
    const href = watchLink.getAttribute('href');
    const link = document.createElement('a');
    link.href = href;
    link.textContent = href;
    contentCell.push(link);
  }

  if (contentCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [
    [contentCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-poster', cells });
  element.replaceWith(block);
}
