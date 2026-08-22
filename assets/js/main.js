(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'tan-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const preferred = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(preferred);

  themeToggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');

  function closeNav() {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleNav);
  overlay.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  const courseGrid = document.querySelector('.course-grid');
  if (courseGrid) {
    let isDragging = false;
    let dragMoved = false;
    let startX = 0;
    let startScrollLeft = 0;

    courseGrid.addEventListener('mousedown', function (e) {
      isDragging = true;
      dragMoved = false;
      startX = e.pageX;
      startScrollLeft = courseGrid.scrollLeft;
      courseGrid.classList.add('dragging');
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      const delta = e.pageX - startX;
      if (Math.abs(delta) > 3) dragMoved = true;
      courseGrid.scrollLeft = startScrollLeft - delta;
    });

    window.addEventListener('mouseup', function () {
      isDragging = false;
      courseGrid.classList.remove('dragging');
    });

    courseGrid.addEventListener('click', function (e) {
      if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }
})();
