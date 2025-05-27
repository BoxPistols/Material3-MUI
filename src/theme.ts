import { createTheme } from '@mui/material/styles'
import {
    themeFromSourceColor,
    argbFromHex,
    hexFromArgb,
    type Theme as MaterialTheme,
} from '@material/material-color-utilities'

// デフォルトプライマリカラー（Material Design 3のPurple）
const DEFAULT_PRIMARY_COLOR = '#65558F'

// ARGBからHEXに変換するヘルパー関数
const argbToHex = (argb: number): string => hexFromArgb(argb)

// プライマリカラーからカラーパレットを生成する関数
export const generateColorsFromPrimary = (primaryColor: string) => {
    const materialTheme: MaterialTheme = themeFromSourceColor(
        argbFromHex(primaryColor)
    )

    return {
        light: {
            primary: argbToHex(materialTheme.palettes.primary.tone(40)),
            onPrimary: argbToHex(materialTheme.palettes.primary.tone(100)),
            primaryContainer: argbToHex(
                materialTheme.palettes.primary.tone(90)
            ),
            onPrimaryContainer: argbToHex(
                materialTheme.palettes.primary.tone(10)
            ),

            secondary: argbToHex(materialTheme.palettes.secondary.tone(40)),
            onSecondary: argbToHex(materialTheme.palettes.secondary.tone(100)),
            secondaryContainer: argbToHex(
                materialTheme.palettes.secondary.tone(90)
            ),
            onSecondaryContainer: argbToHex(
                materialTheme.palettes.secondary.tone(10)
            ),

            tertiary: argbToHex(materialTheme.palettes.tertiary.tone(40)),
            onTertiary: argbToHex(materialTheme.palettes.tertiary.tone(100)),
            tertiaryContainer: argbToHex(
                materialTheme.palettes.tertiary.tone(90)
            ),
            onTertiaryContainer: argbToHex(
                materialTheme.palettes.tertiary.tone(10)
            ),

            error: argbToHex(materialTheme.palettes.error.tone(40)),
            onError: argbToHex(materialTheme.palettes.error.tone(100)),
            errorContainer: argbToHex(materialTheme.palettes.error.tone(90)),
            onErrorContainer: argbToHex(materialTheme.palettes.error.tone(10)),

            background: argbToHex(materialTheme.palettes.neutral.tone(99)),
            onBackground: argbToHex(materialTheme.palettes.neutral.tone(10)),
            surface: argbToHex(materialTheme.palettes.neutral.tone(99)),
            onSurface: argbToHex(materialTheme.palettes.neutral.tone(10)),
            surfaceVariant: argbToHex(
                materialTheme.palettes.neutralVariant.tone(90)
            ),
            onSurfaceVariant: argbToHex(
                materialTheme.palettes.neutralVariant.tone(30)
            ),

            outline: argbToHex(materialTheme.palettes.neutralVariant.tone(50)),
            outlineVariant: argbToHex(
                materialTheme.palettes.neutralVariant.tone(80)
            ),
            shadow: argbToHex(materialTheme.palettes.neutral.tone(0)),
            scrim: argbToHex(materialTheme.palettes.neutral.tone(0)),

            inverseSurface: argbToHex(materialTheme.palettes.neutral.tone(20)),
            inverseOnSurface: argbToHex(
                materialTheme.palettes.neutral.tone(95)
            ),
            inversePrimary: argbToHex(materialTheme.palettes.primary.tone(80)),
        },
        dark: {
            primary: argbToHex(materialTheme.palettes.primary.tone(80)),
            onPrimary: argbToHex(materialTheme.palettes.primary.tone(20)),
            primaryContainer: argbToHex(
                materialTheme.palettes.primary.tone(30)
            ),
            onPrimaryContainer: argbToHex(
                materialTheme.palettes.primary.tone(90)
            ),

            secondary: argbToHex(materialTheme.palettes.secondary.tone(80)),
            onSecondary: argbToHex(materialTheme.palettes.secondary.tone(20)),
            secondaryContainer: argbToHex(
                materialTheme.palettes.secondary.tone(30)
            ),
            onSecondaryContainer: argbToHex(
                materialTheme.palettes.secondary.tone(90)
            ),

            tertiary: argbToHex(materialTheme.palettes.tertiary.tone(80)),
            onTertiary: argbToHex(materialTheme.palettes.tertiary.tone(20)),
            tertiaryContainer: argbToHex(
                materialTheme.palettes.tertiary.tone(30)
            ),
            onTertiaryContainer: argbToHex(
                materialTheme.palettes.tertiary.tone(90)
            ),

            error: argbToHex(materialTheme.palettes.error.tone(80)),
            onError: argbToHex(materialTheme.palettes.error.tone(20)),
            errorContainer: argbToHex(materialTheme.palettes.error.tone(30)),
            onErrorContainer: argbToHex(materialTheme.palettes.error.tone(90)),

            background: argbToHex(materialTheme.palettes.neutral.tone(10)),
            onBackground: argbToHex(materialTheme.palettes.neutral.tone(90)),
            surface: argbToHex(materialTheme.palettes.neutral.tone(10)),
            onSurface: argbToHex(materialTheme.palettes.neutral.tone(90)),
            surfaceVariant: argbToHex(
                materialTheme.palettes.neutralVariant.tone(30)
            ),
            onSurfaceVariant: argbToHex(
                materialTheme.palettes.neutralVariant.tone(80)
            ),

            outline: argbToHex(materialTheme.palettes.neutralVariant.tone(60)),
            outlineVariant: argbToHex(
                materialTheme.palettes.neutralVariant.tone(30)
            ),
            shadow: argbToHex(materialTheme.palettes.neutral.tone(0)),
            scrim: argbToHex(materialTheme.palettes.neutral.tone(0)),

            inverseSurface: argbToHex(materialTheme.palettes.neutral.tone(90)),
            inverseOnSurface: argbToHex(
                materialTheme.palettes.neutral.tone(20)
            ),
            inversePrimary: argbToHex(materialTheme.palettes.primary.tone(40)),
        },
    }
}

