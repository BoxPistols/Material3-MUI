/**
 * Material Design 3 デザイントークン定義
 * Figma互換のトークン構造
 */

// ============================================================================
// スペーシングトークン (8dp グリッド)
// ============================================================================
export const spacing = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '64px',
  '5xl': '80px',
} as const

export type SpacingToken = keyof typeof spacing

// ============================================================================
// Elevation トークン (Material Design 3 仕様)
// ============================================================================
export const elevation = {
  level0: 'none',
  level1: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  level2: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
  level3: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
  level4: '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
  level5: '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
} as const

export type ElevationToken = keyof typeof elevation

// ============================================================================
// コーナー（角丸）トークン
// ============================================================================
export const corner = {
  none: '0px',
  'extra-small': '4px',
  small: '8px',
  medium: '12px',
  large: '16px',
  'extra-large': '28px',
  full: '9999px',
} as const

export type CornerToken = keyof typeof corner

// ============================================================================
// アニメーショントークン
// ============================================================================
export const animation = {
  duration: {
    short1: '50ms',
    short2: '100ms',
    short3: '150ms',
    short4: '200ms',
    medium1: '250ms',
    medium2: '300ms',
    medium3: '350ms',
    medium4: '400ms',
    long1: '450ms',
    long2: '500ms',
    long3: '550ms',
    long4: '600ms',
    'extra-long1': '700ms',
    'extra-long2': '800ms',
    'extra-long3': '900ms',
    'extra-long4': '1000ms',
  },
  easing: {
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    'emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    'emphasized-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    'standard-decelerate': 'cubic-bezier(0, 0, 0, 1)',
    'standard-accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
    legacy: 'cubic-bezier(0.4, 0, 0.2, 1)',
    'legacy-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
    'legacy-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
    linear: 'linear',
  },
} as const

export type DurationToken = keyof typeof animation.duration
export type EasingToken = keyof typeof animation.easing

// ============================================================================
// ステートレイヤートークン (Interaction states)
// ============================================================================
export const stateLayer = {
  hover: {
    opacity: 0.08,
  },
  focus: {
    opacity: 0.12,
  },
  pressed: {
    opacity: 0.12,
  },
  dragged: {
    opacity: 0.16,
  },
} as const

export type StateLayerToken = keyof typeof stateLayer

// ============================================================================
// タイポグラフィトークン (Material Design 3)
// ============================================================================
export const typography = {
  display: {
    large: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '57px',
      lineHeight: '64px',
      fontWeight: 400,
      letterSpacing: '-0.25px',
    },
    medium: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '45px',
      lineHeight: '52px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    small: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '36px',
      lineHeight: '44px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
  },
  headline: {
    large: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    medium: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    small: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
  },
  title: {
    large: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: 400,
      letterSpacing: '0px',
    },
    medium: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: '0.15px',
    },
    small: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '0.1px',
    },
  },
  label: {
    large: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
      letterSpacing: '0.1px',
    },
    medium: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    small: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '11px',
      lineHeight: '16px',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  body: {
    large: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    medium: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      letterSpacing: '0.25px',
    },
    small: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      letterSpacing: '0.4px',
    },
  },
} as const

// ============================================================================
// 完全なデザイントークンエクスポート
// ============================================================================
export const designTokens = {
  spacing,
  elevation,
  corner,
  animation,
  stateLayer,
  typography,
} as const

export type DesignTokens = typeof designTokens
