import { useCallback, useRef, useEffect } from 'react';
import { formatCurrency, parseCurrencyInput, formatNumber } from '../../lib/format';

export type ActiveField = 'pesos' | 'uvt';

interface ConversionInputProps {
  pesos: number;
  uvt: number;
  activeField: ActiveField;
  onPesosChange: (value: number) => void;
  onUvtChange: (value: number) => void;
}

export default function ConversionInput({
  pesos,
  uvt,
  activeField,
  onPesosChange,
  onUvtChange,
}: ConversionInputProps) {
  const pesosRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pesosRef.current?.focus();
  }, []);

  const handlePesosChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onPesosChange(parseCurrencyInput(e.target.value));
    },
    [onPesosChange]
  );

  const handleUvtChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const cleaned = e.target.value.replace(/[^\d.,]/g, '').replace(',', '.');
      const parsed = parseFloat(cleaned);
      onUvtChange(isNaN(parsed) ? 0 : parsed);
    },
    [onUvtChange]
  );

  const pesosDisplay = pesos === 0 && activeField !== 'pesos' ? '' : pesos === 0 ? '' : formatCurrency(pesos);
  const uvtDisplay = uvt === 0 && activeField !== 'uvt' ? '' : uvt === 0 ? '' : activeField === 'uvt' ? uvt.toString() : formatNumber(uvt);

  return (
    <div className="space-y-4">
      {/* Pesos field */}
      <div className="space-y-2">
        <label htmlFor="pesos-input" className="block text-sm font-medium text-[var(--color-text-muted)]">
          Pesos colombianos
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[var(--color-text-muted)]">$</span>
          <input
            ref={pesosRef}
            id="pesos-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pesosDisplay}
            onChange={handlePesosChange}
            onFocus={() => onPesosChange(pesos)}
            placeholder="0"
            className="w-full text-2xl sm:text-3xl font-bold py-4 pl-10 pr-5 border-2 border-[var(--color-border)] rounded-[var(--radius-lg)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all bg-white text-[var(--color-text)]"
            aria-label="Valor en pesos colombianos"
          />
        </div>
      </div>

      {/* Arrow separator */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
          <span className="text-xs font-semibold tracking-wide">EQUIVALE A</span>
          <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>

      {/* UVT field */}
      <div className="space-y-2">
        <label htmlFor="uvt-input" className="block text-sm font-medium text-[var(--color-text-muted)]">
          Unidades de Valor Tributario (UVT)
        </label>
        <div className="relative">
          <input
            id="uvt-input"
            type="text"
            inputMode="decimal"
            value={uvtDisplay}
            onChange={handleUvtChange}
            onFocus={() => onUvtChange(uvt)}
            placeholder="0"
            className="w-full text-2xl sm:text-3xl font-bold py-4 px-5 pr-20 border-2 border-[var(--color-border)] rounded-[var(--radius-lg)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all bg-white text-[var(--color-text)]"
            aria-label="Valor en UVT"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--color-text-muted)]">UVT</span>
        </div>
      </div>
    </div>
  );
}
