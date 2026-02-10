import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { writeFileSync } from 'fs';

const UVT_2026 = 52374;
const fmt = (n) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

// --- Header ---
doc.setFillColor(37, 42, 52); // secondary
doc.rect(0, 0, 216, 35, 'F');
doc.setTextColor(8, 217, 214); // primary
doc.setFontSize(18);
doc.setFont('helvetica', 'bold');
doc.text('Nexo UVT', 15, 16);
doc.setTextColor(255, 255, 255);
doc.setFontSize(14);
doc.text('Tabla de Retención en la Fuente 2026', 15, 27);
doc.setFontSize(9);
doc.text(`UVT 2026: ${fmt(UVT_2026)}`, 165, 16);
doc.text('nexouvt.cloution.cloud', 165, 24);

// --- Tabla principal: Retención en la fuente ---
doc.setTextColor(37, 42, 52);
doc.setFontSize(12);
doc.setFont('helvetica', 'bold');
doc.text('Retención en la Fuente por Conceptos - 2026', 15, 45);

const retencionData = [
  ['Compras generales', 27, 2.5, 'Art. 401 E.T.'],
  ['Compras con tarjeta débito/crédito', 0, 1.5, 'Art. 401-1 E.T.'],
  ['Servicios generales', 4, 4, 'Art. 392 E.T.'],
  ['Servicios de restaurante y hotel', 4, 3.5, 'Art. 392 E.T.'],
  ['Arrendamiento bienes muebles', 0, 4, 'Art. 401 E.T.'],
  ['Arrendamiento bienes inmuebles', 27, 3.5, 'Art. 401 E.T.'],
  ['Honorarios y comisiones (declarante)', 0, 11, 'Art. 392 E.T.'],
  ['Honorarios y comisiones (no declarante)', 0, 10, 'Art. 392 E.T.'],
  ['Consultoría (declarante)', 0, 11, 'Art. 392 E.T.'],
  ['Consultoría (no declarante)', 0, 10, 'Art. 392 E.T.'],
  ['Servicios de transporte de carga', 4, 1, 'Art. 401-1 E.T.'],
  ['Servicios de transporte nacional de pasajeros', 27, 3.5, 'Art. 401-1 E.T.'],
  ['Servicios temporales (empresa temporal)', 4, 1, 'Art. 401-1 E.T.'],
  ['Servicios de aseo y vigilancia', 4, 2, 'Art. 401-1 E.T.'],
  ['Contratos de construcción', 27, 2, 'Art. 401-1 E.T.'],
  ['Compra de combustibles', 0, 0.1, 'Art. 401-1 E.T.'],
  ['Rendimientos financieros', 0, 7, 'Art. 395 E.T.'],
  ['Loterías, rifas y apuestas', 48, 20, 'Art. 404-1 E.T.'],
  ['Enajenación de activos fijos (P.N.)', 0, 1, 'Art. 398 E.T.'],
  ['Otros ingresos tributarios (declarante)', 27, 2.5, 'Art. 401 E.T.'],
  ['Otros ingresos tributarios (no declarante)', 27, 3.5, 'Art. 401 E.T.'],
];

