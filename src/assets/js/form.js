document.addEventListener("DOMContentLoaded", function () {
  var forms = document.querySelectorAll("[data-ajax-form]");

  forms.forEach(function (form) {
    var notification = form.querySelector(".form-notification");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (form.classList.contains("form-sending")) return;
      form.classList.add("form-sending");

      if (notification) {
        notification.className = "form-notification";
        notification.style.display = "none";
      }

      var data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            if (notification) {
              notification.textContent = "Mensaje enviado correctamente. Gracias.";
              notification.className = "form-notification success";
              notification.style.display = "block";
            }
            form.reset();
          } else {
            throw new Error("Error en el envío");
          }
        })
        .catch(function () {
          if (notification) {
            notification.textContent = "Hubo un error. Inténtalo de nuevo.";
            notification.className = "form-notification error";
            notification.style.display = "block";
          }
        })
        .finally(function () {
          form.classList.remove("form-sending");
        });
    });
  });
});
