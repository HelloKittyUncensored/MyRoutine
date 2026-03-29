
// hover navigatie
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: "#e63946", duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: "#fff", duration: 0.3 });
    });
});


// video in cards
const cards = document.querySelectorAll('.card-exercise');
cards.forEach(card => {
    const video = card.querySelector('.card-video');

    card.addEventListener('mouseenter', () => {
        video.play();
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});


// interactieve anatomie
document.addEventListener("DOMContentLoaded", function() {
  d3.xml("../../anatomy.svg").then(function(data) {

    const container = document.getElementById("container");
    container.appendChild(data.documentElement);

    d3.selectAll("#container path")
      .each(function() {
        const original = d3.select(this).style("fill");
        d3.select(this).attr("data-original-fill", original);
      });

    d3.selectAll(".card-exercise")
      .on("mouseover", function() {
        const muscles = this.dataset.muscles.split(",");
        muscles.forEach(muscle => {
          d3.select("#" + muscle.trim())
            .style("fill", "red");
        });

      })
      .on("mouseout", function() {
        d3.selectAll("#container path")
          .each(function() {
            const original = d3.select(this).attr("data-original-fill");
            d3.select(this).style("fill", original);
          });
      });
  });
});