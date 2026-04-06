import { classifyBloodPressure } from '@/lib/bp/who-classification';
import { INTERPRETATION_DISCLAIMER } from '@/lib/bp/medical-disclaimer';
import type { ReadingRow } from '@/lib/db/schema';

export type BpReportHtmlInput = {
  rows: ReadingRow[];
  rangeLabel: string;
  generatedAtMs: number;
};

export function buildBpReportHtml(input: BpReportHtmlInput): string {
  const { rows, rangeLabel, generatedAtMs } = input;
  const generatedLabel = new Date(generatedAtMs).toLocaleString();
  const count = rows.length;

  const bodyRows = rows
    .map((r) => {
      const who = classifyBloodPressure(r.systolic, r.diastolic);
      const when = new Date(r.measuredAt).toLocaleString();
      const pulseCell = r.pulse == null ? '—' : String(r.pulse);
      return `<tr><td>${escapeHtml(when)}</td><td>${r.systolic}</td><td>${r.diastolic}</td><td>${pulseCell}</td><td>${escapeHtml(who.label)}</td></tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
  body { font-family: sans-serif; color: #111827; padding: 16px; }
  h1 { font-size: 20px; }
  table { border-collapse: collapse; width: 100%; margin-top: 12px; }
  th, td { border: 1px solid #E5E7EB; padding: 8px; text-align: left; font-size: 13px; }
  th { background: #F9FAFB; }
  .muted { color: #6B7280; font-size: 13px; margin: 8px 0; }
  .disclaimer { font-size: 12px; color: #374151; margin: 12px 0; max-width: 40em; }
</style>
</head>
<body>
  <h1>Blood pressure report</h1>
  <p class="muted">Generated: ${escapeHtml(generatedLabel)}</p>
  <p class="muted">Range: ${escapeHtml(rangeLabel)}</p>
  <p class="muted">${count} reading${count === 1 ? '' : 's'}</p>
  <p class="disclaimer">${escapeHtml(INTERPRETATION_DISCLAIMER)}</p>
  <table>
    <thead>
      <tr><th>Date</th><th>Systolic</th><th>Diastolic</th><th>Pulse</th><th>Status</th></tr>
    </thead>
    <tbody>
      ${bodyRows}
    </tbody>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
