import { describe, it, expect } from 'vitest'

import { getPastDate } from './dates'

describe('getPastDate', () => {
  it('returns the correct past date when given a positive number of days', () => {
    const days = 5
    const result = getPastDate(days)

    // Calculate the expected past date
    const today = new Date()
    const pastDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000)
    const expectedDate = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(
      pastDate.getDate()
    ).padStart(2, '0')}`

    expect(result).toBe(expectedDate)
  })

  it('returns the correct past date when given zero days', () => {
    const days = 0
    const result = getPastDate(days)

    // The result should be the current date
    const today = new Date()
    const expectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
      today.getDate()
    ).padStart(2, '0')}`

    expect(result).toBe(expectedDate)
  })

  it('should throw an error when given a negative number of days', () => {
    expect(() => {
      getPastDate(-1)
    }).toThrow('Invalid input: days cannot be negative')

    expect(() => {
      getPastDate(-10)
    }).toThrow('Invalid input: days cannot be negative')
  })
})
