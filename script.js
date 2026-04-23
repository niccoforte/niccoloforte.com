const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sectionLinks.length > 0 && sections.length > 0) {
  const activeLinkById = new Map(
    sectionLinks.map((link) => [link.getAttribute("href").slice(1), link])
  );

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        sectionLinks.forEach((link) => link.removeAttribute("aria-current"));
        const activeLink = activeLinkById.get(entry.target.id);
        if (activeLink) {
          activeLink.setAttribute("aria-current", "page");
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-20% 0px -45% 0px",
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}
