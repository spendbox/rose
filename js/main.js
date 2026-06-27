// The Ress Brand — interactions
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky nav shadow on scroll
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  var closeMenu = function () {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
  }

  // Lightbox for portfolio / certificate images
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = document.getElementById("lightboxImg");
    var openLightbox = function (src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    var closeLightbox = function () {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      lbImg.src = "";
      document.body.style.overflow = "";
    };
    document.querySelectorAll("[data-lightbox]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var img = link.querySelector("img");
        openLightbox(link.getAttribute("href"), img ? img.alt : "");
      });
    });
    lb.addEventListener("click", function (e) {
      if (e.target !== lbImg) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("is-open")) closeLightbox();
    });
  }

  // Scroll-reveal animation
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
