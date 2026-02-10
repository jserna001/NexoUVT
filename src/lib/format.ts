const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('es-CO', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatRawNumber(value: number): string {
  return Math.round(value).toString();
}

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^\d]/g, '');
  return parseInt(cleaned) || 0;
}
