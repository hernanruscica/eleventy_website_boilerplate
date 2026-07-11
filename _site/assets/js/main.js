document.addEventListener("DOMContentLoaded", function () {
  /* --- Back to top --- */
  var btnTop = document.getElementById("btn-top");

  if (btnTop) {
    btnTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          btnTop.classList.toggle("visible", !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    scrollObserver.observe(document.body);
  }

  /* --- Mobile nav toggle --- */
  var navToggle = document.querySelector(".main-nav__toggle");
  var navMenu = document.querySelector(".main-nav__menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.classList.toggle("is-active");
      navMenu.classList.toggle("is-open");
    });

    /* Close menu when clicking a link */
    navMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-active");
        navMenu.classList.remove("is-open");
      }
    });
  }
});
