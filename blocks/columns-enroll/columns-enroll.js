export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-enroll-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-enroll-img-col');
        }
      }
    });
  });

  // Promote a bare mobile-number field written as plain text into a real input,
  // tolerating authors who omit it entirely.
  block.querySelectorAll('p, div').forEach((el) => {
    const text = el.textContent.trim().toLowerCase();
    if (!el.querySelector('input, a') && /^(enter\s+)?mobile( number)?\.?$/.test(text)) {
      const input = document.createElement('input');
      input.type = 'tel';
      input.className = 'columns-enroll-input';
      input.setAttribute('inputmode', 'numeric');
      input.setAttribute('maxlength', '10');
      input.placeholder = el.textContent.trim();
      el.replaceWith(input);
    }
  });
}
