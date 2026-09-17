/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document: document2 }) {
    const slides = Array.from(element.querySelectorAll(".hero-slide")).filter((slide) => !slide.classList.contains("slick-cloned"));
    const cells = [];
    slides.forEach((slide) => {
      const image = slide.querySelector(".hs-bg img, .hs-overlay img, .s4-visual img, .hs-content img");
      const contentCell = [];
      const tag = slide.querySelector(".hero-tag");
      if (tag) contentCell.push(tag);
      const heading = slide.querySelector(".hs-h1, h1, h2");
      if (heading) contentCell.push(heading);
      const subHeading = slide.querySelector(".hs-h1-sub");
      if (subHeading) contentCell.push(subHeading);
      const sub = slide.querySelector(".hs-sub");
      if (sub) contentCell.push(sub);
      const ctaLinks = Array.from(slide.querySelectorAll(".hs-btns a"));
      contentCell.push(...ctaLinks);
      if (!image && contentCell.length === 0) return;
      cells.push([image || "", contentCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-enroll.js
  function parse2(element, { document: document2 }) {
    const promo = element.querySelector(".he-text");
    const cta = element.querySelector(".btn-open-trading, button, a.btn, a");
    const fieldCell = document2.createElement("p");
    fieldCell.textContent = "Mobile Number";
    if (!promo && !cta) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const promoCell = promo || "";
    const ctaCell = cta || "";
    const cells = [
      [promoCell, fieldCell, ctaCell]
    ];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-enroll", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-offering.js
  function parse3(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(":scope > .wc"));
    const cells = [];
    cards.forEach((card) => {
      const logo = card.querySelector(".wc-top img, img");
      const bodyCell = [];
      const badge = card.querySelector(".wc-badge");
      if (badge) bodyCell.push(badge);
      const heading = card.querySelector(".wc-heading");
      if (heading) bodyCell.push(heading);
      const list = card.querySelector(".wc-items");
      if (list) bodyCell.push(list);
      const cta = card.querySelector(".wc-footer a, .btn-wc");
      if (cta) bodyCell.push(cta);
      if (!logo && bodyCell.length === 0) return;
      cells.push([logo || "", bodyCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-offering", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse4(element, { document: document2 }) {
    const left = element.querySelector(".et-left");
    const image = element.querySelector(".et-right img, img");
    const contentCell = [];
    if (left) {
      const heading = left.querySelector("h1, h2, h3, h4");
      if (heading) contentCell.push(heading);
      const bold = left.querySelector(".et-bold");
      if (bold) contentCell.push(bold);
      left.querySelectorAll("p").forEach((p) => contentCell.push(p));
      const cta = left.querySelector(".btn-edge, a");
      if (cta) contentCell.push(cta);
    }
    if (contentCell.length === 0 && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [
      [contentCell, image || ""]
    ];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tool.js
  function parse5(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(":scope > .eb-card"));
    const cells = [];
    cards.forEach((card) => {
      const bodyCell = [];
      const heading = card.querySelector("h1, h2, h3, h4");
      if (heading) bodyCell.push(heading);
      const bold = card.querySelector(".eb-bold");
      if (bold) bodyCell.push(bold);
      card.querySelectorAll("p").forEach((p) => bodyCell.push(p));
      const cta = card.querySelector(".btn-edge, a");
      if (cta) bodyCell.push(cta);
      const image = card.querySelector(".eb-phone-wrap img, img");
      if (bodyCell.length === 0 && !image) return;
      cells.push([bodyCell, image || ""]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-tool", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-statpanel.js
  function parse6(element, { document: document2 }) {
    const contentCell = [];
    const small = element.querySelector(".isc-small");
    if (small) contentCell.push(small);
    const big = element.querySelector(".isc-big");
    if (big) contentCell.push(big);
    const sub = element.querySelector(".isc-sub");
    if (sub) contentCell.push(sub);
    const desc = element.querySelector(".isc-desc");
    if (desc) contentCell.push(desc);
    const cta = element.querySelector(".btn-intel, a");
    if (cta) contentCell.push(cta);
    const statCells = Array.from(element.querySelectorAll(".intel-stats-row .ist")).map((stat) => {
      const cell = [];
      const num = stat.querySelector(".ist-num");
      if (num) cell.push(num);
      const label = stat.querySelector(".ist-label");
      if (label) cell.push(label);
      return cell;
    });
    if (contentCell.length === 0 && statCells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (contentCell.length) cells.push([contentCell]);
    if (statCells.length) cells.push(statCells);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-statpanel", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse7(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(":scope > .intel-card"));
    const cells = [];
    cards.forEach((card) => {
      const icon = card.querySelector(".ic-icon, img");
      const bodyCell = [];
      const title = card.querySelector(".ic-title");
      if (title) bodyCell.push(title);
      const desc = card.querySelector(".ic-desc");
      if (desc) bodyCell.push(desc);
      if (!icon && bodyCell.length === 0) return;
      cells.push([icon || "", bodyCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-support.js
  function parse8(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(":scope > .sc"));
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".sc-img img, img");
      const bodyCell = [];
      const title = card.querySelector(".sc-title");
      if (title) bodyCell.push(title);
      const desc = card.querySelector(".sc-desc");
      if (desc) bodyCell.push(desc);
      if (!image && bodyCell.length === 0) return;
      cells.push([image || "", bodyCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-support", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/embed-poster.js
  function parse9(element, { document: document2 }) {
    const contentCell = [];
    const poster = Array.from(element.querySelectorAll("img")).find((img) => !img.closest(".playButton"));
    if (poster) contentCell.push(poster);
    const heading = element.querySelector(".fraudTitle, h1, h2, h3");
    if (heading) contentCell.push(heading);
    const watchLink = element.querySelector(".watchButton, a[href]");
    if (watchLink && watchLink.getAttribute("href")) {
      const href = watchLink.getAttribute("href");
      const link = document2.createElement("a");
      link.href = href;
      link.textContent = href;
      contentCell.push(link);
    }
    if (contentCell.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [
      [contentCell]
    ];
    const block = WebImporter.Blocks.createBlock(document2, { name: "embed-poster", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-fraud.js
  function parse10(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(":scope > .fcard"));
    const cells = [];
    cards.forEach((card) => {
      const icon = card.querySelector(".fcard-icon img, img");
      const bodyCell = [];
      const title = card.querySelector(".fcard-title");
      if (title) bodyCell.push(title);
      const desc = card.querySelector(".fcard-desc");
      if (desc) bodyCell.push(desc);
      if (!icon && bodyCell.length === 0) return;
      cells.push([icon || "", bodyCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-fraud", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-stat.js
  function parse11(element, { document: document2 }) {
    const statCells = Array.from(element.querySelectorAll(":scope > .ds-item")).map((item) => {
      const cell = [];
      const num = item.querySelector(".ds-num");
      if (num) cell.push(num);
      const label = item.querySelector(".ds-label");
      if (label) cell.push(label);
      return cell;
    });
    if (statCells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [statCells];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-stat", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-app.js
  function parse12(element, { document: document2 }) {
    const heading = element.querySelector("h1, h2, h3");
    const promos = Array.from(element.querySelectorAll(".app-stores > .position-relative"));
    const promoCells = promos.map((promo) => {
      const cell = [];
      const logo = promo.querySelector(".topImg img");
      if (logo) cell.push(logo);
      const mockup = promo.querySelector(":scope > img");
      if (mockup) cell.push(mockup);
      promo.querySelectorAll("a").forEach((a) => cell.push(a));
      return cell;
    });
    if (!heading && promoCells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const colCount = Math.max(promoCells.length, 1);
    const cells = [];
    if (heading) {
      const headingRow = [heading];
      while (headingRow.length < colCount) headingRow.push("");
      cells.push(headingRow);
    }
    if (promoCells.length) cells.push(promoCells);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-app", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/hdfcsec-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#modalAccount",
        "#modalLogin",
        ".modal.fade",
        ".menu-overlay",
        "iframe",
        "script",
        "noscript",
        "style"
      ]);
      const TRACKER_HOSTS = [
        "facebook.com/tr",
        "bat.bing.com",
        "px.ads.linkedin.com",
        "everesttech.net",
        "doubleclick.net",
        "google-analytics.com",
        "googletagmanager.com",
        "clarity.ms",
        "licdn.com",
        "snap.licdn.com"
      ];
      element.querySelectorAll("img[src]").forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (TRACKER_HOSTS.some((h) => src.includes(h))) img.remove();
      });
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "header.site-header",
        "nav.header-nav",
        "footer",
        "footer.footer",
        "footernavigation",
        ".sr-only",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/hdfcsec-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function querySection(root, selectors) {
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (el) return el;
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const sections = payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = querySection(element, section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || querySection(element, section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-home.js
  var PAGE_TEMPLATE = {
    name: "home",
    description: "HDFC Securities homepage",
    urls: [
      "https://www.hdfcsec.com/"
    ],
    blocks: [
      { name: "carousel-hero", instances: [".hero-slider"] },
      { name: "columns-enroll", instances: [".hero-enroll.numberchk", ".hero-enroll.footerLast"] },
      { name: "cards-offering", instances: [".wealth-cards"] },
      { name: "columns-feature", instances: [".edge-top"] },
      { name: "cards-tool", instances: [".edge-bottom"] },
      { name: "columns-statpanel", instances: [".intel-stat-card"] },
      { name: "cards-feature", instances: [".intel-bottom"] },
      { name: "cards-support", instances: [".support-grid"] },
      { name: "embed-poster", instances: [".fraudSection"] },
      { name: "cards-fraud", instances: [".fraud-cards"] },
      { name: "columns-stat", instances: [".diff-stats-row"] },
      { name: "columns-app", instances: [".app-center"] }
    ],
    sections: [
      { id: "rc1", name: "hero-slider", selector: [".hero-wrapper", ".hero-slider"], style: null, blocks: ["carousel-hero"], defaultContent: [] },
      { id: "rc2", name: "hero-enroll", selector: [".hero-enroll.numberchk"], style: null, blocks: ["columns-enroll"], defaultContent: [] },
      { id: "rc3", name: "wealth-section", selector: [".wealth-section"], style: null, blocks: ["cards-offering"], defaultContent: [".wealth-section .sectionTitle", ".wealth-section .subTitle"] },
      { id: "rc4", name: "edge-section", selector: [".edge-section"], style: null, blocks: ["columns-feature", "cards-tool"], defaultContent: [".edge-section .section-pill", ".edge-section .sectionTitle", ".edge-section .subTitle"] },
      { id: "rc5", name: "intel-section", selector: [".intel-section"], style: null, blocks: ["columns-statpanel", "cards-feature"], defaultContent: [".intel-section .section-pill", ".intel-section .sectionTitle", ".intel-section .subTitle"] },
      { id: "rc6", name: "support-section", selector: [".support-section"], style: "accent", blocks: ["cards-support"], defaultContent: [".support-section .section-pill", ".support-section .sectionTitle", ".support-section .subTitle", ".support-btns"] },
      { id: "rc7", name: "fraud-section", selector: [".fraud-section"], style: null, blocks: ["embed-poster", "cards-fraud"], defaultContent: [".fraud-section .section-pill", ".fraud-section .sectionTitle", ".fraud-section .subTitle"] },
      { id: "rc8", name: "diff-section", selector: [".diff-section"], style: null, blocks: ["columns-stat"], defaultContent: [".diff-section .sectionTitle", ".diff-section .diff-desc"] },
      { id: "rc9", name: "app-section", selector: [".app-section"], style: null, blocks: ["columns-app"], defaultContent: [".app-section .sectionTitle"] },
      { id: "rc10", name: "hero-enroll-footer", selector: [".hero-enroll.footerLast"], style: null, blocks: ["columns-enroll"], defaultContent: [] }
    ]
  };
  var parsers = {
    "carousel-hero": parse,
    "columns-enroll": parse2,
    "cards-offering": parse3,
    "columns-feature": parse4,
    "cards-tool": parse5,
    "columns-statpanel": parse6,
    "cards-feature": parse7,
    "cards-support": parse8,
    "embed-poster": parse9,
    "cards-fraud": parse10,
    "columns-stat": parse11,
    "columns-app": parse12
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const {
        document: document2,
        url,
        html,
        params
      } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
