document.addEventListener("DOMContentLoaded", function () {
  var btnSubir = document.getElementById("btn-subir");

  if (btnSubir) {
    btnSubir.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var scrollObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          btnSubir.classList.toggle("visible", !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    scrollObserver.observe(document.body);
  }

  var contadores = document.querySelectorAll("[data-objetivo]");
  if (contadores.length) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var objetivo = parseInt(el.getAttribute("data-objetivo"), 10);
            if (isNaN(objetivo)) return;
            counterObserver.unobserve(el);
            animarContador(el, objetivo);
          }
        });
      },
      { threshold: 0.3 }
    );

    contadores.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animarContador(el, objetivo) {
    var duracion = 2000;
    var inicio = performance.now();

    function paso(timestamp) {
      var progreso = Math.min((timestamp - inicio) / duracion, 1);
      var valor = Math.floor(progreso * objetivo);
      el.textContent = valor;
      if (progreso < 1) {
        requestAnimationFrame(paso);
      } else {
        el.textContent = objetivo;
      }
    }

    requestAnimationFrame(paso);
  }
});
