export function getPastDate(days: number): string {
  if (days < 0) {
    throw new Error('Invalid input: days cannot be negative')
  }
  
  const today = new Date()
  const pastDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000)

  const year = pastDate.getFullYear()
  const month = String(pastDate.getMonth() + 1).padStart(2, '0')
  const day = String(pastDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
