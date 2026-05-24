const business = {
  name: "The Straight Edge Barbershop",
  phone: "918-207-2098",
  phoneHref: "tel:+19182072098",
  email: "thestraightedge514@gmail.com",
  bookingUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now"
};

const services = [
  {
    title: "Classic Cuts",
    description: "Traditional barber cuts, scissor work, short styles, kids cuts, and reliable everyday cleanups.",
    items: ["Adult haircuts", "Kids haircuts", "Scissor cuts", "Mid to long length cuts"]
  },
  {
    title: "Fades & Detail Work",
    description: "Clean skin fades, custom fades, tapers, burst fades, mullets, blowouts, designs, and polished edges.",
    items: ["Skin fades", "Custom fades", "Tapers", "Undercut designs"]
  },
  {
    title: "Beards & Razor Work",
    description: "Beard trims, hot towel straight razor services, burr cuts, ear and nose wax, and crisp finishing work.",
    items: ["Beard trims", "Straight razor shaves", "Hot towel services", "Waxing"]
  },
  {
    title: "Braids, Locs & Style",
    description: "Braid consultations, feed-in braids, whole or half-head braids, loc retwists, and longer style work.",
    items: ["Braids", "Loc retwists", "Women's cuts", "Styled finishes"]
  }
];

const team = [
  {
    name: "Emily Hullinger",
    role: "Owner",
    image: "assets/team/emily.jpg",
    alt: "Emily Hullinger",
    bio: "Owner since 2014 with a focus on fades, scissor cuts, and tailored classic barbering."
  },
  {
    name: "Kerry Justus",
    role: "Barber",
    image: "assets/team/kerry.jpg",
    alt: "Kerry Justus",
    bio: "More than 40 years in the craft, known for classic fades, clean beards, and consistent results."
  },
  {
    name: "Nick Wallen",
    role: "Barber",
    image: "assets/team/nick.jpg",
    alt: "Nick Wallen",
    bio: "Eight-plus years of experience with classic cuts, bold custom fades, and a polished finish."
  },
  {
    name: "Teegan Fourkiller",
    role: "Barber",
    image: "assets/team/teegan.jpg",
    alt: "Teegan Fourkiller",
    bio: "Licensed cosmetologist who enjoys the challenge of unique cuts and client-specific detail."
  },
  {
    name: "Cori Sue Butcher",
    role: "Braids, Locs & Barbering",
    image: "assets/team/cori-butcher.jpg",
    alt: "Cori Sue Butcher",
    bio: "Detail-driven barber offering skin fades, braids, loc styles, and polished texture work."
  },
  {
    name: "Denise Cerda",
    role: "Straight Razor Barber",
    image: "assets/team/denise.jpg",
    alt: "Denise Cerda",
    bio: "Bilingual barber focused on crisp straight razor work, clean fades, and welcoming service."
  },
  {
    name: "Felisha Phillips",
    role: "Barber",
    image: "assets/team/felisha.jpg",
    alt: "Felisha Phillips",
    bio: "Nine years of experience in women's and men's cuts with a tailored, careful finish."
  },
  {
    name: "Colt Hickerson",
    role: "Barber",
    image: "assets/team/colt.jpg",
    alt: "Colt Hickerson",
    bio: "A new barber building his craft with focus, energy, and a steady hand for clean cuts."
  }
];

const reviews = [
  {
    name: "Lacey Tripp",
    quote: "Love love love this place! My husband never liked his haircuts for years, but he has come here the last 3 times and loves it. We will be using Straight Edge for many more years to come."
  },
  {
    name: "Sarah Frankie",
    quote: "Emily and her team are amazing. Emily has been cutting my son's hair since he was 8 years old, and he is now 20. We love her and he still does not trust any other shop."
  },
  {
    name: "Shayna Rodriguez",
    quote: "Service and customer service are amazing and we love to come back. Emily has worked hard to make it inviting and have great stylists."
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderServices() {
  const target = document.querySelector("[data-services]");
  if (!target) return;

  target.innerHTML = services.map((service) => `
    <article class="service-card">
      <div>
        <h3>${escapeHtml(service.title)}</h3>
        <p>${escapeHtml(service.description)}</p>
      </div>
      <ul>
        ${service.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function renderTeam() {
  const target = document.querySelector("[data-team]");
  if (!target) return;

  target.innerHTML = team.map((person) => `
    <article class="team-card">
      <img src="${escapeHtml(person.image)}" alt="${escapeHtml(person.alt)}" width="420" height="525" loading="lazy" data-team-photo>
      <div class="team-card-body">
        <h3>${escapeHtml(person.name)}</h3>
        <div class="role">${escapeHtml(person.role)}</div>
        <p>${escapeHtml(person.bio)}</p>
        <a href="${business.bookingUrl}" target="_blank" rel="noopener" aria-label="Book with ${escapeHtml(person.name)} through Vagaro">Book through Vagaro</a>
      </div>
    </article>
  `).join("");
}

function renderReviews() {
  const target = document.querySelector("[data-reviews]");
  if (!target) return;

  target.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <div class="rating" aria-label="Five star review">5.0 / 5</div>
      <p>"${escapeHtml(review.quote)}"</p>
      <cite>${escapeHtml(review.name)}</cite>
    </article>
  `).join("");
}

function setupNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

function setupYear() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
}

function setupImageFallbacks() {
  document.querySelectorAll("[data-team-photo]").forEach((img) => {
    img.addEventListener("error", () => {
      img.src = "assets/logos/straight-edge-logo-white.png";
      img.classList.add("is-fallback");
    }, { once: true });
  });
}

renderServices();
renderTeam();
renderReviews();
setupNavigation();
setupImageFallbacks();
setupYear();
