export interface Sancion {
  concepto: string;
  uvt: number;
  norma: string;
}

export const sanciones2026: Sancion[] = [
  {
    concepto: 'Sanción mínima',
    uvt: 10,
    norma: 'Art. 639 E.T.',
  },
  {
    concepto: 'Extemporaneidad en declaración de renta (por mes o fracción)',
    uvt: 5,
    norma: 'Art. 641 E.T.',
  },
  {
    concepto: 'Sanción por no declarar - Renta',
    uvt: 20,
    norma: 'Art. 643 E.T.',
  },
  {
    concepto: 'Sanción por corrección (voluntaria)',
    uvt: 10,
    norma: 'Art. 644 E.T.',
  },
  {
    concepto: 'Sanción por no informar (información exógena)',
    uvt: 15,
    norma: 'Art. 651 E.T.',
  },
  {
    concepto: 'Sanción por irregularidades en contabilidad',
    uvt: 20,
    norma: 'Art. 655 E.T.',
  },
  {
    concepto: 'Sanción clausura establecimiento',
    uvt: 10,
    norma: 'Art. 657 E.T.',
  },
  {
    concepto: 'Sanción por no expedir factura',
    uvt: 1,
    norma: 'Art. 652 E.T.',
  },
  {
    concepto: 'Sanción por no inscribirse en RUT',
    uvt: 1,
    norma: 'Art. 658-3 E.T.',
  },
  {
    concepto: 'Sanción por no actualizar RUT',
    uvt: 1,
    norma: 'Art. 658-3 E.T.',
  },
];
