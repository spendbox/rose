// The Ress Brand — interactions
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sticky nav shadow + scroll progress bar
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  var onScroll = function () {
    var y = window.scrollY || window.pageYOffset;
    if (y > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
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

  // Count-up numbers
  var runCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target) || reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Scroll-reveal animation (with stagger) + count-up trigger
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.querySelectorAll("[data-count]").forEach(runCount);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      // stagger siblings within the same parent for a cascade effect
      if (!reduceMotion && el.parentElement) {
        var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) {
          return c.classList.contains("reveal");
        });
        var idx = sibs.indexOf(el);
        if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.08, 0.48) + "s";
      }
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Active nav link highlighting
  var sections = document.querySelectorAll("main section[id]");
  var navMap = {};
  document.querySelectorAll('.nav__links a[href^="#"]').forEach(function (a) {
    navMap[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var link = navMap[entry.target.id];
            if (link) {
              Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove("is-active"); });
              link.classList.add("is-active");
            }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Subtle parallax on the hero visual (wrapper, so it doesn't fight the float anim)
  var heroVisual = document.querySelector(".hero__visual");
  if (heroVisual && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 16;
      var y = (e.clientY / window.innerHeight - 0.5) * 16;
      heroVisual.style.transform = "translate(" + x + "px," + y + "px)";
    }, { passive: true });
  }
})();
