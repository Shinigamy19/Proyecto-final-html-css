const sliderTrack = document.getElementById('slider-track');
const slides = sliderTrack.children;
const totalSlides = slides.length;
let currentIndex = 0;

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.getElementById('prev').onclick = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
};
document.getElementById('next').onclick = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
};

// Auto-slide cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}, 5000);

// Animaciones de fade-in para secciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
    sec.classList.add('opacity-0');
    observer.observe(sec);
    sec.addEventListener('animationend', () => sec.classList.remove('opacity-0'));
});

// Animaciones de fade-in para el slider
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('animate-fade-in'); // Reinicia animación si ya estaba
            // Forzar reflow para reiniciar la animación
            void entry.target.offsetWidth;
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
    sectionObserver.observe(sec);
});

// Efecto de parallax en el slider
const parallaxSlider = document.getElementById('slider');
if (parallaxSlider) {
    parallaxSlider.addEventListener('mousemove', (e) => {
        const rect = parallaxSlider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width - 0.5) * 2; // -1 a 1
        // Aplica el efecto a cada imagen del slider
        Array.from(sliderTrack.children).forEach(img => {
            img.style.transform = `scale(1.05) translateX(${percent * 20}px)`;
        });
    });

    parallaxSlider.addEventListener('mouseleave', () => {
        Array.from(sliderTrack.children).forEach(img => {
            img.style.transform = '';
        });
    });
}
