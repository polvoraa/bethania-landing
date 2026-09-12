(() => {
  const root = document.documentElement;
  const revealEverything = () => {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  };

  if (window.frameElement?.id === 'pageFrame') {
    root.classList.remove('motion-pending');
    revealEverything();
    return;
  }

  if (!window.gsap || !window.ScrollTrigger) {
    root.classList.remove('motion-pending');
    root.classList.add('motion-fallback');
    revealEverything();
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false, force3D: true });
  root.classList.add('motion-enhanced');
  revealEverything();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    root.classList.remove('motion-pending');
    gsap.set('.reveal', { clearProps: 'all' });
    return;
  }

  function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'motion-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = '<div class="motion-loader__inner"><span class="motion-loader__name">Bethania</span><span class="motion-loader__line"></span></div>';
    document.body.prepend(loader);
    return loader;
  }

  function createProgress() {
    const progress = document.createElement('div');
    progress.className = 'motion-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: .25 }
    });
  }

  function splitWords(element) {
    if (!element || element.dataset.motionSplit === 'true') return [...(element?.querySelectorAll('.motion-word') || [])];
    const accessibleText = element.innerText.replace(/\s+/g, ' ').trim();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      if (!node.nodeValue.trim()) return;
      const fragment = document.createDocumentFragment();
      const chunks = node.nodeValue.split(/(\s+)/);
      chunks.forEach((chunk) => {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) {
          fragment.appendChild(document.createTextNode(chunk));
          return;
        }
        const mask = document.createElement('span');
        const word = document.createElement('span');
        mask.className = 'motion-word-mask';
        word.className = 'motion-word';
        word.textContent = chunk;
        word.setAttribute('aria-hidden', 'true');
        mask.appendChild(word);
        fragment.appendChild(mask);
      });
      node.replaceWith(fragment);
    });

    element.dataset.motionSplit = 'true';
    if (accessibleText) element.setAttribute('aria-label', accessibleText);
    return [...element.querySelectorAll('.motion-word')];
  }

  function addSectionRule(section) {
    const container = section?.querySelector('.container');
    if (!container || container.querySelector(':scope > .motion-rule')) return;
    const rule = document.createElement('div');
    rule.className = 'motion-rule';
    rule.setAttribute('aria-hidden', 'true');
    container.prepend(rule);
    gsap.from(rule, {
      scaleX: 0,
      duration: 1.3,
      ease: 'expo.out',
      scrollTrigger: { trigger: section, start: 'top 82%', once: true }
    });
  }

  function initHero(loader) {
    const titleWords = splitWords(document.querySelector('#page-title'));
    const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

    gsap.set(titleWords, { yPercent: 120, rotate: 2 });
    gsap.set('.address', { autoAlpha: 0, y: 18 });
    timeline
      .fromTo('.motion-loader__name', { yPercent: 115 }, { yPercent: 0, duration: .75 }, 0)
      .fromTo('.motion-loader__line', { scaleX: 0 }, { scaleX: 1, duration: .65 }, .16)
      .to('.motion-loader__name', { yPercent: -115, duration: .6, ease: 'power3.in' }, .72)
      .to(loader, { yPercent: -101, duration: .9, ease: 'expo.inOut' }, .72)
      .to(titleWords, { yPercent: 0, rotate: 0, duration: 1.05, stagger: .055 }, 1.02)
      .to('.address', { autoAlpha: 1, y: 0, duration: .8 }, 1.2)
      .set(loader, { display: 'none' }, 1.62);

    root.classList.remove('motion-pending');

    gsap.to('.hero__image img', {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  function initIntro() {
    gsap.from('.intro__portrait', {
      clipPath: 'inset(12% 8% 12% 8% round 28px)',
      autoAlpha: 0,
      duration: 1.35,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.intro', start: 'top 76%', once: true }
    });

    gsap.from('.intro__copy p', {
      y: 54,
      autoAlpha: 0,
      duration: 1,
      stagger: .16,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.intro__copy', start: 'top 82%', once: true }
    });

    gsap.fromTo('.intro__portrait img', { scale: 1.1 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.intro', start: 'top bottom', end: 'bottom top', scrub: 1.1 }
    });
  }

  function initServices() {
    addSectionRule(document.querySelector('.paths'));
    const headingWords = splitWords(document.querySelector('.paths h2'));
    gsap.from(headingWords, {
      yPercent: 115,
      rotate: 2,
      duration: .95,
      stagger: .045,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.paths h2', start: 'top 84%', once: true }
    });

    gsap.from('.service', {
      y: 90,
      rotate: (index) => index === 1 ? 0 : index === 0 ? -2.5 : 2.5,
      autoAlpha: 0,
      duration: 1.15,
      stagger: .13,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.services', start: 'top 82%', once: true }
    });

    document.querySelectorAll('.service__media img').forEach((image) => {
      gsap.fromTo(image, { scale: 1.12 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: image.closest('.service'), start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });
  }

  function initAbout() {
    const headingWords = splitWords(document.querySelector('.about h2'));
    gsap.from('.about__photo', {
      clipPath: 'inset(0 100% 0 0 round 30px)',
      duration: 1.4,
      ease: 'expo.inOut',
      clearProps: 'clipPath',
      scrollTrigger: { trigger: '.about', start: 'top 76%', once: true }
    });
    gsap.from('.about__panel', {
      clipPath: 'inset(0 0 0 100% round 30px)',
      duration: 1.4,
      ease: 'expo.inOut',
      clearProps: 'clipPath',
      scrollTrigger: { trigger: '.about', start: 'top 76%', once: true }
    });
    gsap.from(headingWords, {
      yPercent: 120,
      duration: 1,
      stagger: .07,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.about__panel', start: 'top 72%', once: true }
    });
    gsap.from(['.about__text', '.about__panel .button'], {
      autoAlpha: 0,
      clipPath: 'inset(0 0 100% 0)',
      duration: .9,
      stagger: .14,
      ease: 'power3.out',
      clearProps: 'opacity,visibility,clipPath',
      scrollTrigger: { trigger: '.about__panel', start: 'top 70%', once: true }
    });
  }

  function initFooter() {
    const wordmark = document.querySelector('.footer__wordmark');
    let animatedWord = wordmark?.querySelector('.motion-footer-word');
    if (wordmark && !animatedWord) {
      animatedWord = document.createElement('span');
      animatedWord.className = 'motion-footer-word';
      animatedWord.textContent = wordmark.textContent;
      wordmark.textContent = '';
      wordmark.appendChild(animatedWord);
    }

    gsap.from('.footer .button', {
      autoAlpha: 0,
      clipPath: 'inset(0 100% 0 0 round 999px)',
      duration: .9,
      ease: 'power3.out',
      clearProps: 'opacity,visibility,clipPath',
      scrollTrigger: { trigger: '.footer', start: 'top 88%', once: true }
    });
    if (animatedWord) {
      gsap.fromTo(animatedWord, { xPercent: 9 }, {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1
        }
      });
    }
    gsap.from('.legal a', {
      yPercent: 100,
      autoAlpha: 0,
      duration: .7,
      stagger: .1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.legal', start: 'top bottom', once: true }
    });
  }

  function initPointerInteractions() {
    const cards = [...document.querySelectorAll('.service')];
    const cleanups = [];

    cards.forEach((card) => {
      const rotateX = gsap.quickTo(card, 'rotationX', { duration: .45, ease: 'power3.out' });
      const rotateY = gsap.quickTo(card, 'rotationY', { duration: .45, ease: 'power3.out' });
      const moveY = gsap.quickTo(card, 'y', { duration: .35, ease: 'power3.out' });
      const media = card.querySelector('.service__media');

      const onMove = (event) => {
        const rect = card.getBoundingClientRect();
        rotateY(((event.clientX - rect.left) / rect.width - .5) * 5);
        rotateX(((event.clientY - rect.top) / rect.height - .5) * -5);
      };
      const onEnter = () => {
        moveY(-7);
        if (media) gsap.to(media, { scale: 1.015, duration: .7, ease: 'power3.out', overwrite: 'auto' });
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
        moveY(0);
        if (media) gsap.to(media, { scale: 1, duration: .8, ease: 'power3.out', overwrite: 'auto' });
      };
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerenter', onEnter);
        card.removeEventListener('pointerleave', onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }

  function start(loader) {
    let media;
    const context = gsap.context(() => {
      createProgress();
      initHero(loader);
      initIntro();
      initServices();
      initAbout();
      initFooter();

      media = gsap.matchMedia();
      media.add('(min-width: 901px) and (hover: hover) and (pointer: fine)', () => initPointerInteractions());
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh, { once: true });
    document.querySelectorAll('img').forEach((image) => {
      if (!image.complete) image.addEventListener('load', refresh, { once: true });
    });
    window.addEventListener('pagehide', () => {
      media?.revert();
      context.revert();
    }, { once: true });
  }

  const loader = createLoader();

  if (document.fonts?.ready) {
    Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 1200))
    ]).then(() => start(loader));
  } else {
    start(loader);
  }
})();
