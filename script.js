const form = document.getElementById('colada-form');
const tablaBody = document.querySelector('#tabla-coladas tbody');
const totalPeso = document.getElementById('total-peso');
const totalBorax = document.getElementById('total-borax');
const totalNitrato = document.getElementById('total-nitrato');
const totalCarbonato = document.getElementById('total-carbonato');
const totalSilice = document.getElementById('total-silice');
const totalFluorita = document.getElementById('total-fluorita');
const btnReiniciar = document.getElementById('reiniciar');

let totales = {
  peso: 0,
  borax: 0,
  nitrato: 0,
  carbonato: 0,
  silice: 0,
  fluorita: 0
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const colada = document.getElementById('colada').value;
  const peso = parseFloat(document.getElementById('peso').value);
  const boraxPct = parseFloat(document.getElementById('borax').value);
  const nitratoPct = parseFloat(document.getElementById('nitrato').value);
  const carbonatoPct = parseFloat(document.getElementById('carbonato').value);
  const silicePct = parseFloat(document.getElementById('silice').value);
  const fluoritaPct = parseFloat(document.getElementById('fluorita').value);

  const borax = peso * boraxPct / 100;
  const nitrato = peso * nitratoPct / 100;
  const carbonato = peso * carbonatoPct / 100;
  const silice = peso * silicePct / 100;
  const fluorita = peso * fluoritaPct / 100;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${colada}</td>
    <td>${peso.toFixed(2)}</td>
    <td>${borax.toFixed(2)}</td>
    <td>${nitrato.toFixed(2)}</td>
    <td>${carbonato.toFixed(2)}</td>
    <td>${silice.toFixed(2)}</td>
    <td>${fluorita.toFixed(2)}</td>
  `;
  tablaBody.appendChild(row);

  totales.peso += peso;
  totales.borax += borax;
  totales.nitrato += nitrato;
  totales.carbonato += carbonato;
  totales.silice += silice;
  totales.fluorita += fluorita;

  totalPeso.textContent = totales.peso.toFixed(2);
  totalBorax.textContent = totales.borax.toFixed(2);
  totalNitrato.textContent = totales.nitrato.toFixed(2);
  totalCarbonato.textContent = totales.carbonato.toFixed(2);
  totalSilice.textContent = totales.silice.toFixed(2);
  totalFluorita.textContent = totales.fluorita.toFixed(2);

  form.reset();
});

btnReiniciar.addEventListener('click', () => {
  tablaBody.innerHTML = '';
  totales = { peso: 0, borax: 0, nitrato: 0, carbonato: 0, silice: 0, fluorita: 0 };
  totalPeso.textContent = '0';
  totalBorax.textContent = '0';
  totalNitrato.textContent = '0';
  totalCarbonato.textContent = '0';
  totalSilice.textContent = '0';
  totalFluorita.textContent = '0';
});

// Agregar firma con link al pie
const firma = document.querySelector('.firma');
if (firma) {
  firma.innerHTML += ' | <a href="https://guanaco297.github.io/Fundentes-calculadora/" target="_blank">Ver App Online</a>';
}

// Cambiar texto del label en el formulario
const labelColada = document.querySelector('label[for="colada"]');
if (labelColada) labelColada.innerHTML = 'N° de Carro: <input type="text" id="colada" required>';

// Cambiar encabezado de la tabla a "Carro"
document.addEventListener('DOMContentLoaded', () => {
  const ths = document.querySelectorAll('#tabla-coladas thead th');
  if (ths.length > 0) ths[0].textContent = 'Carro';

  // Cambiar texto en la guía de uso
  const guia = document.querySelector('.guia');
  if (guia) {
    guia.innerHTML = guia.innerHTML.replace(/colada/gi, 'carro').replace(/Colada/gi, 'Carro');
  }

  // Crear botón para exportar a CSV
  const exportBtn = document.createElement('button');
  exportBtn.innerHTML = '📄 Exportar CSV';
  exportBtn.style.marginTop = '1rem';
  exportBtn.addEventListener('click', () => {
    const rows = document.querySelectorAll('#tabla-coladas tr');
    let csv = '';
    rows.forEach(row => {
      const cols = row.querySelectorAll('td, th');
      const line = Array.from(cols).map(col => col.innerText).join(',');
      csv += line + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resumen_turno.csv';
    link.click();
  });

  const exportPDFBtn = document.createElement('button');
  exportPDFBtn.innerHTML = '🖨️ Exportar PDF';
  exportPDFBtn.style.marginTop = '1rem';
  exportPDFBtn.style.marginLeft = '1rem';
  exportPDFBtn.addEventListener('click', () => {
    const printContent = document.querySelector('.resumen');
    const ventana = window.open('', '', 'height=600,width=800');
    ventana.document.write('<html><head><title>Resumen del Turno</title>');
    ventana.document.write('<style>body{font-family:sans-serif;padding:20px;} table{width:100%;border-collapse:collapse;} th, td{border:1px solid #000;padding:8px;text-align:center;}</style>');
    ventana.document.write('</head><body>');
    ventana.document.write(printContent.innerHTML);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
  });

  const resumenSection = document.querySelector('.resumen');
  if (resumenSection) {
    resumenSection.appendChild(exportBtn);
    resumenSection.appendChild(exportPDFBtn);
  }
});
