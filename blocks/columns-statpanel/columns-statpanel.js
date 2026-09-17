export default function decorate(block) {
  const rows = [...block.children];

  // Tag the content cell (first row) and the stats row (last row) so CSS can
  // target them defensively regardless of authored cell count.
  if (rows[0]) rows[0].classList.add('columns-statpanel-content');
  if (rows.length > 1) rows[rows.length - 1].classList.add('columns-statpanel-stats');

  // The source renders the CTA below the stats row. In the authored table the
  // CTA lives in the first (content) row, so relocate it to the end of the block.
  const cta = block.querySelector('a');
  if (cta) {
    const p = cta.closest('p') || cta;
    const ctaRow = document.createElement('div');
    ctaRow.className = 'columns-statpanel-cta';
    ctaRow.append(p);
    block.append(ctaRow);

    // EDS button auto-decoration only fires for a standalone <p><a>; ensure the
    // pill styling applies whether or not it ran.
    cta.classList.add('button');
    if (p.tagName === 'P') p.classList.add('button-container');
  }
}
