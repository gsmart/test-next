import { cn } from '../utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2')
      expect(result).toBeDefined()
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('class1', true && 'class2', false && 'class3')
      expect(result).toBeDefined()
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).not.toContain('class3')
    })

    it('should handle undefined and null values', () => {
      const result = cn('class1', undefined, null, 'class2')
      expect(result).toBeDefined()
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should merge conflicting Tailwind classes', () => {
      const result = cn('px-2 px-4')
      expect(result).toBeDefined()
      // tailwind-merge should resolve the conflict
      expect(result).not.toContain('px-2 px-4')
    })
  })
})

