import { readingInputSchema } from '../reading-schema';

describe('readingInputSchema', () => {
  const validDate = new Date('2026-04-06T12:00:00.000Z');

  it('accepts typical valid reading without pulse', () => {
    const r = readingInputSchema.safeParse({
      systolic: 120,
      diastolic: 80,
      pulse: undefined,
      measuredAt: validDate,
    });
    expect(r.success).toBe(true);
  });

  it('rejects empty systolic (coerced below minimum)', () => {
    const r = readingInputSchema.safeParse({
      systolic: '',
      diastolic: 80,
      measuredAt: validDate,
    });
    expect(r.success).toBe(false);
  });

  it('rejects diastolic greater than or equal to systolic', () => {
    const r = readingInputSchema.safeParse({
      systolic: 120,
      diastolic: 120,
      measuredAt: validDate,
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.flatten().fieldErrors.diastolic?.length).toBeGreaterThan(0);
    }
  });

  it('rejects systolic below 70', () => {
    const r = readingInputSchema.safeParse({
      systolic: 69,
      diastolic: 50,
      measuredAt: validDate,
    });
    expect(r.success).toBe(false);
  });

  it('rejects pulse below 30 when provided', () => {
    const r = readingInputSchema.safeParse({
      systolic: 120,
      diastolic: 80,
      pulse: 10,
      measuredAt: validDate,
    });
    expect(r.success).toBe(false);
  });
});
