// hover navigatie
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: "#e63946", duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: "#fff", duration: 0.3 });
    });
});