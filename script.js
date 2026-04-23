const tabButtons = document.querySelectorAll("[data-tab-target]");
const tabPanels = document.querySelectorAll("[data-tab-panel]");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tabTarget;

    tabButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-selected", item === button ? "true" : "false");
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
    });
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countItems = document.querySelectorAll("[data-count]");
const statsBand = document.querySelector(".stats-band");

function animateCount(element) {
  const target = Number(element.dataset.count);
  const decimals = Number(element.dataset.decimals || 0);
  const duration = 1500;
  const start = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = target * eased;
    element.textContent = value.toFixed(decimals);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

if (statsBand) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countItems.forEach((item) => animateCount(item));
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  statsObserver.observe(statsBand);
}

const moodRange = document.querySelector("#moodRange");
const moodLabel = document.querySelector("#moodLabel");
const packageHint = document.querySelector("#packageHint");
const zoneHint = document.querySelector("#zoneHint");
const moodMeter = document.querySelector(".mood-meter");

const moods = [
  {
    label: "Soft aperitivo",
    package: "Rooftop sofa + sparkling welcome set",
    zone: "Skyline Lounge",
    color: "#8af5c8",
  },
  {
    label: "Warm social",
    package: "Corner table + two signature cocktails",
    zone: "Cocktail Lab",
    color: "#b4f18d",
  },
  {
    label: "Balanced pulse",
    package: "Signature table + citrus welcome set",
    zone: "Skyline Lounge",
    color: "#f3c97a",
  },
  {
    label: "High energy",
    package: "Main floor table + bottle ritual",
    zone: "Main Pulse Floor",
    color: "#ff9d6b",
  },
  {
    label: "Full peak mode",
    package: "Private Noir room + after-hours host",
    zone: "Private Noir Room",
    color: "#ff6c4f",
  },
];

function updateMood() {
  const selectedMood = moods[Number(moodRange.value) - 1];

  if (!selectedMood) {
    return;
  }

  moodLabel.textContent = selectedMood.label;
  packageHint.textContent = selectedMood.package;
  zoneHint.textContent = selectedMood.zone;
  moodMeter.style.setProperty("--mood-accent", selectedMood.color);
}

if (moodRange) {
  updateMood();
  moodRange.addEventListener("input", updateMood);
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxCopy = document.querySelector("#lightboxCopy");
const galleryCards = document.querySelectorAll(".gallery-card");
const closeLightboxButtons = document.querySelectorAll("[data-close-lightbox]");

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    lightboxCopy.textContent = card.dataset.copy;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

closeLightboxButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});
