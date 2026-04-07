import { getInterpretationColor } from '@/lib/bp/interpretation-style';

import type { WhoBpCategory } from './who-classification';

/** Soft WHO chip fill — text stays `colors.textPrimary` (Stitch: text is hero). */
const CHIP_FILL_ALPHA = 0.2;

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) {
    return hex;
  }
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function getInterpretationChipBackground(category: WhoBpCategory): string {
  return hexToRgba(getInterpretationColor(category), CHIP_FILL_ALPHA);
}
