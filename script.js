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
function getHeaderOffset(){
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
    const top = target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Accordion single-open mode
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

/* =========================================================
   Profile Modal (Team + Services)
   - Click team cards or "View profile"
   - Background photo blends into black
   - ESC + click outside closes
========================================================= */

const modal = document.getElementById("profileModal");
const modalDialog = modal ? modal.querySelector(".profile-modal__dialog") : null;

const elBg = document.getElementById("profileBg");
const elAvatar = document.getElementById("profileAvatar");
const elTitle = document.getElementById("profileTitle");
const elRole = document.getElementById("profileRole");
const elBio = document.getElementById("profileBio");
const elServices = document.getElementById("profileServices");
const elNote = document.getElementById("profileNote");
const elBook = document.getElementById("profileBook");

let lastFocus = null;

const PROFILES = {
  emily: {
    name: "Emily Hullinger",
    role: "Owner",
    photo: "assets/emily.jpg",
    bio: "Hey there! I'm the proud owner of The Straight Edge Barbershop, a business that has been my passion since I founded it in September 2014. I grew up in Tahlequah, Oklahoma, and always had a love for hair. That's why I enrolled in Tahlequah Beauty College in March 2010, and after graduation, I started my career at a local beauty salon. But after four years, I knew I needed something more. It wasn't until I joined my cousin Hal Green at his barbershop, Cowboy Barbershop in January 2014 that I found my true calling in barbering. With Hal's guidance, I honed my skills for eight months and gained invaluable knowledge and experience. Today, I specialize in all types of fades, scissor cuts, and more, and I'm dedicated to providing my clients with the highest level of service and expertise.",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Emily’s Classic Haircut", price: "38" },
      { title: "Emily’s Classic Haircut & Beard Trim", price: "48" },
      { title: "Emily’s Skin Fade", price: "48" },
      { title: "Emily’s Skin Fade & Beard Trim", price: "$58" },
      { title: "Emily’s Custom Haircut / Detailed Fade", price: "$60" },
      { title: "Emily’s Beard Trim", price: "$28" },
      { title: "Emily’s Mid to Long Length Haircut", price: "$45" },
      { title: "Emily’s Short Haircut, Blow-Dry, & Styled / Undercut Design / Pixie Cut", price: "$60" },
      { title: "Emily’s Flat Top", price: "$50" }
    ],
    note: ""
  },

  kerry: {
    name: "Kerry Justus",
    role: "Barber",
    photo: "assets/kerry.jpg",
    bio: "I've had the pleasure of being in the industry for over four decades, and I can say with confidence that I've never lost my passion for it. My love for cutting hair started at a young age, and it has only grown stronger over the years. I specialize in all types of haircuts, but my absolute favorite is a Classic #1 guard fade with scissors on the top - especially when paired with a well-manicured beard and mustache. I take great pride in my work and always strive to provide my clients with the best possible experience. When I'm not at the barbershop, you can find me soaking up the sun and enjoying the water with my husband Kevin at our home on Lake Tenkiller. I believe that life is all about finding what you love and doing it with passion, and I'm grateful every day that I get to do just that.",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Kerry’s Classic Adult Haircut", price: "$25" },
      { title: "Kerry’s Adult Classic Haircut w/ Beard Trim", price: "$35" },
      { title: "Kerry’s Adult Skin Fade", price: "$35" },
      { title: "Kerry’s Adult Skin Fade w/ Beard Trim", price: "$45" },
      { title: "Kerry’s Kids Classic Haircut (12 and under)", price: "$22" },
      { title: "Kerry’s Kids Skin Fade", price: "$32" },
      { title: "Kerry’s Women’s Haircut w/ Style", price: "$35" },
      { title: "Kerry’s Eyebrow Wax", price: "$15" },
      { title: "Kerry’s Beard Trim", price: "$15" }
    ],
    note: ""
  },

  nick: {
    name: "Nick Wallen",
    role: "Barber",
    photo: "assets/nick.jpg",
    bio: "I am Nick Wallen, a professional barber with over 8 years of experience in the Barbering industry. My passion lies in delivering exceptional haircuts that leave my clients feeling confident and stylish. After gaining valuable experience at FadeNUp, a renowned barbershop in Norman, I helped open The Shoppe in McAlester, OK in 2021. Throughout my career, I have worked with all kinds of hair types and textures, and I take pride in my ability to create exceptional styles. Whether you're after a classic cut or something a bit more daring, I have the skills and expertise necessary to make it happen. Come visit me at the Straight Edge Barbershop!",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Nick’s Classic Haircut", price: "$25" },
      { title: "Nick’s Classic Haircut & Beard Trim", price: "$35" },
      { title: "Nick’s Skin Fade - All Ages", price: "$45" },
      { title: "Nick’s Skin Fade & Beard Trim", price: "$45" },
      { title: "Nick’s Custom Fade - Burst, Tapers, Blowouts, ect.", price: "$40" },
      { title: "Nick’s Custom Fade & Beard Trim - Bursts, Tapers, Blowouts, ect.", price: "$50" }
    ],
  },

  teegan: {
    name: "Teegan Fourkiller",
    role: "Barber",
    photo: "assets/teegan.jpg",
    bio: "I am a licensed cosmetologist, having graduated from Paul Mitchell College in Fayetteville, AR in August 2022. I joined The Straight Edge Barbershop team as a receptionist, where I had the opportunity to learn from the experienced barber/stylists during my downtime. In February 2023, I transitioned into my own barber chair and I couldn't be happier. I enjoy the challenge of every unique haircut, and I am constantly learning from the talented stylists around me. Outside of work, I value spending time with my loved ones and friends.",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Teegan’s Classic Haircut", price: "$25" },
      { title: "Teegan’s Skin Fade", price: "$35" },
      { title: "Teegan’s Kids Classic Haircut (kids under 12)", price: "$22" },
      { title: "Teegan’s Kids Skin Fade (kids under 12)", price: "$32" },
      { title: "Teegan’s Custom Haircut", price: "$35" },
      { title: "Teegan’s Classic Haircut & Beard Trim", price: "$35" },
      { title: "Teegan’s Skin Fade & Beard Trim", price: "$45" },
      { title: "Teegan’s Beard Trim", price: "$10" },
      { title: "Teegan’s Mid to Long Length Haircut", price: "$30" }
    ],
    note: ""
  },

  cori: {
    name: "Cori Sue Butcher",
    role: "Barber / Braids & Locs",
    photo: "assets/cori%20butcher.jpg",
    bio: "As a licensed cosmetologist since January 2023 and a graduate of Paul Mitchell, I bring a passion for hairstyling and a dedication to every client. I recently returned to Tahlequah from Tulsa and have been providing a range of services to my clients. My special love for fades, particularly skin fades, has allowed me to hone my skills in this area. Additionally, I enjoy creating all types of braids and loc styles, ensuring each client leaves with a unique and polished look. I invite you to stop by and experience my commitment to exceptional service and personalized attention to detail.",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Cori Sue’s Classic Haircut", price: "$25" },
      { title: "Cori Sue’s Skin Fade", price: "$30" },
      { title: "Cori Sue’s Kids Haircut", price: "$17" },
      { title: "Cori Sue’s Kids Skin Fade", price: "$25" },
      { title: "Cori Sue’s Custom Haircut", price: "$35" },
      { title: "Cori Sue’s Women’s Haircut with Style", price: "$30" },
      { title: "Cori Sue’s Beard Trim", price: "$10" },
      { title: "Cori Sue’s Edge Up and Taper", price: "$15" },
      { title: "Cori Sue’s Classic Haircut & Beard Trim", price: "$35" },
      { title: "Cori Sue’s Skin Fade & Beard Trim", price: "$40" },
      { title: "Cori Sue’s Burr Cut", price: "$15" },
      { title: "Braid Consultation", price: "FREE" },
      { title: "Feed-In Braids", price: "$40" },
      { title: "Whole Head Loc Retwist", price: "$80" },
      { title: "Half Head Loc Retwist", price: "$50" },
      { title: "Whole Head Braids", price: "$75" },
      { title: "Half Head Hair Braids", price: "$50" }
    ],
    note: ""
  },

  denise: {
    name: "Denise Cerda",
    role: "Barber / Straight Razor",
    photo: "assets/denise.jpg",
    bio: "Denise Cerda is a talented barber who recently graduated from Clary Sage College & is currently training under our shop owner, Emily Hullinger. Her passion for perfecting her craft is evident in every cut she does, with her favorite tool being the straight razor, which provides a crisp and clean finish. As a bilingual professional, Denise is able to cater to clients who speak either English or Spanish. She is dedicated to ensuring that every client feels comfortable and confident while in her chair. When not at work, Denise enjoys spending time with her family and staying active at the gym. She is excited to connect with the Tahlequah community at The Straight Edge Barbershop and provide clients with the freshest cuts.",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Denise’s Classic Haircut", price: "$18" },
      { title: "Denise’s Classic Kid’s Haircut (2–12)", price: "$16" },
      { title: "Denise’s Classic Haircut & Beard Trim", price: "$25" },
      { title: "Denise’s Skin Fade", price: "$25" },
      { title: "Denise’s Skin Fade & Beard Trim", price: "$30" },
      { title: "Denise’s Hot Towel Straight Razor – Full Head & Face", price: "$50" },
      { title: "Denise’s Beard Trim & Hot Towel Full Face Straight Razor", price: "$40" },
      { title: "Denise’s Full Head Hot Towel Straight Razor Shave & Beard Trim", price: "$50" },
      { title: "Denise’s Full Head Hot Towel Shave", price: "$40" },
      { title: "Burr & Beard Trim", price: "$20" },
      { title: "Beard Trim", price: "$12" },
      { title: "Burr & Beard Trim with Foil Shaver", price: "$28" },
      { title: "Ear and Nose Wax", price: "$12" },
      { title: "Ear Wax", price: "$7" },
      { title: "Nose Wax", price: "$7" }
    ],
    note: ""
  },

  felisha: {
    name: "Felisha Phillips",
    role: "Barber",
    photo: "assets/felisha.jpg",
    bio: "No bio",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Classic Haircut", price: "$25" },
      { title: "Classic Haircut & Beard Trim", price: "$35" },
      { title: "Classic Kid’s Haircut (12 & Under)", price: "$20" },
      { title: "Bald Fade", price: "$35" },
      { title: "Custom Fade / Burst Fade / Mullet / All Taper Fades (All Ages)", price: "$35" },
      { title: "Beard Trim", price: "$15" },
      { title: "Women’s Haircut", price: "$35" },
      { title: "Bald Fade & Beard Trim", price: "$45" }
    ],
    note: ""
  },

  colt: {
    name: "Colt Hickerson",
    role: "Barber",
    photo: "assets/colt.jpg",
    bio: "My name is Colten Hickerson, I attended Elite Beauty College in Muskogee, OK from 2025 to 2026. This is my first year cutting hair. I'm excited to get my career started and learn as much as I can.",
    bookUrl: "https://www.vagaro.com/thestraightedgebarbershop/book-now",
    services: [
      { title: "Colt’s Classic Haircut", price: "$18" },
      { title: "Colt’s Classic Haircut & Beard Trim", price: "$25" },
      { title: "Colt’s Classic Kid’s Haircut", price: "$16" },
      { title: "Colt’s Skin Fade", price: "$25" },
      { title: "Colt’s Skin Fade & Beard Trim", price: "$30" },
      { title: "Colt’s Beard Trim", price: "$12" },
      { title: "Colt’s Burr & Beard Trim", price: "$20" },
      { title: "Colt’s Burr", price: "$16" }
    ],
    note: ""
  }
};

