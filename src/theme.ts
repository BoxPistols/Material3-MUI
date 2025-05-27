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

// 彩度の低い色（グレースケール）かどうかを判定する関数
const isGrayscale = (hex: string): boolean => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // RGB値の差が小さい場合はグレースケールと判定
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return maxDiff < 10;
};

// グレースケール色用の特別なカラーパレットを生成する関数
const generateGrayscaleColors = (primaryColor: string) => {
    const r = parseInt(primaryColor.slice(1, 3), 16);
    const g = parseInt(primaryColor.slice(3, 5), 16);
    const b = parseInt(primaryColor.slice(5, 7), 16);
    const brightness = (r + g + b) / 3;
    
    // 明度に基づいてライト/ダークテーマの色を決定
    const isDark = brightness < 128;
    
    return {
        light: {
            primary: primaryColor,
            onPrimary: isDark ? '#FFFFFF' : '#000000',
            primaryContainer: isDark ? '#E0E0E0' : '#F5F5F5',
            onPrimaryContainer: isDark ? '#000000' : '#1C1B1F',
            
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
            inversePrimary: isDark ? '#D0BCFF' : primaryColor,
        },
        dark: {
            primary: isDark ? primaryColor : '#D0BCFF',
            onPrimary: isDark ? '#FFFFFF' : '#371E73',
            primaryContainer: isDark ? '#4F378B' : '#2C2C2C',
            onPrimaryContainer: isDark ? '#EADDFF' : '#E0E0E0',
            
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
            
            background: '#10131C',
            onBackground: '#E6E1E5',
            surface: '#10131C',
            onSurface: '#E6E1E5',
            surfaceVariant: '#49454F',
            onSurfaceVariant: '#CAC4D0',
            
            outline: '#938F99',
            outlineVariant: '#49454F',
            shadow: '#000000',
            scrim: '#000000',
            
            inverseSurface: '#E6E1E5',
            inverseOnSurface: '#313033',
            inversePrimary: '#6750A4',
        },
    };
};

