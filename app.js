document.addEventListener("DOMContentLoaded", function () {
  const botonCrear = document.querySelector(".form-boton");
  const contenedorNotas = document.getElementById("form-notas");

  // Función (refrescar página)
  cargarNotas();

  // Crear nota
  botonCrear.addEventListener("click", function () {
    // Obtener texto desde el textbox
    const textoNota = document.querySelector(".form-caja").value;

    if (textoNota !== "") {
      // Crear nuevo elemento en nota
      const nuevaNota = document.createElement("div");
      nuevaNota.textContent = textoNota;
      nuevaNota.classList.add("notas"); // Añadir estilos

      // Crear botón Borrar para la nueva nota
      const botonBorrar = document.createElement("boton");
      botonBorrar.textContent = "Borrar";
      botonBorrar.classList.add("boton-borrar");

      botonBorrar.addEventListener("click", function () {
        nuevaNota.remove();

        // Guardar notas actualizadas
        guardarNotas();
      });

      // Adjuntar botón Borrar a cada nota
      nuevaNota.appendChild(botonBorrar);
      // Añadir nueva Nota
      contenedorNotas.appendChild(nuevaNota);
      // Guardar nueva nota
      guardarNotas();
      // Limpia el textbox
      document.querySelector(".form-caja").value = "";
    }
  });

  // Cargar notas almacenadas al refrescar la página
  function cargarNotas() {
    const notasAlmacenadas = JSON.parse(localStorage.getItem("notas"));

    // Verificar notas almacenadas
    if (notasAlmacenadas) {
      notasAlmacenadas.forEach(function (notaTexto) {
        const nuevaNota = document.createElement("div");
        nuevaNota.textContent = notaTexto;
        nuevaNota.classList.add("notas");

        const botonBorrar = document.createElement("boton");
        botonBorrar.textContent = "Borrar";
        botonBorrar.classList.add("boton-borrar");
        botonBorrar.addEventListener("click", function () {
          nuevaNota.remove();
          guardarNotas();
        });

        nuevaNota.appendChild(botonBorrar);
        contenedorNotas.appendChild(nuevaNota);
      });
    }
  }

  // Guardar el texto de cada nota en un array
  function guardarNotas() {
    const notes = document.querySelectorAll(".notas");
    const textoNotas = [];
    notes.forEach(function (note) {
      // Elimina últimos 6 caracteres para que no se guarde la palabra Borrar en cada nota
      var contenidoNota = note.textContent;
      contenidoNota = contenidoNota.substring(0, contenidoNota.length - 6);
      textoNotas.push(contenidoNota);
    });
    localStorage.setItem("notas", JSON.stringify(textoNotas));
  }
});
