const nav = document.querySelector('.nav');
const toggle = document.querySelector('.mobile-nav-toggle');
const yearEl = document.getElementById('year');

function toggleNav() {
  const isOpen = nav.getAttribute('data-open') === 'true';
  nav.setAttribute('data-open', String(!isOpen));
  toggle.setAttribute('aria-expanded', String(!isOpen));
}

function closeNavOnLinkClick(event) {
  if (event.target.tagName !== 'A') return;
  if (window.innerWidth > 900) return;
  nav.setAttribute('data-open', 'false');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle?.addEventListener('click', toggleNav);
nav?.addEventListener('click', closeNavOnLinkClick);

yearEl.textContent = new Date().getFullYear();

// Highlight nav link for active section
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav a[href="#${id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach(el => el.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
);

sections.forEach(section => observer.observe(section));
