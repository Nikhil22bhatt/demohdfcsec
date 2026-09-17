import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment (metadata-independent dual-fetch: /content first, then root)
  let fragment = await loadFragment('/content/footer');
  if (!fragment) fragment = await loadFragment('/footer');
  if (!fragment) return;

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // tag sections in document order: brand, links, contact, disclaimer, copyright
  const sections = [...footer.children];
  const names = ['footer-brand', 'footer-links', 'footer-contact', 'footer-disclaimer', 'footer-copyright'];
  sections.forEach((sec, i) => { if (names[i]) sec.classList.add(names[i]); });

  // social row: the paragraph in the contact section that holds the icon links
  const contact = footer.querySelector('.footer-contact');
  if (contact) {
    contact.querySelectorAll('p').forEach((p) => {
      if (p.querySelector('a img')) p.classList.add('footer-social');
    });
  }

  // make the disclaimer collapsible via its heading
  const disclaimer = footer.querySelector('.footer-disclaimer');
  if (disclaimer) {
    const heading = disclaimer.querySelector('h4, h3');
    if (heading) {
      const body = [...disclaimer.children].filter((el) => el !== heading);
      const wrap = document.createElement('div');
      wrap.className = 'footer-disclaimer-body';
      body.forEach((el) => wrap.append(el));
      disclaimer.append(wrap);
      heading.classList.add('footer-disclaimer-toggle');
      heading.setAttribute('role', 'button');
      heading.setAttribute('tabindex', '0');
      heading.setAttribute('aria-expanded', 'false');
      const toggle = () => {
        const open = heading.getAttribute('aria-expanded') === 'true';
        heading.setAttribute('aria-expanded', open ? 'false' : 'true');
      };
      heading.addEventListener('click', toggle);
      heading.addEventListener('keydown', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); toggle(); }
      });
    }
  }

  block.append(footer);
}