// デフォルトカラーパレット
const defaultColors = generateColorsFromPrimary(DEFAULT_PRIMARY_COLOR)
export const lightColors = defaultColors.light
export const darkColors = defaultColors.dark

// 後方互換性のため
export const materialColors = {
    light: lightColors,
    dark: darkColors,
}

// MUIテーマを作成する関数（MUI v7ベースコーディングとの親和性向上）
export const createMaterialTheme = (
    mode: 'light' | 'dark',
    primaryColor?: string
) => {
    const colors = primaryColor
        ? generateColorsFromPrimary(primaryColor)[mode]
        : mode === 'light'
          ? lightColors
          : darkColors

    return createTheme({
        palette: {
            mode,
            primary: {
                main: colors.primary,
                contrastText: colors.onPrimary,
                // MUI v7との親和性のため標準的なバリエーションも追加
                light: colors.primaryContainer,
                dark:
                    mode === 'light' ? colors.primary : colors.primaryContainer,
            },
            secondary: {
                main: colors.secondary,
                contrastText: colors.onSecondary,
                light: colors.secondaryContainer,
                dark:
                    mode === 'light'
                        ? colors.secondary
                        : colors.secondaryContainer,
            },
            error: {
                main: colors.error,
                contrastText: colors.onError,
                light: colors.errorContainer,
                dark: mode === 'light' ? colors.error : colors.errorContainer,
            },
            background: {
                default: colors.background,
                paper: colors.surface,
            },
            text: {
                primary: colors.onSurface,
                secondary: colors.onSurfaceVariant,
            },
            divider: colors.outline,
            // MUI v7の標準カラーとの互換性
            grey: {
                50: mode === 'light' ? colors.surface : colors.surfaceVariant,
                100: mode === 'light' ? colors.surfaceVariant : colors.surface,
                200: colors.outlineVariant,
                300: colors.outline,
                400: colors.onSurfaceVariant,
                500: colors.onSurface,
                600: colors.onBackground,
                700: colors.inverseSurface,
                800: colors.inverseOnSurface,
                900: colors.shadow,
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            button: {
                textTransform: 'none',
                fontWeight: 500,
            },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: colors.surface,
                        color: colors.onSurface,
                        // Sticky positioning
                        position: 'sticky',
                        top: 0,
                        zIndex: 1100,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 40,
                        textTransform: 'none',
                        fontWeight: 500,
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                },
                variants: [
                    {
                        props: { variant: 'filled' },
                        style: {
                            backgroundColor: colors.primary,
                            color: colors.onPrimary,
                            '&:hover': {
                                backgroundColor: colors.primary,
                                filter: 'brightness(0.9)',
                            },
                            '&:disabled': {
                                backgroundColor: colors.onSurface + '1F',
                                color: colors.onSurface + '61',
                            },
                        },
                    },
                    {
                        props: { variant: 'elevated' },
                        style: {
                            backgroundColor: colors.surface,
                            color: colors.primary,
                            boxShadow:
                                '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                            '&:hover': {
                                backgroundColor: colors.surface,
                                filter: 'brightness(0.95)',
                                boxShadow:
                                    '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
                            },
                            '&:disabled': {
                                backgroundColor: colors.onSurface + '1F',
                                color: colors.onSurface + '61',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: { variant: 'tonal' },
                        style: {
                            backgroundColor: colors.secondaryContainer,
                            color: colors.onSecondaryContainer,
                            '&:hover': {
                                backgroundColor: colors.secondaryContainer,
                                filter: 'brightness(0.9)',
                            },
                            '&:disabled': {
                                backgroundColor: colors.onSurface + '1F',
                                color: colors.onSurface + '61',
                            },
                        },
                    },
                ],
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: colors.surface,
                        color: colors.onSurface,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: colors.surface,
                        color: colors.onSurface,
                        borderRadius: 12,
                    },
                },
            },
        },
    })
}

// デフォルトテーマ（ライトモード）
export const theme = createMaterialTheme('light')
