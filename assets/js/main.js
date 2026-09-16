(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const year = document.querySelector("[data-year]");
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll("[data-nav]")];

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const setMenu = (open) => {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", String(open));
    mobileNav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { threshold: 0.35, rootMargin: "-20% 0px -45% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
