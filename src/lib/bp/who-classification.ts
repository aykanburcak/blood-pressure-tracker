export type WhoBpCategory = 'normal' | 'elevated' | 'stage1' | 'stage2' | 'crisis';

export type WhoClassification = {
  category: WhoBpCategory;
  label: string;
};

/**
 * Adult office-style BP categories. Precedence: crisis → stage2 → stage1 → elevated → normal.
 */
export function classifyBloodPressure(systolic: number, diastolic: number): WhoClassification {
  if (systolic >= 180 || diastolic >= 120) {
    return { category: 'crisis', label: 'Hypertensive crisis' };
  }
  if (systolic >= 140 || diastolic >= 90) {
    return { category: 'stage2', label: 'High blood pressure (Stage 2)' };
  }
  if (systolic >= 130 || diastolic >= 80) {
    return { category: 'stage1', label: 'High blood pressure (Stage 1)' };
  }
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return { category: 'elevated', label: 'Elevated' };
  }
  return { category: 'normal', label: 'Normal' };
}
