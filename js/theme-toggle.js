const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeDropdown = document.getElementById('theme-dropdown');
const themeIcon = document.getElementById('theme-icon');
const iconSystem = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="5" width="16" height="12" rx="2" stroke-width="2"/><path d="M8 21h8" stroke-width="2"/></svg>`;
const iconLight = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="5" stroke-width="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-width="2"/></svg>`;
const iconDark = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke-width="2"/></svg>`;

// Cambia el logo según el modo
function updateLogo() {
  // Espera a que el DOM esté listo y el logo exista
  const logo = document.getElementById('logo-codigo-dein');
  if (!logo) return;
  if (document.documentElement.classList.contains('dark')) {
    logo.src = 'img/9.png';
  } else {
    logo.src = 'img/10.png';
  }
}

function setTheme(theme) {
  if (theme === 'dark') {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.innerHTML = iconDark;
  } else if (theme === 'light') {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeIcon.innerHTML = iconLight;
  } else {
    // Sistema
    localStorage.setItem('theme', 'system');
    themeIcon.innerHTML = iconSystem;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
  // Espera un tick para asegurar que la clase se aplique antes de cambiar el logo
  setTimeout(updateLogo, 0);
}

// Inicialización
function initTheme() {
  const saved = localStorage.getItem('theme') || 'system';
  setTheme(saved);
}
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateLogo();
});

// Dropdown toggle
themeToggle.addEventListener('click', () => {
  themeDropdown.classList.toggle('hidden');
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
  if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
    themeDropdown.classList.add('hidden');
  }
});

// Cambiar tema al seleccionar opción
themeDropdown.querySelectorAll('button[data-theme]').forEach(btn => {
  btn.addEventListener('click', () => {
    setTheme(btn.getAttribute('data-theme'));
    themeDropdown.classList.add('hidden');
  });
});

// Cambiar tema si el sistema cambia (solo si está en modo sistema)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (localStorage.getItem('theme') === 'system') {
    setTheme('system');
  }
  updateLogo();
});