import { useState, useCallback } from 'react';
import { formatCurrency } from '../../lib/format';

interface CopyButtonsProps {
  pesos: number;
  uvt: number;
}

export default function CopyButtons({ pesos, uvt }: CopyButtonsProps) {
  const [copiedType, setCopiedType] = useState<'pesos' | 'uvt' | null>(null);

  const copyToClipboard = useCallback(
    async (type: 'pesos' | 'uvt') => {
      const text =
        type === 'pesos'
          ? formatCurrency(pesos)
          : `${uvt % 1 === 0 ? uvt.toString() : uvt.toFixed(2)} UVT`;

      try {
        await navigator.clipboard.writeText(text);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
      }
    },
    [pesos, uvt]
  );

  if (pesos === 0 && uvt === 0) return null;

  return (
    <div className="flex gap-3 justify-center">
      <button
        type="button"
        onClick={() => copyToClipboard('pesos')}
        className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer"
      >
        {copiedType === 'pesos' ? 'Copiado!' : 'Copiar pesos'}
      </button>
      <button
        type="button"
        onClick={() => copyToClipboard('uvt')}
        className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] border border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer"
      >
        {copiedType === 'uvt' ? 'Copiado!' : 'Copiar UVT'}
      </button>
    </div>
  );
}
