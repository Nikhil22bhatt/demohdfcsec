/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import columnsEnrollParser from './parsers/columns-enroll.js';
import cardsOfferingParser from './parsers/cards-offering.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsToolParser from './parsers/cards-tool.js';
import columnsStatpanelParser from './parsers/columns-statpanel.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsSupportParser from './parsers/cards-support.js';
import embedPosterParser from './parsers/embed-poster.js';
import cardsFraudParser from './parsers/cards-fraud.js';
import columnsStatParser from './parsers/columns-stat.js';
import columnsAppParser from './parsers/columns-app.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/hdfcsec-cleanup.js';
import sectionsTransformer from './transformers/hdfcsec-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'home',
  description: 'HDFC Securities homepage',
  urls: [
    'https://www.hdfcsec.com/',
  ],
  blocks: [
    { name: 'carousel-hero', instances: ['.hero-slider'] },
    { name: 'columns-enroll', instances: ['.hero-enroll.numberchk', '.hero-enroll.footerLast'] },
    { name: 'cards-offering', instances: ['.wealth-cards'] },
    { name: 'columns-feature', instances: ['.edge-top'] },
    { name: 'cards-tool', instances: ['.edge-bottom'] },
    { name: 'columns-statpanel', instances: ['.intel-stat-card'] },
    { name: 'cards-feature', instances: ['.intel-bottom'] },
    { name: 'cards-support', instances: ['.support-grid'] },
    { name: 'embed-poster', instances: ['.fraudSection'] },
    { name: 'cards-fraud', instances: ['.fraud-cards'] },
    { name: 'columns-stat', instances: ['.diff-stats-row'] },
    { name: 'columns-app', instances: ['.app-center'] },
  ],
  sections: [
    { id: 'rc1', name: 'hero-slider', selector: ['.hero-wrapper', '.hero-slider'], style: null, blocks: ['carousel-hero'], defaultContent: [] },
    { id: 'rc2', name: 'hero-enroll', selector: ['.hero-enroll.numberchk'], style: null, blocks: ['columns-enroll'], defaultContent: [] },
    { id: 'rc3', name: 'wealth-section', selector: ['.wealth-section'], style: null, blocks: ['cards-offering'], defaultContent: ['.wealth-section .sectionTitle', '.wealth-section .subTitle'] },
    { id: 'rc4', name: 'edge-section', selector: ['.edge-section'], style: null, blocks: ['columns-feature', 'cards-tool'], defaultContent: ['.edge-section .section-pill', '.edge-section .sectionTitle', '.edge-section .subTitle'] },
    { id: 'rc5', name: 'intel-section', selector: ['.intel-section'], style: null, blocks: ['columns-statpanel', 'cards-feature'], defaultContent: ['.intel-section .section-pill', '.intel-section .sectionTitle', '.intel-section .subTitle'] },
    { id: 'rc6', name: 'support-section', selector: ['.support-section'], style: 'accent', blocks: ['cards-support'], defaultContent: ['.support-section .section-pill', '.support-section .sectionTitle', '.support-section .subTitle', '.support-btns'] },
    { id: 'rc7', name: 'fraud-section', selector: ['.fraud-section'], style: null, blocks: ['embed-poster', 'cards-fraud'], defaultContent: ['.fraud-section .section-pill', '.fraud-section .sectionTitle', '.fraud-section .subTitle'] },
    { id: 'rc8', name: 'diff-section', selector: ['.diff-section'], style: null, blocks: ['columns-stat'], defaultContent: ['.diff-section .sectionTitle', '.diff-section .diff-desc'] },
    { id: 'rc9', name: 'app-section', selector: ['.app-section'], style: null, blocks: ['columns-app'], defaultContent: ['.app-section .sectionTitle'] },
    { id: 'rc10', name: 'hero-enroll-footer', selector: ['.hero-enroll.footerLast'], style: null, blocks: ['columns-enroll'], defaultContent: [] },
  ],
};

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'columns-enroll': columnsEnrollParser,
  'cards-offering': cardsOfferingParser,
  'columns-feature': columnsFeatureParser,
  'cards-tool': cardsToolParser,
  'columns-statpanel': columnsStatpanelParser,
  'cards-feature': cardsFeatureParser,
  'cards-support': cardsSupportParser,
  'embed-poster': embedPosterParser,
  'cards-fraud': cardsFraudParser,
  'columns-stat': columnsStatParser,
  'columns-app': columnsAppParser,
};

// TRANSFORMER REGISTRY - cleanup first, section breaks/metadata after (afterTransform)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (map homepage root to /index)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
