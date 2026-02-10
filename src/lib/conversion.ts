export function pesosToUvt(pesos: number, uvtValue: number): number {
  if (uvtValue === 0) return 0;
  return pesos / uvtValue;
}

export function uvtToPesos(uvt: number, uvtValue: number): number {
  return uvt * uvtValue;
}
