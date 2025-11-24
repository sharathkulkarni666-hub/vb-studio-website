(function () {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Theme toggle with localStorage
  const toggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('vb-theme');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      toggle.textContent = '☀️';
    } else {
      root.removeAttribute('data-theme');
      toggle.textContent = '🌙';
    }
  }

  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(now);
    localStorage.setItem('vb-theme', now);
  });

  // Contact form submission using mailto:
  window.handleFormSubmit = function (e) {
    e.preventDefault();
    const f = e.target;

    const name = encodeURIComponent(f.name.value.trim());
    const email = encodeURIComponent(f.email.value.trim());
    const message = encodeURIComponent(f.message.value.trim());

    const subject = encodeURIComponent(`VB Studio Enquiry from ${f.name.value || 'Website'}`);

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailto = `mailto:vbstudio@example.com?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    return false;
  };
})();
