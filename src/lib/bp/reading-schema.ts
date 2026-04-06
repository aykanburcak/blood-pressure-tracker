import { z } from 'zod';

/**
 * Validates manual reading entry before persistence.
 * - Systolic 70–250, diastolic 40–150, pulse 30–220 when provided
 * - Diastolic must be strictly less than systolic
 */
export const readingInputSchema = z
  .object({
    systolic: z.coerce.number().int().min(70).max(250),
    diastolic: z.coerce.number().int().min(40).max(150),
    pulse: z.coerce.number().int().min(30).max(220).optional().nullable(),
    measuredAt: z.coerce.date(),
  })
  .superRefine((data, ctx) => {
    if (data.diastolic >= data.systolic) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Diastolic must be lower than systolic.',
        path: ['diastolic'],
      });
    }
  });

export type ReadingInput = z.infer<typeof readingInputSchema>;
