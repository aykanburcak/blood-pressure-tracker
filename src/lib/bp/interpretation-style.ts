import { colors } from '@/lib/theme/tokens';

import type { WhoBpCategory } from './who-classification';

const map: Record<WhoBpCategory, string> = {
  normal: colors.interpretNormal,
  elevated: colors.interpretElevated,
  stage1: colors.interpretStage1,
  stage2: colors.interpretStage2,
  crisis: colors.interpretCrisis,
};

export function getInterpretationColor(category: WhoBpCategory): string {
  return map[category];
}
