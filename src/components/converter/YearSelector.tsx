import { uvtYears } from '../../data/uvt-config';
import { formatCurrency } from '../../lib/format';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export default function YearSelector({
  selectedYear,
  onYearChange,
}: YearSelectorProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="year-selector"
        className="block text-sm font-medium text-[var(--color-text-muted)]"
      >
        Año fiscal
      </label>
      <select
        id="year-selector"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="w-full px-4 py-3 border-2 border-[var(--color-border)] rounded-[var(--radius-md)] bg-white text-[var(--color-text)] font-medium focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all cursor-pointer"
      >
        {uvtYears.map((y) => (
          <option key={y.year} value={y.year}>
            {y.year} ({formatCurrency(y.value)}/UVT)
          </option>
        ))}
      </select>
    </div>
  );
}
