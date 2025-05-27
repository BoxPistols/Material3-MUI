import { createTheme, type CSSObject } from '@mui/material/styles'
import type { ButtonProps } from '@mui/material'

// Material Design 3 カラーパレット（直接定義）
export const materialColors = {
    light: {
        primary: '#65558F',
        onPrimary: '#FFFFFF',
        primaryContainer: '#E7DEFF',
        onPrimaryContainer: '#21005D',
        secondary: '#625B71',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#E8DEF8',
        onSecondaryContainer: '#1D192B',
        tertiary: '#7D5260',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#FFD8E4',
        onTertiaryContainer: '#31111D',
        error: '#BA1A1A',
        onError: '#FFFFFF',
        errorContainer: '#FFDAD6',
        onErrorContainer: '#410002',
        background: '#FFFBFE',
        onBackground: '#1C1B1F',
        surface: '#FFFBFE',
        onSurface: '#1C1B1F',
        surfaceVariant: '#E7E0EC',
        onSurfaceVariant: '#49454F',
        outline: '#79747E',
        outlineVariant: '#CAC4D0',
        shadow: '#000000',
        scrim: '#000000',
        inverseSurface: '#313033',
        inverseOnSurface: '#F4EFF4',
        inversePrimary: '#D0BCFF',
    },
    dark: {
        primary: '#D0BCFF',
        onPrimary: '#381E72',
        primaryContainer: '#4F378B',
        onPrimaryContainer: '#E7DEFF',
        secondary: '#CCC2DC',
        onSecondary: '#332D41',
        secondaryContainer: '#4A4458',
        onSecondaryContainer: '#E8DEF8',
        tertiary: '#EFB8C8',
        onTertiary: '#492532',
        tertiaryContainer: '#633B48',
        onTertiaryContainer: '#FFD8E4',
        error: '#FFB4AB',
        onError: '#690005',
        errorContainer: '#93000A',
        onErrorContainer: '#FFDAD6',
        background: '#1C1B1F',
        onBackground: '#E6E1E5',
        surface: '#1C1B1F',
        onSurface: '#E6E1E5',
        surfaceVariant: '#49454F',
        onSurfaceVariant: '#CAC4D0',
        outline: '#938F99',
        outlineVariant: '#49454F',
        shadow: '#000000',
        scrim: '#000000',
        inverseSurface: '#E6E1E5',
        inverseOnSurface: '#313033',
        inversePrimary: '#65558F',
    },
}

const base = createTheme({
    palette: {
        primary: { main: materialColors.light.primary },
        secondary: { main: materialColors.light.secondary },
        background: {
            default: materialColors.light.background,
            paper: materialColors.light.surface,
        },
        text: {
            primary: materialColors.light.onSurface,
            secondary: materialColors.light.onSurfaceVariant,
        },
        error: { main: materialColors.light.error },
    },
})

// 以下のパスを参考に
// node_modules/@mui/styled-engine/esm/index.d.ts
type Variant<Props> = {
    props:
        | (Props extends {
              ownerState: infer O
          }
              ? Partial<Omit<Props, 'ownerState'> & O>
              : Partial<Props>)
        | ((
              props: Partial<Props> & {
                  ownerState: Partial<Props>
              }
          ) => boolean)
    style:
        | CSSObject
        | ((
              args: Props extends {
                  theme: unknown
              }
                  ? {
                        theme: Props['theme']
                    }
                  : unknown
          ) => CSSObject)
}

type ButtonVariant = Variant<ButtonProps>

const elevated: ButtonVariant = {
    props: { variant: 'elevated' },
    style: {
        backgroundColor: materialColors.light.surface,
        color: materialColors.light.primary,
        borderRadius: 40,
        boxShadow: base.shadows[2],
    },
}

const filled: ButtonVariant = {
    props: { variant: 'filled' },
    style: {
        backgroundColor: materialColors.light.primary,
        color: materialColors.light.onPrimary,
        borderRadius: 40,
    },
}

const tonal: ButtonVariant = {
    props: { variant: 'tonal' },
    style: {
        backgroundColor: materialColors.light.secondaryContainer,
        color: materialColors.light.onSecondaryContainer,
        borderRadius: 40,
    },
}

const outlined: ButtonVariant = {
    props: { variant: 'outlined' },
    style: {
        borderColor: materialColors.light.outlineVariant,
        color: materialColors.light.onSurfaceVariant,
        borderRadius: 40,
    },
}

const text: ButtonVariant = {
    props: { variant: 'text' },
    style: {
        borderRadius: 40,
    },
}

export const theme = createTheme({
    palette: base.palette,
    typography: {
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    variants: [elevated, filled, tonal, outlined, text],
                },
            },
        },
    },
})
