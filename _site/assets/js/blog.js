document.addEventListener("DOMContentLoaded", function () {
  var filtros = document.querySelectorAll("[data-filtro]");
  var entradas = document.querySelectorAll("[data-categoria]");

  if (!filtros.length || !entradas.length) return;

  filtros.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var categoria = btn.getAttribute("data-filtro");

      filtros.forEach(function (b) {
        b.classList.remove("activo");
      });
      btn.classList.add("activo");

      entradas.forEach(function (entrada) {
        var cats = (entrada.getAttribute("data-categoria") || "").split(",");
        if (categoria === "todas" || cats.indexOf(categoria) !== -1) {
          entrada.style.display = "";
        } else {
          entrada.style.display = "none";
        }
      });
    });
  });
});
