export default function decorate(block) {
  const rows = [...block.children];
  const cols = rows.length > 1 ? [...rows[rows.length - 1].children] : [];
  block.classList.add(`columns-app-${cols.length}-cols`);

  cols.forEach((col) => {
    const p = col.querySelector('p');
    if (!p) return;
    col.classList.add('columns-app-img-col');

    const pics = [...p.querySelectorAll(':scope > picture')];
    const links = [...p.querySelectorAll(':scope > a')];

    // Layout: [phone mockup] | [ logo + stacked store badges ]
    // Source order in cell: logo(1), phone(2), appleLink, googleLink.
    const logo = pics[0];
    const phone = pics[1];

    // Build the right-hand column: logo on top, badges stacked below.
    const storeCol = document.createElement('div');
    storeCol.className = 'columns-app-store-col';
    if (logo) storeCol.append(logo);
    links.forEach((a) => storeCol.append(a));

    // Reset the cell to a flex row of [phone][storeCol].
    p.textContent = '';
    if (phone) {
      phone.classList.add('columns-app-phone');
      p.append(phone);
    }
    p.append(storeCol);
  });
}
