/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: HDFC Securities site-wide cleanup.
 * Removes non-authorable site chrome and page-shell widgets.
 * All selectors verified against migration-work/cleaned.html.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Interactive shell widgets that can interfere with block parsing.
    // Verified in cleaned.html:
    //   <div class="modal fade" id="modalAccount"> / id="modalLogin"
    //   <div class="menu-overlay"> (header nav overlay)
    //   <iframe src="https://pixel.everesttech.net/..."> (tracking pixel)
    WebImporter.DOMUtils.remove(element, [
      '#modalAccount',
      '#modalLogin',
      '.modal.fade',
      '.menu-overlay',
      'iframe',
    ]);
  }

  if (hookName === H.after) {
    // Non-authorable site chrome. Verified in cleaned.html:
    //   <header class="site-header"> (contains nav.header-nav, .search-section, mega dropdowns)
    //   <footer class="footer"> (contains <footernavigation>)
    //   <div class="sr-only" id="sr-status-announcer"> / id="searchStatus" (screen-reader status)
    WebImporter.DOMUtils.remove(element, [
      'header',
      'header.site-header',
      'nav.header-nav',
      'footer',
      'footer.footer',
      'footernavigation',
      '.sr-only',
      'iframe',
    ]);
  }
}
