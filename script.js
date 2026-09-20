(() => {
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message = 'URL скопирован') {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
  }

  async function copyText(text) {
    // Modern API (works on HTTPS, including GitHub Pages).
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}

    // Fallback for mobile browsers / restricted clipboard permissions.
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      area.style.top = '0';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.focus();
      area.select();
      area.setSelectionRange(0, area.value.length);
      const ok = document.execCommand('copy');
      area.remove();
      if (ok) return true;
    } catch (_) {}

    // Last resort: native mobile prompt with the URL selected/copyable.
    try {
      window.prompt('Скопируйте ссылку:', text);
    } catch (_) {}
    return false;
  }

  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async event => {
      event.preventDefault();
      event.stopPropagation();
      const url = button.getAttribute('data-copy');
      if (!url) return;
      button.disabled = true;
      const old = button.textContent;
      const ok = await copyText(url);
      button.textContent = ok ? 'Скопировано ✓' : 'Скопируйте URL';
      showToast(ok ? 'URL скопирован' : 'Ссылка готова для копирования');
      setTimeout(() => {
        button.textContent = old;
        button.disabled = false;
      }, 1400);
    });
  });

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduce) {
    const orb = document.querySelector('.cursor-orb');
    window.addEventListener('pointermove', e => {
      root.style.setProperty('--mx', `${8 + e.clientX / innerWidth * 84}%`);
      root.style.setProperty('--my', `${8 + e.clientY / innerHeight * 84}%`);
      if (orb) {
        orb.style.left = `${e.clientX}px`;
        orb.style.top = `${e.clientY}px`;
      }
    }, { passive: true });

    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      root.style.setProperty('--scroll', `${max > 0 ? scrollY / max * 100 : 0}%`);
    }, { passive: true });

    // 3D hover only where a real pointer exists; never distort touch layouts.
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      document.querySelectorAll('.tilt').forEach(el => {
        el.addEventListener('pointermove', e => {
          const r = el.getBoundingClientRect();
          const x = e.clientX / r.width - .5;
          const y = e.clientY / r.height - .5;
          el.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-3px)`;
        });
        el.addEventListener('pointerleave', () => { el.style.transform = ''; });
      });
    }

    window.addEventListener('deviceorientation', e => {
      if (typeof e.gamma === 'number' && typeof e.beta === 'number') {
        root.style.setProperty('--mx', `${50 + Math.max(-1, Math.min(1, e.gamma / 35)) * 24}%`);
        root.style.setProperty('--my', `${35 + Math.max(-1, Math.min(1, (e.beta - 35) / 35)) * 20}%`);
      }
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('visible'));
  }

  // Safety: content must never remain invisible if the observer is unavailable or
  // the browser reports an unusual viewport/layout state.
  setTimeout(() => revealItems.forEach(el => el.classList.add('visible')), 1800);
})();
