export interface TopeRenta {
  concepto: string;
  uvt: number;
  descripcion: string;
}

export const topesRenta2026: TopeRenta[] = [
  {
    concepto: 'Ingresos brutos',
    uvt: 1400,
    descripcion:
      'Personas naturales con ingresos brutos iguales o superiores a 1.400 UVT deben declarar renta.',
  },
  {
    concepto: 'Patrimonio bruto',
    uvt: 4500,
    descripcion:
      'Personas naturales con patrimonio bruto superior a 4.500 UVT al cierre del año gravable.',
  },
  {
    concepto: 'Compras y consumos',
    uvt: 1400,
    descripcion:
      'Compras y consumos con tarjeta de crédito o cualquier medio iguales o superiores a 1.400 UVT.',
  },
  {
    concepto: 'Consignaciones bancarias',
    uvt: 1400,
    descripcion:
      'Consignaciones bancarias, depósitos o inversiones financieras iguales o superiores a 1.400 UVT.',
  },
  {
    concepto: 'Responsable de IVA',
    uvt: 3500,
    descripcion:
      'Ingresos brutos provenientes de actividades gravadas superiores a 3.500 UVT.',
  },
  {
    concepto: 'Régimen Simple (ingresos máx.)',
    uvt: 100000,
    descripcion:
      'Límite de ingresos brutos anuales para pertenecer al Régimen Simple de Tributación.',
  },
];
