import { INTERPRETATION_DISCLAIMER } from '@/lib/bp/medical-disclaimer';

import { buildBpReportHtml } from '../bp-report-html';

describe('buildBpReportHtml', () => {
  it('includes title, disclaimer, headers, and systolic value', () => {
    const html = buildBpReportHtml({
      rows: [
        {
          id: 'r1',
          systolic: 122,
          diastolic: 78,
          pulse: null,
          measuredAt: 1_700_000_000_000,
          createdAt: 1_700_000_000_000,
        },
      ],
      rangeLabel: 'Last 30 days',
      generatedAtMs: 1_700_000_100_000,
    });

    expect(html).toContain('Blood pressure report');
    expect(html).toContain(INTERPRETATION_DISCLAIMER);
    expect(html).toContain('Date');
    expect(html).toContain('Systolic');
    expect(html).toContain('Diastolic');
    expect(html).toContain('Pulse');
    expect(html).toContain('Status');
    expect(html).toContain('122');
    expect(html).toContain('#1A1C1F');
    expect(html).toContain('#F3F3F8');
    expect(html).not.toContain('#111827');
    expect(html).not.toContain('#F9FAFB');
  });
});
