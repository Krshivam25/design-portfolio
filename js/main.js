/* Neha Nayak portfolio — shared behaviour: mobile nav, lightbox, scroll reveal */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Lightbox ---------- */
  var figures = Array.prototype.slice.call(
    document.querySelectorAll(".gallery figure")
  );

  if (figures.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
      '<button class="lb-next" aria-label="Next">&#8250;</button>' +
      "<img alt=\"\">" +
      '<div class="lb-caption"></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector("img");
    var lbCaption = lb.querySelector(".lb-caption");
    var current = 0;

    function show(i) {
      current = (i + figures.length) % figures.length;
      var img = figures[current].querySelector("img");
      var cap = figures[current].querySelector("figcaption");
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lbCaption.textContent = cap ? cap.textContent : img.alt || "";
    }

    function open(i) {
      show(i);
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }

    figures.forEach(function (fig, i) {
      fig.addEventListener("click", function () { open(i); });
    });

    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function (e) {
      e.stopPropagation();
      show(current - 1);
    });
    lb.querySelector(".lb-next").addEventListener("click", function (e) {
      e.stopPropagation();
      show(current + 1);
    });

    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target === lbImg) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
