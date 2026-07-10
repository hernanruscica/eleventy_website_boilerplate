document.addEventListener("DOMContentLoaded", function () {
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
});
