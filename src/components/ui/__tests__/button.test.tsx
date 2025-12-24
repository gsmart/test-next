import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('should apply variant styles', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-destructive')
  })

  it('should apply size variants', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button', { name: /large button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('h-11')
  })

  it('should handle disabled state', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('should handle onClick events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    const button = screen.getByRole('button', { name: /clickable/i })
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should render with default variant when none specified', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button', { name: /default/i })
    expect(button).toHaveClass('bg-primary')
  })
})

