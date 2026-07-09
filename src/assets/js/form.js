document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form-contacto");
  if (!form) return;

  var notificacion = document.getElementById("form-notificacion");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.classList.contains("form-enviando")) return;
    form.classList.add("form-enviando");

    if (notificacion) {
      notificacion.className = "form-notificacion";
      notificacion.style.display = "none";
    }

    var datos = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: datos,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (res.ok) {
          if (notificacion) {
            notificacion.textContent = "Mensaje enviado correctamente. Gracias.";
            notificacion.className = "form-notificacion exito";
            notificacion.style.display = "block";
          }
          form.reset();
        } else {
          throw new Error("Error en el envío");
        }
      })
      .catch(function () {
        if (notificacion) {
          notificacion.textContent = "Hubo un error. Inténtalo de nuevo.";
          notificacion.className = "form-notificacion error";
          notificacion.style.display = "block";
        }
      })
      .finally(function () {
        form.classList.remove("form-enviando");
      });
  });
});
