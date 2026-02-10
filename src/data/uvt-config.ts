export interface UvtYear {
  year: number;
  value: number;
  resolution: string;
}

export const uvtYears: UvtYear[] = [
  {
    year: 2026,
    value: 52374,
    resolution: 'Resolución DIAN No. 000187 del 14 de noviembre de 2025',
  },
  {
    year: 2025,
    value: 49799,
    resolution: 'Resolución DIAN No. 000165 del 20 de noviembre de 2024',
  },
  {
    year: 2024,
    value: 47065,
    resolution: 'Resolución DIAN No. 001264 del 21 de noviembre de 2023',
  },
];

export const currentYear = uvtYears[0];

export function getUvtValue(year: number): number {
  const found = uvtYears.find((y) => y.year === year);
  return found?.value ?? currentYear.value;
}
