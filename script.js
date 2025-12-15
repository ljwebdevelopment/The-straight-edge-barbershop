// ===============================
// Mobile navigation toggle
// ===============================
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav when clicking a link (mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// ===============================
// Smooth scroll with sticky header offset
// ===============================
function getHeaderOffset() {
  const header = document.querySelector(".header");
  return header ? header.offsetHeight + 14 : 94;
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id.length < 2) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      getHeaderOffset();

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
});

// ===============================
// Footer year auto-update
// ===============================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===============================
// Accordion: allow only one open at a time
// ===============================
const accordions = document.querySelectorAll(".acc");

accordions.forEach((accordion) => {
  accordion.addEventListener("toggle", () => {
    if (accordion.open) {
      accordions.forEach((other) => {
        if (other !== accordion) {
          other.open = false;
        }
      });
    }
  });
});
