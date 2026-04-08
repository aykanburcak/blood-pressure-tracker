/**
 * Extended BP chart bands for Home bar colors.
 * Thresholds: `.planning/REQUIREMENTS.md` (Appendix: Blood Pressure Chart bands).
 */

import {colors} from '@/lib/theme'

export type BpChartBandId =
  | 'crisis'
  | 'stage4'
  | 'stage3'
  | 'stage2'
  | 'preHypertension'
  | 'normal'
  | 'moderateHypo'
  | 'severeHypo'
  | 'extremeHypo'

function inRange(v: number, min: number, max: number): boolean {
  return v >= min && v <= max
}

/** Higher = worse (for max of systolic-only vs diastolic-only ranks). */
const rankToBand = (r: number): BpChartBandId => {
  if (r >= 8) {
    return 'crisis'
  }
  if (r === 7) {
    return 'stage4'
  }
  if (r === 6) {
    return 'stage3'
  }
  if (r === 5) {
    return 'stage2'
  }
  if (r === 4) {
    return 'preHypertension'
  }
  if (r === 3) {
    return 'extremeHypo'
  }
  if (r === 2) {
    return 'severeHypo'
  }
  if (r === 1) {
    return 'moderateHypo'
  }
  return 'normal'
}

function rankFromSystolic(s: number): number {
  if (s > 210) {
    return 8
  }
  if (inRange(s, 180, 210)) {
    return 7
  }
  if (inRange(s, 160, 179)) {
    return 6
  }
  if (inRange(s, 140, 159)) {
    return 5
  }
  if (inRange(s, 130, 139)) {
    return 4
  }
  if (inRange(s, 121, 129)) {
    return 0
  }
  if (inRange(s, 100, 120)) {
    return 0
  }
  if (inRange(s, 90, 99)) {
    return 0
  }
  if (inRange(s, 70, 89)) {
    return 1
  }
  if (inRange(s, 50, 69)) {
    return 2
  }
  if (s < 50) {
    return 3
  }
  return 0
}

function rankFromDiastolic(d: number): number {
  if (d > 120) {
    return 8
  }
  if (inRange(d, 110, 120)) {
    return 7
  }
  if (inRange(d, 100, 109)) {
    return 6
  }
  if (inRange(d, 90, 99)) {
    return 5
  }
  if (inRange(d, 85, 89)) {
    return 4
  }
  if (inRange(d, 81, 84)) {
    return 0
  }
  if (inRange(d, 65, 80)) {
    return 0
  }
  if (inRange(d, 60, 64)) {
    return 0
  }
  if (inRange(d, 40, 59)) {
    return 1
  }
  if (inRange(d, 35, 39)) {
    return 2
  }
  if (d < 35) {
    return 3
  }
  return 0
}

/**
 * Classify a reading into a bar-fill band (extended chart, not WHO chip copy).
 */
export function getBpChartBand(systolic: number, diastolic: number): BpChartBandId {
  const s = systolic
  const d = diastolic

  if (s > 210 || d > 120) {
    return 'crisis'
  }
  if (s < 50 || d < 35) {
    return 'extremeHypo'
  }

  if (inRange(s, 180, 210) && inRange(d, 110, 120)) {
    return 'stage4'
  }
  if (inRange(s, 160, 179) && inRange(d, 100, 109)) {
    return 'stage3'
  }
  if (inRange(s, 140, 159) && inRange(d, 90, 99)) {
    return 'stage2'
  }
  if (inRange(s, 130, 139) && inRange(d, 85, 89)) {
    return 'preHypertension'
  }

  const r = Math.max(rankFromSystolic(s), rankFromDiastolic(d))
  return rankToBand(r)
}

const bandToColorKey: Record<BpChartBandId, keyof typeof colors> = {
  crisis: 'chartBandCrisis',
  stage4: 'chartBandStage4',
  stage3: 'chartBandStage3',
  stage2: 'chartBandStage2',
  preHypertension: 'chartBandPreHypertension',
  normal: 'chartBandNormal',
  moderateHypo: 'chartBandHypoModerate',
  severeHypo: 'chartBandHypoSevere',
  extremeHypo: 'chartBandHypoExtreme',
}

export function getBpChartBarColor(systolic: number, diastolic: number): string {
  const band = getBpChartBand(systolic, diastolic)
  const key = bandToColorKey[band]
  return colors[key] as string
}
