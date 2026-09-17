import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-offering-card-image';
      else div.className = 'cards-offering-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  // Highlight the middle card when there is an odd number of cards (3-up offering row).
  const items = [...ul.children];
  if (items.length === 3) {
    items[1].classList.add('cards-offering-featured');
  }

  block.replaceChildren(ul);
}
