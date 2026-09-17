/*
 * Embed Poster Block
 * A video promo banner: a poster image (authored <picture> or CSS background)
 * with an overlaid heading and a "Watch Now" play pill that loads the embedded
 * video on click.
 */

const loadScript = (url, callback, type) => {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.src = url;
  if (type) {
    script.setAttribute('type', type);
  }
  script.onload = callback;
  head.append(script);
  return script;
};

const getDefaultEmbed = (url) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
      scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
    </iframe>
  </div>`;

const embedYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }
  const list = usp.get('list') ? encodeURIComponent(usp.get('list')) : '';
  // Playlist links (no single video id) — embed the playlist.
  let src = `https://www.youtube.com${embed}`;
  if (vid) {
    src = `https://www.youtube.com/embed/${vid}?rel=0&v=${vid}${suffix}`;
  } else if (list) {
    src = `https://www.youtube.com/embed/videoseries?list=${list}${suffix}`;
  }
  return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="${src}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
    </div>`;
};

const embedVimeo = (url, autoplay) => {
  const [, video] = url.pathname.split('/');
  const suffix = autoplay ? '?muted=1&autoplay=1' : '';
  return `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://player.vimeo.com/video/${video}${suffix}"
      style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
      frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
      title="Content from Vimeo" loading="lazy"></iframe>
    </div>`;
};

const embedTwitter = (url) => {
  const embedHTML = `<blockquote class="twitter-tweet"><a href="${url.href}"></a></blockquote>`;
  loadScript('https://platform.twitter.com/widgets.js');
  return embedHTML;
};

const loadEmbed = (block, link, autoplay) => {
  if (block.classList.contains('embed-poster-is-loaded')) {
    return;
  }

  const EMBEDS_CONFIG = [
    { match: ['youtube', 'youtu.be'], render: embedYoutube },
    { match: ['vimeo'], render: embedVimeo },
    { match: ['twitter', 'x.com'], render: embedTwitter },
  ];
  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.includes(match)));
  const url = new URL(link);
  if (config) {
    block.innerHTML = config.render(url, autoplay);
  } else {
    block.innerHTML = getDefaultEmbed(url);
  }
  block.classList.add('embed-poster-is-loaded');
};

const PLAY_SVG = '<svg width="12" height="15" viewBox="0 0 12 15" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.3412 8.70652L2.16471 14.7C1.5 15.1 0.5 14.7 0.5 13.8V1.2C0.5 0.3 1.5 -0.1 2.16471 0.3L11.3412 6.29348C12 6.7 12 8.3 11.3412 8.70652Z" fill="white"/></svg>';

export default function decorate(block) {
  const picture = block.querySelector('picture');
  const anchor = block.querySelector('a');
  const link = anchor ? anchor.href : '';

  // Collect overlaid heading/text (everything that is not the video URL link).
  const overlay = document.createElement('div');
  overlay.className = 'embed-poster-overlay';
  block.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => {
    overlay.append(el);
  });
  block.querySelectorAll('p').forEach((el) => {
    if (!el.querySelector('picture') && el !== anchor?.closest('p') && el.textContent.trim()) {
      overlay.append(el);
    }
  });

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'embed-poster-placeholder';
  if (picture) wrapper.append(picture);
  if (overlay.childElementCount) wrapper.append(overlay);

  if (link) {
    // "Watch Now" pill: navy-gradient play circle + label.
    const play = document.createElement('div');
    play.className = 'embed-poster-placeholder-play';
    play.innerHTML = `<button type="button" class="embed-poster-watch" aria-label="Watch Now">
      <span class="embed-poster-play-circle">${PLAY_SVG}</span>
      <span class="embed-poster-watch-text">Watch Now</span>
    </button>`;
    wrapper.append(play);
    wrapper.classList.add('embed-poster-clickable');
    wrapper.addEventListener('click', () => {
      loadEmbed(block, link, true);
    });
  }

  block.append(wrapper);
}
