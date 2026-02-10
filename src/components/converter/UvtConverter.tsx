import { useState, useMemo, useCallback } from 'react';
import ConversionInput, { type ActiveField } from './ConversionInput';
import YearSelector from './YearSelector';
import CopyButtons from './CopyButtons';
import FiscalAlerts from './FiscalAlerts';
import { getUvtValue, currentYear } from '../../data/uvt-config';
import { pesosToUvt, uvtToPesos } from '../../lib/conversion';

export default function UvtConverter() {
  const [pesos, setPesos] = useState(0);
  const [uvt, setUvt] = useState(0);
  const [activeField, setActiveField] = useState<ActiveField>('pesos');
  const [selectedYear, setSelectedYear] = useState(currentYear.year);

  const uvtValue = useMemo(() => getUvtValue(selectedYear), [selectedYear]);

  const handlePesosChange = useCallback(
    (value: number) => {
      setActiveField('pesos');
      setPesos(value);
      setUvt(pesosToUvt(value, uvtValue));
    },
    [uvtValue]
  );

  const handleUvtChange = useCallback(
    (value: number) => {
      setActiveField('uvt');
      setUvt(value);
      setPesos(Math.round(uvtToPesos(value, uvtValue)));
    },
    [uvtValue]
  );

  const handleYearChange = useCallback(
    (year: number) => {
      setSelectedYear(year);
      const newUvtValue = getUvtValue(year);
      if (activeField === 'pesos') {
        setUvt(pesosToUvt(pesos, newUvtValue));
      } else {
        setPesos(Math.round(uvtToPesos(uvt, newUvtValue)));
      }
    },
    [activeField, pesos, uvt]
  );

  return (
    <div className="bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-converter)] border border-[var(--color-border)] p-6 sm:p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary)]">
          Convertidor UVT {selectedYear}
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Ingresa en cualquier campo y el otro se calcula automáticamente
        </p>
      </div>

      <YearSelector
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <ConversionInput
        pesos={pesos}
        uvt={uvt}
        activeField={activeField}
        onPesosChange={handlePesosChange}
        onUvtChange={handleUvtChange}
      />

      <CopyButtons pesos={pesos} uvt={uvt} />

      <FiscalAlerts uvtAmount={uvt} uvtValue={uvtValue} />
    </div>
  );
}
