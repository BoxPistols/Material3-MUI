# Material Design 3 + MUI 7

A React + TypeScript application that extends **MUI v7** default styles and implements the **Material Design 3 (Material You)** design system.

> **[日本語版はこちら](./README.md)**

## 📑 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Setup Guide](#setup-guide)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Implementation Details](#implementation-details)

## Overview

Material Design 3 is Google's latest design system announced in 2021, emphasizing dynamic color, personalization, and accessibility. This project leverages MUI v7 as a foundation while implementing Material Design 3's distinctive elements.

## Key Features

### 1. Interactive Dynamic Color Generation System
- **Real-time Color Picker**: Change primary color with one click from navigation bar
- **Material Color Utilities**: Dynamic color generation using Google's official library
- **Complete Palette from Single Color**: Auto-generate all color tokens from selected primary color
- **Instant Reflection**: Color changes instantly applied to all components
- **Persistence**: Auto-save selected colors to local storage

### 2. Material Design 3 Compliant Components
- **New Button Variants**: filled, elevated, tonal, outlined, text
- **Custom Size Variations**: small, medium, large
- **Unified Border Radius**: Rounded design from 12px to 40px
- **Elevation System**: Appropriate shadows and layering

### 3. Design Token Management
- **Figma Compatible**: Export/Import functionality for Figma tokens
- **Multiple Format Support**: Export in JSON, CSS, SCSS formats
- **Token Catalog**: Spacing, Elevation, Corner Radius, Animation, State Layer, etc.

### 4. SaaS Dashboard Sample
- Statistics cards, data tables, chart areas
- Order management table with search and filter functionality
- Activity feed, project progress display

## Setup Guide

### Prerequisites

Ensure the following software is installed:

- **Node.js**: v18.0.0 or higher (Recommended: v20.x LTS)
- **pnpm**: v8.0.0 or higher (or npm/yarn)
- **Git**: For version control

### Step 1: Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/BoxPistols/Material3-MUI.git

# Navigate to project directory
cd Material3-MUI
```

### Step 2: Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### Step 3: Start Development Server

```bash
# With pnpm
pnpm dev

# With npm
npm run dev

# With yarn
yarn dev
```

Once the development server starts, open the following URL in your browser:

```
http://localhost:5173
```

### Step 4: Build for Production

```bash
# With pnpm
pnpm build

# With npm
npm run build

# With yarn
yarn build
```

Build artifacts are generated in the `dist/` directory.

### Step 5: Preview the Build

```bash
# With pnpm
pnpm preview

# With npm
npm run preview

# With yarn
yarn preview
```

## Usage

### Changing Color Theme

1. Click the **palette icon** in the navigation bar
2. Select your preferred color from the color picker
3. Or directly enter a HEX value (e.g., #003366)
4. You can also choose from preset colors
5. Changes are automatically saved to local storage

### Toggle Dark Mode

1. Click the **moon/sun icon** in the navigation bar
2. Switches between light and dark mode
3. Dark mode may be automatically applied based on system settings

### Export Design Tokens

1. Open the "**Tokens**" page from the navigation menu
2. Select export format (JSON / CSS / SCSS)
3. Click the "**Export**" button
4. File will be downloaded

### Import Tokens

1. Click the "**Import**" button on the Tokens page
2. Select a Figma token format JSON file
3. Tokens are automatically applied

## Project Structure

```
Material3-MUI/
├── src/
│   ├── components/          # React components
│   │   ├── AppNavigation.tsx          # Navigation with color picker
│   │   ├── AdvancedColorPicker.tsx    # Advanced color picker
│   │   ├── ButtonsShowcase.tsx        # Button variants showcase
│   │   └── ColorPalette.tsx           # Color palette display
│   │
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx           # Theme & color management
│   │
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx               # Home page
│   │   ├── ColorsPage.tsx             # Color palette list
│   │   ├── ButtonsPage.tsx            # Button variants
│   │   ├── ComponentsPage.tsx         # MUI components list
│   │   ├── TokensPage.tsx             # Design token management
│   │   ├── TypographyPage.tsx         # Typography
│   │   └── DashboardPage.tsx          # SaaS dashboard
│   │
│   ├── routes/             # TanStack Router route definitions
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── colors.tsx
│   │   ├── buttons.tsx
│   │   ├── components.tsx
│   │   ├── tokens.tsx
│   │   ├── typography.tsx
│   │   └── dashboard.tsx
│   │
│   ├── tokens/             # Design token definitions
│   │   └── designTokens.ts
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── mui.d.ts        # MUI component type extensions
│   │
│   ├── utils/              # Utility functions
│   │   └── figmaTokens.ts  # Figma token conversion
│   │
│   ├── theme.ts            # Material Design 3 theme settings
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
│
├── public/                 # Static files
├── dist/                   # Build artifacts (auto-generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Tech Stack

