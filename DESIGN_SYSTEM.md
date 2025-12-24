# SunstoneMind Design System

## Overview
This design system is based on the reference dashboard image and provides a comprehensive guide for maintaining visual consistency across the SunstoneMind wellness application.

## Color System

### Primary Colors
- **Primary Blue**: `#7DBEDC` (hsl(199, 50%, 70%)) - Trust, stability
- **Primary Teal**: `#A7E4E0` (hsl(176, 45%, 75%)) - Healing, calm
- **Accent Orange/Amber**: `#FFD89B` (hsl(45, 85%, 80%)) - Warmth, positivity
- **Success Green**: `#7EDFC7` (hsl(163, 50%, 70%)) - Wellness, growth

### Secondary Colors
- **Purple/Lavender**: Used for premium features and accents
- **Soft Backgrounds**: Light blue/teal gradients for calm spaces
- **Text Colors**: 
  - Primary: `hsl(220, 30%, 25%)` - Dark gray
  - Secondary: `hsl(206, 20%, 50%)` - Medium gray
  - Muted: `hsl(206, 20%, 50%)` - Light gray

### Semantic Colors
- **Success**: Green tones for positive actions
- **Warning**: Warm orange for cautions
- **Error/Destructive**: Soft pink/red for errors
- **Info**: Blue tones for informational content

### Background Colors
- **Main Background**: `hsl(197, 40%, 98%)` - Very light blue-tinted white
- **Card Background**: `#FFFFFF` - Pure white
- **Sidebar Background**: `hsl(197, 30%, 98%)` - Slightly tinted white
- **Muted Background**: `hsl(197, 30%, 96%)` - Soft gray-blue

## Typography

### Font Families
- **Primary (Body)**: Inter, system-ui, -apple-system, sans-serif
- **Display**: Poppins (for headings)
- **Body Alternative**: Nunito (optional, for specific sections)

### Font Sizes (8px grid-based)
- **Display Large**: 48px (3rem) - Hero headings
- **Display Medium**: 36px (2.25rem) - Page titles
- **Heading 1**: 32px (2rem) - Section titles
- **Heading 2**: 24px (1.5rem) - Card titles
- **Heading 3**: 20px (1.25rem) - Subsection titles
- **Body Large**: 18px (1.125rem) - Important text
- **Body**: 16px (1rem) - Standard text
- **Body Small**: 14px (0.875rem) - Secondary text
- **Caption**: 12px (0.75rem) - Labels, metadata

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Line Heights
- **Tight**: 1.2 - Headings
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.6 - Long-form content

## Spacing System (8px Grid)

### Base Unit
- **Base**: 8px (0.5rem)

### Spacing Scale
- **xs**: 4px (0.25rem) - 0.5 units
- **sm**: 8px (0.5rem) - 1 unit
- **md**: 16px (1rem) - 2 units
- **lg**: 24px (1.5rem) - 3 units
- **xl**: 32px (2rem) - 4 units
- **2xl**: 40px (2.5rem) - 5 units
- **3xl**: 48px (3rem) - 6 units
- **4xl**: 64px (4rem) - 8 units

### Component Spacing
- **Card Padding**: 24px (1.5rem / 3 units)
- **Button Padding**: 12px vertical, 24px horizontal
- **Input Padding**: 12px vertical, 16px horizontal
- **Section Gap**: 24px-32px (between major sections)

## Border Radius

- **Small**: 8px (0.5rem) - Buttons, inputs
- **Medium**: 12px (0.75rem) - Cards, containers
- **Large**: 16px (1rem) - Main cards, modals
- **Extra Large**: 24px (1.5rem) - Feature cards
- **Full**: 9999px - Pills, badges, avatars

## Shadows

### Soft Shadows (for depth)
- **Soft**: `0 1px 3px rgba(167, 228, 224, 0.04), 0 1px 2px rgba(44, 62, 80, 0.02)`
- **Medium**: `0 2px 8px rgba(167, 228, 224, 0.06), 0 1px 4px rgba(44, 62, 80, 0.03)`
- **Large**: `0 4px 16px rgba(167, 228, 224, 0.08), 0 2px 8px rgba(44, 62, 80, 0.04)`
- **Glow**: `0 0 16px rgba(167, 228, 224, 0.12), 0 0 8px rgba(167, 228, 224, 0.08)`

## Layout System

### Grid System
- **Container Max Width**: 1400px (2xl breakpoint)
- **Grid Columns**: 12-column system
- **Gap**: 24px default, 16px on mobile

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

### Layout Components

#### Sidebar
- **Width**: 280px (35rem)
- **Background**: Light white with subtle tint
- **Border**: Right border with soft color
- **Navigation Items**: 48px height, 12px padding

#### Top Bar / Header
- **Height**: 64px (4rem)
- **Background**: White with backdrop blur
- **Padding**: 16px horizontal
- **Border**: Bottom border (subtle)

#### Main Content Area
- **Padding**: 24px-32px
- **Max Width**: Container-based
- **Background**: Light blue-tinted gradient

## Component Library

### Buttons

#### Primary Button
```tsx
<Button variant="default" className="rounded-xl px-6 py-3">
  Primary Action
</Button>
```
- Background: Primary blue gradient
- Text: White
- Hover: Darker shade, slight scale (1.02)
- Active: Scale down (0.98)

