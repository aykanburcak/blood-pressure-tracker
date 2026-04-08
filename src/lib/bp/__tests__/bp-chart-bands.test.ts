import {getBpChartBand, getBpChartBarColor} from '@/lib/bp/bp-chart-bands'

describe('getBpChartBand', () => {
  it('classifies (120, 80) as normal green family', () => {
    expect(getBpChartBand(120, 80)).toBe('normal')
  })

  it('classifies (160, 105) as stage3 (paired row)', () => {
    expect(getBpChartBand(160, 105)).toBe('stage3')
  })

  it('classifies (95, 62) as normal green family', () => {
    expect(getBpChartBand(95, 62)).toBe('normal')
  })

  it('classifies (220, 80) as crisis', () => {
    expect(getBpChartBand(220, 80)).toBe('crisis')
  })

  it('classifies (120, 125) as crisis on diastolic', () => {
    expect(getBpChartBand(120, 125)).toBe('crisis')
  })
})

describe('getBpChartBarColor', () => {
  it('returns a hex string for normal', () => {
    const c = getBpChartBarColor(120, 80)
    expect(c).toMatch(/^#/)
    expect(c).toBeTruthy()
  })

  it('returns different color for stage3 vs normal', () => {
    expect(getBpChartBarColor(160, 105)).not.toBe(getBpChartBarColor(120, 80))
  })
})