### Frontend

- **React 19.1.0**: Latest React framework
- **TypeScript 5.8.3**: Type-safe development
- **MUI v7.1.0**: Latest version of Material-UI
- **Emotion**: CSS-in-JS library

### Routing & State Management

- **TanStack Router**: Type-safe routing library
- **React Context**: Global state management

### Color System

- **Material Color Utilities**: Google's official color generation library
- **culori**: Advanced color space conversion library (OkLCH support)

### Icons

- **@mui/icons-material**: Material Icons library

### Build Tools

- **Vite 6.3.5**: Fast build tool
- **ESLint**: Code quality checking
- **TypeScript**: Type checking

## Implementation Details

### Dynamic Color Generation Mechanism

1. **Primary Color Selection**: User selects color with color picker
2. **ARGB Conversion**: Convert HEX color to Android ARGB format
3. **Material Color Utilities**: Google's algorithm generates color palette
4. **Tone Calculation**: Tone values optimized for light/dark mode (40/80 system)
5. **Accessibility**: Automatic contrast ratio calculation (WCAG compliant)

```typescript
import { themeFromSourceColor, argbFromHex } from '@material/material-color-utilities';

export const generateColorsFromPrimary = (primaryColor: string, useOriginalColor: boolean) => {
  const materialTheme = themeFromSourceColor(argbFromHex(primaryColor));

  return {
    light: {
      primary: useOriginalColor ? primaryColor : argbToHex(materialTheme.palettes.primary.tone(40)),
      onPrimary: argbToHex(materialTheme.palettes.primary.tone(100)),
      primaryContainer: argbToHex(materialTheme.palettes.primary.tone(90)),
      // ... other color tokens
    },
    dark: {
      primary: argbToHex(materialTheme.palettes.primary.tone(80)),
      // ... dark mode colors
    }
  };
};
```

### Integration with MUI Theme

Integrate Material Design 3 color tokens with MUI v7's theme system:

```typescript
palette: {
  primary: {
    main: colors.primary,
    light: colors.primaryContainer,
    dark: mode === 'light' ? colors.primary : colors.primaryContainer,
    contrastText: colors.onPrimary,
  },
  grey: {
    50: mode === 'light' ? colors.surface : colors.surfaceVariant,
    100: mode === 'light' ? colors.surfaceVariant : colors.surface,
    // ... complete greyscale
  },
}
```

### Custom Button Variants

Implement Material Design 3's new button styles:

```typescript
// types/mui.d.ts
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    filled: true;
    elevated: true;
    tonal: true;
  }
}
```

### Design Token Structure

```typescript
export const designTokens = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  elevation: {
    level0: 'none',
    level1: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    // ...
  },
  corner: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '28px',
    full: '9999px',
  },
  // ...
};
```

## Troubleshooting

### Port Already in Use

If the default port (5173) is in use, start on a different port:

```bash
pnpm dev --port 3000
```

### Build Errors

1. Delete `node_modules` and reinstall:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

2. Clear TypeScript cache:

```bash
rm -rf dist .vite
```

### Colors Not Applied Correctly

1. Clear browser's local storage (Developer Tools > Application > Local Storage)
2. Reload the page

## Contributing

We welcome pull requests and issue reports:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a pull request

## License

MIT License

## References

- [Material Design 3 Official Documentation](https://m3.material.io/)
- [MUI v7 Documentation](https://mui.com/)
- [Material Color Utilities](https://github.com/material-foundation/material-color-utilities)
- [TanStack Router](https://tanstack.com/router)

---

**Material Design 3 + MUI 7** - Experience the Next-Generation Interactive Design System Today