#### Secondary Button
```tsx
<Button variant="outline" className="rounded-xl px-6 py-3 border-primary/40">
  Secondary Action
</Button>
```
- Background: Transparent
- Border: Primary color at 40% opacity
- Text: Primary color
- Hover: Light primary background (10%)

#### Ghost Button
```tsx
<Button variant="ghost" className="rounded-xl">
  Ghost Action
</Button>
```
- No background/border
- Text: Foreground color
- Hover: Muted background

### Cards

#### Standard Card
```tsx
<Card className="rounded-2xl shadow-wellness-soft border border-border/50">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```
- Background: White
- Border: Subtle border
- Shadow: Soft shadow
- Padding: 24px
- Hover: Medium shadow, slight lift (-translate-y-0.5)

#### Feature Card
- Larger padding (32px)
- Gradient background option
- Icon + Title + Description layout
- "Tap to start" or action button

### Inputs

#### Text Input
```tsx
<Input className="rounded-lg px-4 py-2.5 border-border focus:border-primary focus:ring-2 focus:ring-primary/20" />
```
- Background: Light input color
- Border: Subtle
- Focus: Primary border + ring
- Padding: 12px vertical, 16px horizontal

### Badges

#### Status Badge
- Small rounded-full pills
- Color-coded backgrounds
- Text: Small (12px)
- Padding: 4px 12px

### Navigation Items
- Height: 48px
- Icon size: 20px (5rem)
- Text: Medium weight, 14px
- Active state: Background gradient + text color change
- Hover: Light background + scale (1.02)

## Iconography Guidelines

### Icon Sizes
- **Small**: 16px (1rem) - Inline with text
- **Medium**: 20px (1.25rem) - Navigation, buttons
- **Large**: 24px (1.5rem) - Feature cards, headers
- **XLarge**: 32px (2rem) - Hero sections

### Icon Library
- **Primary**: Lucide React Icons
- **Style**: Outline icons, 2px stroke width
- **Color**: Inherit from parent or use semantic colors

## Interaction States

### Hover States
- **Scale**: 1.02 (2% larger)
- **Shadow**: Elevate to next shadow level
- **Color**: Slight darken (10% darker)
- **Transition**: 300ms cubic-bezier

### Active States
- **Scale**: 0.98 (2% smaller)
- **Color**: Darker (15% darker)
- **Transition**: 150ms ease-out

### Focus States
- **Ring**: 2px primary color at 20% opacity
- **Outline**: None (ring replaces outline)

### Disabled States
- **Opacity**: 50%
- **Cursor**: not-allowed
- **Pointer Events**: none

### Loading States
- **Spinner**: Circular, primary color
- **Overlay**: Slight opacity on background
- **Cursor**: wait

## Animations

### Transitions
- **Standard**: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- **Slow**: 500ms cubic-bezier(0.4, 0, 0.2, 1)
- **Fast**: 150ms ease-out

### Keyframe Animations
- **Fade In**: Opacity 0→1, translateY 10px→0
- **Slide Up**: Opacity 0→1, translateY 20px→0
- **Scale In**: Opacity 0→1, scale 0.95→1
- **Gentle Bounce**: Scale 1→1.05→1
- **Pulse**: Opacity 0.8→1→0.8

## Responsive Design

### Mobile (< 640px)
- **Sidebar**: Collapsed/overlay menu
- **Padding**: 16px
- **Grid**: Single column
- **Font Sizes**: Slightly smaller
- **Touch Targets**: Minimum 44px height

### Tablet (640px - 1024px)
- **Sidebar**: Collapsed with icons only or overlay
- **Grid**: 2 columns max
- **Padding**: 20px

### Desktop (> 1024px)
- **Sidebar**: Always visible
- **Grid**: 3-4 columns
- **Padding**: 24px-32px

## Accessibility

### Color Contrast
- **Text on Background**: Minimum 4.5:1 (WCAG AA)
- **Large Text**: Minimum 3:1
- **Interactive Elements**: Clear focus indicators

### Keyboard Navigation
- **Tab Order**: Logical flow
- **Focus Indicators**: Visible ring
- **Skip Links**: Available for main content

### Screen Readers
- **Alt Text**: All images
- **ARIA Labels**: Icon-only buttons
- **Semantic HTML**: Proper heading hierarchy

## Design Tokens

### CSS Variables
All design tokens are available as CSS variables in `globals.css`:
- Colors: `--primary`, `--secondary`, `--accent`, etc.
- Spacing: Tailwind spacing scale
- Shadows: `--shadow-soft`, `--shadow-medium`, `--shadow-large`
- Gradients: `--gradient-primary`, `--gradient-secondary`, etc.

### Tailwind Classes
- Colors: `bg-primary`, `text-primary`, `border-primary`
- Spacing: `p-4`, `m-6`, `gap-4`
- Shadows: `shadow-wellness-soft`, `shadow-wellness-medium`
- Gradients: `bg-gradient-primary`, `bg-gradient-calm`

## Usage Examples

See component implementations in:
- `/src/components/ui/` - Base UI components
- `/src/components/auth/` - Feature-specific components
- `/src/app/` - Page implementations



