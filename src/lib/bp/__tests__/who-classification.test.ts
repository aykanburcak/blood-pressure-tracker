import { classifyBloodPressure } from '../who-classification';

describe('classifyBloodPressure', () => {
  it.each([
    [119, 79, 'normal', 'Normal'],
    [120, 79, 'elevated', 'Elevated'],
    [129, 79, 'elevated', 'Elevated'],
    [130, 79, 'stage1', 'High blood pressure (Stage 1)'],
    [139, 89, 'stage1', 'High blood pressure (Stage 1)'],
    [140, 89, 'stage2', 'High blood pressure (Stage 2)'],
    [180, 90, 'crisis', 'Hypertensive crisis'],
    [120, 120, 'crisis', 'Hypertensive crisis'],
  ] as const)('classifies (%i, %i) as %s', (s, d, category, label) => {
    const r = classifyBloodPressure(s, d);
    expect(r.category).toBe(category);
    expect(r.label).toBe(label);
  });
});
