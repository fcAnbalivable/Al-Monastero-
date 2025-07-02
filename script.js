document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".panel");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.6 }
  ); // Показываем секцию, когда она видна на 60%

  panels.forEach((panel) => observer.observe(panel));
});
