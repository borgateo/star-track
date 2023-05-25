import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders App component without errors', () => {
    // Arrange
    render(<App />)

    // Expect
    expect(screen.getByRole('navigation')).toBeDefined()

    expect(screen.getByRole('tablist')).toBeDefined()

    expect(screen.getByRole('contentinfo')).toBeDefined()
  })
})
