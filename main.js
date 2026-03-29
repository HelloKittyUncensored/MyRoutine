gsap.registerPlugin(ScrollTrigger);

// hover buttons
document.querySelectorAll('.card-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, backgroundColor: "#ff2e3c", duration: 0.3 });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, backgroundColor: "#e63946", duration: 0.3 });
    });

    button.addEventListener('click', () => {
        window.location.href = '/MyRoutine/training';
    });
});

// hover navigatie
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: "#e63946", duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: "#fff", duration: 0.3 });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    const secties = document.querySelectorAll('.sectie1, .sectie2, .sectie3, .sectie4');
    const randomIndex = Math.floor(Math.random() * secties.length);
    const geselecteerdeSectie = secties[randomIndex];

    secties.forEach(function(sectie, index) {
        if (index === randomIndex) {
            sectie.style.display = 'flex';
        } else {
            sectie.style.display = 'none';
        }
    });



    const panels = geselecteerdeSectie.querySelectorAll('.panel');
    const cards = geselecteerdeSectie.querySelectorAll('.card-workout, .card-motivation, .card-meal');

    panels.forEach((panel, i) => {
        gsap.from(panel, {
            scrollTrigger: {
                trigger: panel,
                start: "top bottom"
            },
            x: i % 2 === 0 ? -200 : 200,
            opacity: 0,
            duration: 1
        });
    });

    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%"
            },
            x: i % 2 === 0 ? -300 : 300,
            opacity: 0,
            duration: 1
        });
    });

    // hover cards
    document.querySelectorAll('.card-workout, .card-motivation, .card-meal').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -10, boxShadow: "0 20px 30px rgba(0,0,0,0.8)", duration: 0.3 });
            gsap.to(card.querySelector('.card-content'), { backgroundColor: "rgba(230, 57, 70, 0.9)", duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, boxShadow: "0 10px 20px rgba(0,0,0,0.6)", duration: 0.3 });
            gsap.to(card.querySelector('.card-content'), { backgroundColor: "rgba(26, 26, 26, 0.85)", duration: 0.3 });
        });
    });

});