autoTable(doc, {
  startY: 50,
  head: [['Concepto', 'Base (UVT)', 'Base (Pesos)', 'Tarifa', 'Norma']],
  body: retencionData.map(([concepto, baseUvt, tarifa, norma]) => [
    concepto,
    baseUvt === 0 ? '100%' : baseUvt.toString(),
    baseUvt === 0 ? '100% del pago' : fmt(baseUvt * UVT_2026),
    `${tarifa}%`,
    norma,
  ]),
  styles: { fontSize: 7.5, cellPadding: 2.5 },
  headStyles: { fillColor: [8, 217, 214], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
  alternateRowStyles: { fillColor: [248, 250, 251] },
  columnStyles: {
    0: { cellWidth: 52 },
    1: { cellWidth: 17, halign: 'center' },
    2: { cellWidth: 33, halign: 'right' },
    3: { cellWidth: 14, halign: 'center' },
    4: { cellWidth: 28 },
  },
  margin: { left: 15, right: 20 },
  tableWidth: 'wrap',
});

// --- Tabla de retención asalariados ---
let y = doc.lastAutoTable.finalY + 12;
doc.setFontSize(12);
doc.setFont('helvetica', 'bold');
doc.text('Retención en la Fuente - Rentas de Trabajo (Asalariados)', 15, y);

const asalariadosData = [
  ['>0 hasta 95', 0, '0%'],
  ['>95 hasta 150', 95, '19%'],
  ['>150 hasta 360', 150, '28%'],
  ['>360 hasta 640', 360, '33%'],
  ['>640 hasta 945', 640, '35%'],
  ['>945 hasta 2300', 945, '37%'],
  ['>2300 en adelante', 2300, '39%'],
];

autoTable(doc, {
  startY: y + 5,
  head: [['Rango en UVT', 'Desde (Pesos)', 'Tarifa marginal']],
  body: asalariadosData.map(([rango, desde, tarifa]) => [
    rango,
    fmt(desde * UVT_2026),
    tarifa,
  ]),
  styles: { fontSize: 8, cellPadding: 2.5 },
  headStyles: { fillColor: [8, 217, 214], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 },
  alternateRowStyles: { fillColor: [248, 250, 251] },
  columnStyles: {
    0: { cellWidth: 45 },
    1: { cellWidth: 45, halign: 'right' },
    2: { cellWidth: 35, halign: 'center' },
  },
  margin: { left: 15, right: 20 },
  tableWidth: 'wrap',
});

// --- Sanciones comunes ---
y = doc.lastAutoTable.finalY + 12;

if (y > 230) {
  doc.addPage();
  y = 20;
}

doc.setFontSize(12);
doc.setFont('helvetica', 'bold');
doc.text('Sanciones Tributarias Comunes 2026', 15, y);

const sancionesData = [
  ['Sanción mínima', 10],
  ['Extemporaneidad declaración renta (mes/fracción)', 5],
  ['Sanción por no declarar - Renta', 20],
  ['Sanción por corrección (voluntaria)', 10],
  ['No informar (información exógena)', 15],
  ['Irregularidades en contabilidad', 20],
  ['Clausura establecimiento', 10],
  ['No expedir factura', 1],
  ['No inscribirse en RUT', 1],
  ['No actualizar RUT', 1],
];

autoTable(doc, {
  startY: y + 5,
  head: [['Concepto', 'UVT', 'Pesos 2026']],
  body: sancionesData.map(([concepto, uvt]) => [
    concepto,
    uvt.toString(),
    fmt(uvt * UVT_2026),
  ]),
  styles: { fontSize: 8, cellPadding: 2.5 },
  headStyles: { fillColor: [37, 42, 52], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8.5 },
  alternateRowStyles: { fillColor: [248, 250, 251] },
  columnStyles: {
    0: { cellWidth: 70 },
    1: { cellWidth: 20, halign: 'center' },
    2: { cellWidth: 35, halign: 'right' },
  },
  margin: { left: 15, right: 20 },
  tableWidth: 'wrap',
});

// --- Footer ---
const pageCount = doc.getNumberOfPages();
for (let i = 1; i <= pageCount; i++) {
  doc.setPage(i);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Fuente: Estatuto Tributario de Colombia. Valores calculados con UVT 2026 = $52.374. Uso informativo, consulte con un profesional contable.',
    108,
    272,
    { align: 'center' }
  );
  doc.text(`nexouvt.cloution.cloud  ·  Nexo © 2026  ·  Página ${i} de ${pageCount}`, 108, 277, {
    align: 'center',
  });
}

// --- Save ---
const buffer = doc.output('arraybuffer');
writeFileSync('public/pdf/tabla-retencion-fuente-2026.pdf', Buffer.from(buffer));
console.log('PDF generado: public/pdf/tabla-retencion-fuente-2026.pdf');
