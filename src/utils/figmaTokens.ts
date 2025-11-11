/**
 * Figma互換デザイントークンのエクスポート/インポート機能
 * Figma Tokens Plugin形式に準拠
 */

import { designTokens } from '../tokens/designTokens'

// ============================================================================
// Figma Token 型定義
// ============================================================================

export interface FigmaToken {
  value: string | number
  type: string
  description?: string
}

export interface FigmaTokenSet {
  [key: string]: FigmaToken | FigmaTokenSet
}

export interface FigmaTokensExport {
  color?: FigmaTokenSet
  spacing?: FigmaTokenSet
  elevation?: FigmaTokenSet
  corner?: FigmaTokenSet
  animation?: FigmaTokenSet
  typography?: FigmaTokenSet
  stateLayer?: FigmaTokenSet
  metadata?: {
    version: string
    generatedAt: string
    source: string
  }
}

// ============================================================================
// エクスポート機能
// ============================================================================

/**
 * 現在のテーマカラーをFigma互換形式でエクスポート
 */
export function exportColorTokens(
  colorScheme: Record<string, string>,
  mode: 'light' | 'dark'
): FigmaTokenSet {
  const tokens: FigmaTokenSet = {}

  Object.entries(colorScheme).forEach(([key, value]) => {
    tokens[key] = {
      value,
      type: 'color',
      description: `${mode} mode ${key} color`,
    }
  })

  return tokens
}

/**
 * スペーシングトークンをFigma互換形式でエクスポート
 */
export function exportSpacingTokens(): FigmaTokenSet {
  const tokens: FigmaTokenSet = {}

  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    tokens[key] = {
      value,
      type: 'spacing',
      description: `Spacing token: ${key}`,
    }
  })

  return tokens
}

/**
 * Elevationトークンをエクスポート
 */
export function exportElevationTokens(): FigmaTokenSet {
  const tokens: FigmaTokenSet = {}

  Object.entries(designTokens.elevation).forEach(([key, value]) => {
    tokens[key] = {
      value,
      type: 'boxShadow',
      description: `Elevation ${key}`,
    }
  })

  return tokens
}

/**
 * コーナー（角丸）トークンをエクスポート
 */
export function exportCornerTokens(): FigmaTokenSet {
  const tokens: FigmaTokenSet = {}

  Object.entries(designTokens.corner).forEach(([key, value]) => {
    tokens[key] = {
      value,
      type: 'borderRadius',
      description: `Corner radius: ${key}`,
    }
  })

  return tokens
}

/**
 * アニメーショントークンをエクスポート
 */
export function exportAnimationTokens(): FigmaTokenSet {
  const duration: FigmaTokenSet = {}
  const easing: FigmaTokenSet = {}

  Object.entries(designTokens.animation.duration).forEach(([key, value]) => {
    duration[key] = {
      value,
      type: 'duration',
      description: `Animation duration: ${key}`,
    }
  })

  Object.entries(designTokens.animation.easing).forEach(([key, value]) => {
    easing[key] = {
      value,
      type: 'cubicBezier',
      description: `Animation easing: ${key}`,
    }
  })

  return {
    duration,
    easing,
  }
}

/**
 * タイポグラフィトークンをエクスポート
 */
export function exportTypographyTokens(): FigmaTokenSet {
  const tokens: FigmaTokenSet = {}

  Object.entries(designTokens.typography).forEach(([category, variants]) => {
    const categoryTokens: FigmaTokenSet = {}

    Object.entries(variants).forEach(([variant, styles]) => {
      categoryTokens[variant] = {
        fontFamily: {
          value: styles.fontFamily,
          type: 'fontFamily',
        },
        fontSize: {
          value: styles.fontSize,
          type: 'fontSize',
        },
        lineHeight: {
          value: styles.lineHeight,
          type: 'lineHeight',
        },
        fontWeight: {
          value: styles.fontWeight,
          type: 'fontWeight',
        },
        letterSpacing: {
          value: styles.letterSpacing,
          type: 'letterSpacing',
        },
      }
    })

    tokens[category] = categoryTokens
  })

  return tokens
}

/**
 * ステートレイヤートークンをエクスポート
 */
