// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav when clicking a link (mobile)
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// Improve scroll-to behavior by accounting for sticky header
const header = document.querySelector(".header");
const headerHeight = header ? header.offsetHeight : 80;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id.length < 2) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 14);

    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Accordion behavior: optional single-open mode (keeps it classy/clean)
const accordions = document.querySelectorAll(".acc");
accordions.forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) {
      accordions.forEach((other) => {
        if (other !== d) other.open = false;
      });
    }
  });
});