// オリジナル色を保持してカラーパレットを生成する関数
const generateColorsWithOriginalPrimary = (primaryColor: string) => {
    // Material Color Utilitiesで他の色を生成しつつ、プライマリは元の色を使用
    const materialTheme: MaterialTheme = themeFromSourceColor(
        argbFromHex(primaryColor)
    );
    
    // 明度を計算してコントラストテキストを決定
    const r = parseInt(primaryColor.slice(1, 3), 16);
    const g = parseInt(primaryColor.slice(3, 5), 16);
    const b = parseInt(primaryColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const contrastText = brightness > 128 ? '#000000' : '#FFFFFF';
    
    return {
        light: {
            primary: primaryColor, // オリジナル色を使用
            onPrimary: contrastText,
            primaryContainer: argbToHex(materialTheme.palettes.primary.tone(90)),
            onPrimaryContainer: argbToHex(materialTheme.palettes.primary.tone(10)),

            secondary: argbToHex(materialTheme.palettes.secondary.tone(40)),
            onSecondary: argbToHex(materialTheme.palettes.secondary.tone(100)),
            secondaryContainer: argbToHex(materialTheme.palettes.secondary.tone(90)),
            onSecondaryContainer: argbToHex(materialTheme.palettes.secondary.tone(10)),

            tertiary: argbToHex(materialTheme.palettes.tertiary.tone(40)),
            onTertiary: argbToHex(materialTheme.palettes.tertiary.tone(100)),
            tertiaryContainer: argbToHex(materialTheme.palettes.tertiary.tone(90)),
            onTertiaryContainer: argbToHex(materialTheme.palettes.tertiary.tone(10)),

            error: argbToHex(materialTheme.palettes.error.tone(40)),
            onError: argbToHex(materialTheme.palettes.error.tone(100)),
            errorContainer: argbToHex(materialTheme.palettes.error.tone(90)),
            onErrorContainer: argbToHex(materialTheme.palettes.error.tone(10)),

            background: argbToHex(materialTheme.palettes.neutral.tone(99)),
            onBackground: argbToHex(materialTheme.palettes.neutral.tone(10)),
            surface: argbToHex(materialTheme.palettes.neutral.tone(99)),
            onSurface: argbToHex(materialTheme.palettes.neutral.tone(10)),
            surfaceVariant: argbToHex(materialTheme.palettes.neutralVariant.tone(90)),
            onSurfaceVariant: argbToHex(materialTheme.palettes.neutralVariant.tone(30)),

            outline: argbToHex(materialTheme.palettes.neutralVariant.tone(50)),
            outlineVariant: argbToHex(materialTheme.palettes.neutralVariant.tone(80)),
            shadow: argbToHex(materialTheme.palettes.neutral.tone(0)),
            scrim: argbToHex(materialTheme.palettes.neutral.tone(0)),

            inverseSurface: argbToHex(materialTheme.palettes.neutral.tone(20)),
            inverseOnSurface: argbToHex(materialTheme.palettes.neutral.tone(95)),
            inversePrimary: argbToHex(materialTheme.palettes.primary.tone(80)),
        },
        dark: {
            primary: primaryColor, // ダークモードでもオリジナル色を使用
            onPrimary: contrastText,
            primaryContainer: argbToHex(materialTheme.palettes.primary.tone(30)),
            onPrimaryContainer: argbToHex(materialTheme.palettes.primary.tone(90)),

            secondary: argbToHex(materialTheme.palettes.secondary.tone(80)),
            onSecondary: argbToHex(materialTheme.palettes.secondary.tone(20)),
            secondaryContainer: argbToHex(materialTheme.palettes.secondary.tone(30)),
            onSecondaryContainer: argbToHex(materialTheme.palettes.secondary.tone(90)),

            tertiary: argbToHex(materialTheme.palettes.tertiary.tone(80)),
            onTertiary: argbToHex(materialTheme.palettes.tertiary.tone(20)),
            tertiaryContainer: argbToHex(materialTheme.palettes.tertiary.tone(30)),
            onTertiaryContainer: argbToHex(materialTheme.palettes.tertiary.tone(90)),

            error: argbToHex(materialTheme.palettes.error.tone(80)),
            onError: argbToHex(materialTheme.palettes.error.tone(20)),
            errorContainer: argbToHex(materialTheme.palettes.error.tone(30)),
            onErrorContainer: argbToHex(materialTheme.palettes.error.tone(90)),

            background: argbToHex(materialTheme.palettes.neutral.tone(10)),
            onBackground: argbToHex(materialTheme.palettes.neutral.tone(90)),
            surface: argbToHex(materialTheme.palettes.neutral.tone(10)),
            onSurface: argbToHex(materialTheme.palettes.neutral.tone(90)),
            surfaceVariant: argbToHex(materialTheme.palettes.neutralVariant.tone(30)),
            onSurfaceVariant: argbToHex(materialTheme.palettes.neutralVariant.tone(80)),

            outline: argbToHex(materialTheme.palettes.neutralVariant.tone(60)),
            outlineVariant: argbToHex(materialTheme.palettes.neutralVariant.tone(30)),
            shadow: argbToHex(materialTheme.palettes.neutral.tone(0)),
            scrim: argbToHex(materialTheme.palettes.neutral.tone(0)),

            inverseSurface: argbToHex(materialTheme.palettes.neutral.tone(90)),
            inverseOnSurface: argbToHex(materialTheme.palettes.neutral.tone(20)),
            inversePrimary: argbToHex(materialTheme.palettes.primary.tone(40)),
        },
    };
};

// プライマリカラーからカラーパレットを生成する関数
export const generateColorsFromPrimary = (primaryColor: string, useOriginalColor: boolean = false) => {
    // グレースケール色の場合は特別な処理
    if (isGrayscale(primaryColor)) {
        return generateGrayscaleColors(primaryColor);
    }
    
    // オリジナル色を保持する場合の処理
    if (useOriginalColor) {
        return generateColorsWithOriginalPrimary(primaryColor);
    }
    
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

// トーンパレットを生成してエクスポートする関数
const generateTonalPalettesFromPrimary = (primaryColor: string) => {
    const materialTheme: MaterialTheme = themeFromSourceColor(
        argbFromHex(primaryColor)
    )
    // materialTheme.palettesはTonePaletteオブジェクトで、tone(toneNumber)で色を取得できる
    // ここではtone(0)からtone(100)まで10刻みで色を取得してRecord<string, string>に変換する
const convertPalette = (palette: { tone: (tone: number) => number }): Record<string, string> => {
    const tones: Record<string, string> = {}
    for (let tone = 0; tone <= 100; tone += 10) {
        tones[tone.toString()] = argbToHex(palette.tone(tone))
    }
    return tones
}

    return {
        light: {
            primary: convertPalette(materialTheme.palettes.primary),
            secondary: convertPalette(materialTheme.palettes.secondary),
            tertiary: convertPalette(materialTheme.palettes.tertiary),
            error: convertPalette(materialTheme.palettes.error),
            neutral: convertPalette(materialTheme.palettes.neutral),
            neutralVariant: convertPalette(materialTheme.palettes.neutralVariant),
        },
        dark: {
            primary: convertPalette(materialTheme.palettes.primary),
            secondary: convertPalette(materialTheme.palettes.secondary),
            tertiary: convertPalette(materialTheme.palettes.tertiary),
            error: convertPalette(materialTheme.palettes.error),
            neutral: convertPalette(materialTheme.palettes.neutral),
            neutralVariant: convertPalette(materialTheme.palettes.neutralVariant),
        },
    }
}

// デフォルトトーンパレット
const defaultTonalPalettes = generateTonalPalettesFromPrimary(DEFAULT_PRIMARY_COLOR)
export const tonalPalettes = {
    light: defaultTonalPalettes.light,
    dark: defaultTonalPalettes.dark,
}

// MUIテーマを作成する関数（MUI v7ベースコーディングとの親和性向上）
export const createMaterialTheme = (
    mode: 'light' | 'dark',
    primaryColor?: string,
    useOriginalColor?: boolean
) => {
    const colors = primaryColor
        ? generateColorsFromPrimary(primaryColor, useOriginalColor)[mode]
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
                    sizeSmall: {
                        padding: '6px 16px',
                        fontSize: '0.8125rem',
                        minHeight: 32,
                    },
                    sizeMedium: {
                        padding: '8px 20px',
                        fontSize: '0.875rem',
                        minHeight: 40,
                    },
                    sizeLarge: {
                        padding: '12px 24px',
                        fontSize: '0.9375rem',
                        minHeight: 48,
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
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputLabel-root': {
                            position: 'static',
                            transform: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: colors.onSurfaceVariant,
                            marginBottom: '8px',
                            display: 'block',
                            '&.Mui-focused': {
                                transform: 'none',
                                fontSize: '0.875rem',
                                color: colors.primary,
                            },
                            '&.MuiInputLabel-shrink': {
                                transform: 'none',
                                fontSize: '0.875rem',
                            },
                            '&.Mui-error': {
                                color: colors.error,
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: colors.surface,
                            borderRadius: '8px',
                            '& fieldset': {
                                borderColor: colors.outline,
                                borderWidth: '1px',
                            },
                            '&:hover fieldset': {
                                borderColor: colors.onSurfaceVariant,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.primary,
                                borderWidth: '2px',
                            },
                            '&.Mui-error fieldset': {
                                borderColor: colors.error,
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: '12px 16px',
                            },
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: colors.surfaceVariant,
                            borderRadius: '8px 8px 0 0',
                            '&:before': {
                                borderBottomColor: colors.outline,
                            },
                            '&:hover:before': {
                                borderBottomColor: colors.onSurfaceVariant,
                            },
                            '&.Mui-focused:after': {
                                borderBottomColor: colors.primary,
                            },
                            '&.Mui-error:after': {
                                borderBottomColor: colors.error,
                            },
                        },
                        '& .MuiInput-root': {
                            '&:before': {
                                borderBottomColor: colors.outline,
                            },
                            '&:hover:before': {
                                borderBottomColor: colors.onSurfaceVariant,
                            },
                            '&.Mui-focused:after': {
                                borderBottomColor: colors.primary,
                            },
                            '&.Mui-error:after': {
                                borderBottomColor: colors.error,
                            },
                        },
                        '& .MuiFormHelperText-root': {
                            marginTop: '4px',
                            marginLeft: 0,
                            fontSize: '0.75rem',
                            '&.Mui-error': {
                                color: colors.error,
                            },
                        },
                    },
                },
                defaultProps: {
                    InputLabelProps: {
                        shrink: true,
                    },
                },
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        '& .MuiInputLabel-root': {
                            position: 'static',
                            transform: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: colors.onSurfaceVariant,
                            marginBottom: '8px',
                            '&.Mui-focused': {
                                color: colors.primary,
                            },
                            '&.Mui-error': {
                                color: colors.error,
                            },
                        },
                    },
                },
            },
        },
    })
}

// デフォルトテーマ（ライトモード）
export const theme = createMaterialTheme('light')
