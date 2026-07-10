document.addEventListener("DOMContentLoaded", function () {
  var filters = document.querySelectorAll("[data-filter]");
  var entries = document.querySelectorAll("[data-category]");

  if (!filters.length || !entries.length) return;

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var category = btn.getAttribute("data-filter");

      filters.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      entries.forEach(function (entry) {
        var cats = (entry.getAttribute("data-category") || "").split(",");
        if (category === "all" || cats.indexOf(category) !== -1) {
          entry.style.display = "";
        } else {
          entry.style.display = "none";
        }
      });
    });
  });
});
