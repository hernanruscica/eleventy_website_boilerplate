document.addEventListener("DOMContentLoaded", function () {
  /* --- Back to top & WhatsApp (shared scroll listener) --- */
  var btnTop = document.getElementById("btn-top");
  var btnWhats = document.querySelector(".btn-whatsapp");

  if (btnTop) {
    btnTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", function () {
    var show = window.scrollY > 300;
    if (btnTop) btnTop.classList.toggle("visible", show);
    if (btnWhats) btnWhats.classList.toggle("visible", show);
  }, { passive: true });

  /* --- Mobile nav toggle --- */
  var navToggle = document.querySelector(".main-nav__toggle");
  var navWrapper = document.querySelector(".main-nav__wrapper");

  if (navToggle && navWrapper) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.classList.toggle("is-active");
      navWrapper.classList.toggle("is-open");
    });

    /* Close menu when clicking a link */
    navWrapper.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-active");
        navWrapper.classList.remove("is-open");
      }
    });
  }
});
