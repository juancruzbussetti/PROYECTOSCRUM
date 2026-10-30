  const opciones = document.querySelectorAll(".optionEntry");
  const spanCantidad = document.getElementById("cantidadEntradas");
  const btnMas = document.getElementById("btnMas");
  const btnMenos = document.getElementById("btnMenos");
  const btnContinuar = document.querySelector(".continueEntry");
  const centerOrder = document.querySelector(".centerOrder");
  const filaCargo = centerOrder.querySelector(".serviceCharge");

  const MIN = 1;
  const MAX = 10000;
  const CARGO = 0.05;
  let cantidad = 1;

  // $25.000 (puntos de miles, sin depender del locale del navegador)
  const formato = (n) =>
    "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  function alternar(opcion) {
    const activa = opcion.classList.toggle("activa");
    opcion.setAttribute("aria-checked", activa);
    actualizar();
  }

  opciones.forEach((opcion) => {
    opcion.addEventListener("click", () => alternar(opcion));
    opcion.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        alternar(opcion);
      }
    });
  });

  btnMas.addEventListener("click", () => {
    if (cantidad < MAX) cantidad++;
    actualizar();
  });

  btnMenos.addEventListener("click", () => {
    if (cantidad > MIN) cantidad--;
    actualizar();
  });

  function actualizar() {
    spanCantidad.textContent = cantidad;

    const seleccionadas = [...opciones].filter((o) =>
      o.classList.contains("activa")
    );

    // Borrar filas generadas antes
    centerOrder.querySelectorAll(".lineaEntrada").forEach((f) => f.remove());

    let subtotal = 0;

    if (seleccionadas.length === 0) {
      const fila = document.createElement("div");
      fila.className = "lineaEntrada";
      fila.innerHTML = "<span>Seleccioná una entrada</span><span>$0</span>";
      centerOrder.insertBefore(fila, filaCargo);
    }

    seleccionadas.forEach((o) => {
      const precio = Number(o.dataset.precio) * cantidad;
      subtotal += precio;

      const fila = document.createElement("div");
      fila.className = "lineaEntrada";
      fila.innerHTML = `
        <span>${cantidad} ${cantidad === 1 ? "entrada" : "entradas"} ${o.dataset.nombre}</span>
        <span>${formato(precio)}</span>`;
      centerOrder.insertBefore(fila, filaCargo);
    });

    const cargo = subtotal * CARGO;
    const total = subtotal + cargo;

    document.getElementById("cargoServicio").textContent = formato(cargo);
    document.getElementById("totalPedido").textContent = formato(total);

    // Modal de pago
    const nombres = seleccionadas.map((o) => o.dataset.nombre);
    document.getElementById("planNombre").textContent =
      nombres.join(" + ") || "Sin selección";
    document.getElementById("planTotal").textContent = formato(total);
    document.getElementById("planAviso").hidden = !nombres.includes("Early Bird");

    // Sin entradas no se puede continuar
    btnContinuar.disabled = seleccionadas.length === 0;
  }

  actualizar();