function setModalContent(profileKey){
  const data = PROFILES[profileKey];
  if (!data) return;

  // Background image
  if (elBg) elBg.style.backgroundImage = `url("${data.photo}")`;

  // Avatar
  if (elAvatar) {
    elAvatar.src = data.photo;
    elAvatar.alt = data.name;
  }

  // Text
  if (elTitle) elTitle.textContent = data.name;
  if (elRole) elRole.textContent = data.role || "";
  if (elBio) elBio.textContent = data.bio || "";

  // Services list
  if (elServices) {
    elServices.innerHTML = "";
    (data.services || []).forEach((s) => {
      const li = document.createElement("li");
      const left = document.createElement("span");
      const right = document.createElement("span");
      left.textContent = s.title || "";
      right.textContent = s.price || "";
      li.appendChild(left);
      li.appendChild(right);
      elServices.appendChild(li);
    });
  }

  // Note
  if (elNote) elNote.textContent = data.note || "";

  // Book button
  if (elBook) elBook.href = data.bookUrl || "https://www.vagaro.com/thestraightedgebarbershop/book-now";
}

function openModal(profileKey){
  if (!modal) return;

  lastFocus = document.activeElement;
  setModalContent(profileKey);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Focus close button for accessibility
  const closeBtn = modal.querySelector('[data-close="true"]');
  if (closeBtn) closeBtn.focus();
}

function closeModal(){
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocus && typeof lastFocus.focus === "function") {
    lastFocus.focus();
  }
}

// Open from team cards
document.querySelectorAll('[data-profile]').forEach((el) => {
  el.addEventListener("click", (e) => {
    const key = el.getAttribute("data-profile");
    // Prevent summary toggles from being blocked when clicking inside <summary>
    // We only open modal if this is a button/person-card (not the <summary> itself)
    const tag = (el.tagName || "").toLowerCase();
    const isSummary = tag === "summary";
    if (isSummary) return;

    // If it's inside a <summary>, allow the accordion to work unless it's the profile button
    if (el.closest("summary") && !el.classList.contains("profile-open")) return;

    if (key) openModal(key);
  });
});

// Backdrop / close button
if (modal) {
  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (!target) return;

    const wantsClose = target.getAttribute && target.getAttribute("data-close") === "true";
    if (wantsClose) closeModal();
  });
}

// ESC closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeModal();
  }
});