export function exportStateLayerTokens(): FigmaTokenSet {
  const tokens: FigmaTokenSet = {}

  Object.entries(designTokens.stateLayer).forEach(([key, value]) => {
    tokens[key] = {
      value: value.opacity,
      type: 'opacity',
      description: `State layer opacity: ${key}`,
    }
  })

  return tokens
}

/**
 * 全デザイントークンをFigma互換形式でエクスポート
 */
export function exportAllTokens(
  colorScheme: Record<string, string>,
  mode: 'light' | 'dark'
): FigmaTokensExport {
  return {
    color: exportColorTokens(colorScheme, mode),
    spacing: exportSpacingTokens(),
    elevation: exportElevationTokens(),
    corner: exportCornerTokens(),
    animation: exportAnimationTokens(),
    typography: exportTypographyTokens(),
    stateLayer: exportStateLayerTokens(),
    metadata: {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      source: 'Material3-MUI Design System',
    },
  }
}

/**
 * トークンをJSON文字列としてエクスポート（整形済み）
 */
export function exportTokensAsJSON(
  colorScheme: Record<string, string>,
  mode: 'light' | 'dark'
): string {
  const tokens = exportAllTokens(colorScheme, mode)
  return JSON.stringify(tokens, null, 2)
}

/**
 * トークンをJSONファイルとしてダウンロード
 */
export function downloadTokensAsJSON(
  colorScheme: Record<string, string>,
  mode: 'light' | 'dark',
  filename: string = 'design-tokens.json'
): void {
  const json = exportTokensAsJSON(colorScheme, mode)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// ============================================================================
// インポート機能
// ============================================================================

/**
 * Figma形式のトークンをインポート
 */
export function importFigmaTokens(jsonString: string): FigmaTokensExport {
  try {
    const parsed = JSON.parse(jsonString)
    return parsed as FigmaTokensExport
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error('Invalid JSON format: ' + message)
  }
}
}

/**
 * カラートークンを抽出してテーマに適用可能な形式に変換
 */
export function extractColorScheme(tokens: FigmaTokensExport): Record<string, string> {
  const colorScheme: Record<string, string> = {}

  if (tokens.color) {
    Object.entries(tokens.color).forEach(([key, value]) => {
      if (typeof value === 'object' && 'value' in value) {
        colorScheme[key] = value.value as string
      }
    })
  }

  return colorScheme
}

/**
 * ファイルからトークンをインポート
 */
export function importTokensFromFile(file: File): Promise<FigmaTokensExport> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const tokens = importFigmaTokens(content)
        resolve(tokens)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}

// ============================================================================
// トークン変換ユーティリティ
// ============================================================================

/**
 * CSS変数としてエクスポート
 */
export function exportAsCSS(
  colorScheme: Record<string, string>,
  mode: 'light' | 'dark'
): string {
  let css = `:root {\n  /* Generated from Material3-MUI - ${mode} mode */\n\n`

  // カラー
  css += '  /* Colors */\n'
  Object.entries(colorScheme).forEach(([key, value]) => {
    css += `  --md-${key}: ${value};\n`
  })

  // スペーシング
  css += '\n  /* Spacing */\n'
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    css += `  --md-spacing-${key}: ${value};\n`
  })

  // コーナー
  css += '\n  /* Corner */\n'
  Object.entries(designTokens.corner).forEach(([key, value]) => {
    css += `  --md-corner-${key}: ${value};\n`
  })

  // Elevation
  css += '\n  /* Elevation */\n'
  Object.entries(designTokens.elevation).forEach(([key, value]) => {
    if (value !== 'none') {
      css += `  --md-elevation-${key}: ${value};\n`
    }
  })

  css += '}\n'
  return css
}

/**
 * SCSS変数としてエクスポート
 */
export function exportAsSCSS(
  colorScheme: Record<string, string>,
  mode: 'light' | 'dark'
): string {
  let scss = `// Generated from Material3-MUI - ${mode} mode\n\n`

  // カラー
  scss += '// Colors\n'
  Object.entries(colorScheme).forEach(([key, value]) => {
    scss += `$md-${key}: ${value};\n`
  })

  // スペーシング
  scss += '\n// Spacing\n'
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    scss += `$md-spacing-${key}: ${value};\n`
  })

  // コーナー
  scss += '\n// Corner\n'
  Object.entries(designTokens.corner).forEach(([key, value]) => {
    scss += `$md-corner-${key}: ${value};\n`
  })

  return scss
}
