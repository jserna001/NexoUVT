import { formatCurrency, formatNumber } from '../../lib/format';
import type { ConversionMode } from './ConversionInput';

interface ConversionResultProps {
  result: number;
  mode: ConversionMode;
}

export default function ConversionResult({
  result,
  mode,
}: ConversionResultProps) {
  if (result === 0) {
    return (
      <div className="text-center py-6 text-[var(--color-text-muted)]">
        <p className="text-lg">Ingrese un valor para convertir</p>
      </div>
    );
  }

  const label = mode === 'pesos' ? 'Equivalente en UVT' : 'Equivalente en Pesos';
  const formattedResult =
    mode === 'pesos' ? `${formatNumber(result)} UVT` : formatCurrency(result);

  return (
    <div className="text-center py-6">
      <p className="text-sm font-medium text-[var(--color-text-muted)] mb-2">
        {label}
      </p>
      <p className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)]">
        {formattedResult}
      </p>
    </div>
  );
}
