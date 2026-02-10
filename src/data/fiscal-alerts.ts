export type AlertSeverity = 'red' | 'orange' | 'yellow';

export interface FiscalAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  thresholdUvt: number;
  condition: 'below' | 'above';
  reference: string;
}

export const fiscalAlerts: FiscalAlert[] = [
  {
    id: 'sancion-minima',
    severity: 'red',
    title: 'Sanción mínima DIAN',
    description:
      'El valor ingresado es inferior a 10 UVT, que es la sanción mínima aplicable según el Art. 639 del Estatuto Tributario.',
    thresholdUvt: 10,
    condition: 'below',
    reference: 'Art. 639 E.T.',
  },
  {
    id: 'responsable-iva',
    severity: 'orange',
    title: 'Responsable de IVA',
    description:
      'El valor supera 3.500 UVT de ingresos brutos, umbral para ser responsable del IVA (régimen común). Debe inscribirse como responsable de IVA.',
    thresholdUvt: 3500,
    condition: 'above',
    reference: 'Art. 437 E.T. / Parágrafo 3',
  },
  {
    id: 'retencion-fuente',
    severity: 'yellow',
    title: 'Retención en la fuente',
    description:
      'El valor supera 27 UVT, base mínima para retención en la fuente por compras. Verifique la base aplicable según el concepto.',
    thresholdUvt: 27,
    condition: 'above',
    reference: 'Art. 383 y ss. E.T.',
  },
];

export function evaluateAlerts(
  uvtAmount: number
): FiscalAlert[] {
  return fiscalAlerts.filter((alert) => {
    if (alert.condition === 'below') {
      return uvtAmount > 0 && uvtAmount < alert.thresholdUvt;
    }
    return uvtAmount >= alert.thresholdUvt;
  });
}
