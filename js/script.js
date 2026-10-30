// Fecha límite: 31/10 a las 23:59:59 (hora local del navegador)
// Mes 9 = octubre (los meses en JS van de 0 a 11)
const fechaLimite = new Date(2026, 9, 31, 0, 0, 0).getTime();

const elDias = document.getElementById("dias");
const elHoras = document.getElementById("horas");
const elMinutos = document.getElementById("minutos");

const pad = (n) => String(n).padStart(2, "0");

function actualizarContador() {
  const diferencia = fechaLimite - Date.now();

  // Si ya terminó, dejamos todo en cero y frenamos el intervalo
  if (diferencia <= 0) {
    elDias.textContent = "00";
    elHoras.textContent = "00";
    elMinutos.textContent = "00";
    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

  elDias.textContent = pad(dias);
  elHoras.textContent = pad(horas);
  elMinutos.textContent = pad(minutos);
}

actualizarContador(); // ejecuta una vez ya, sin esperar el primer segundo
const intervalo = setInterval(actualizarContador, 1000);