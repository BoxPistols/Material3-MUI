import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'

type ThemeMode = 'light' | 'dark'
type DesignVersion = 'md2' | 'md3'

interface ThemeContextType {
    mode: ThemeMode
    toggleMode: () => void
    setMode: (mode: ThemeMode) => void
    primaryColor: string
    setPrimaryColor: (color: string) => void
    useOriginalColor: boolean
    setUseOriginalColor: (use: boolean) => void
    designVersion: DesignVersion
    setDesignVersion: (version: DesignVersion) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        try {
            // ローカルストレージから初期値を取得
            const savedMode = localStorage.getItem('theme-mode')
            if (savedMode === 'light' || savedMode === 'dark') {
                return savedMode
            }
        } catch (error) {
            console.error('Failed to read theme mode from localStorage:', error)
        }
        // システム設定を確認
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    })

    const [primaryColor, setPrimaryColorState] = useState<string>(() => {
        try {
            // ローカルストレージからプライマリカラーを取得
            const savedColor = localStorage.getItem('primary-color')
            if (savedColor) return savedColor
        } catch (error) {
            console.error('Failed to read primary color from localStorage:', error)
        }
        return '#003366' // 濃紺をデフォルトに設定
    })

    const [useOriginalColor, setUseOriginalColorState] = useState<boolean>(() => {
        try {
            // ローカルストレージからオリジナル色使用設定を取得
            const savedSetting = localStorage.getItem('use-original-color')
            return savedSetting === 'true' || savedSetting === null // デフォルトでtrueに設定
        } catch (error) {
            console.error('Failed to read use-original-color from localStorage:', error)
            return true
        }
    })

    const [designVersion, setDesignVersionState] = useState<DesignVersion>(() => {
        try {
            // ローカルストレージからデザインバージョンを取得
            const savedVersion = localStorage.getItem('design-version')
            if (savedVersion === 'md2' || savedVersion === 'md3') {
                return savedVersion
            }
        } catch (error) {
            console.error('Failed to read design version from localStorage:', error)
        }
        return 'md3'
    })

    const setMode = useCallback((newMode: ThemeMode) => {
        setModeState(newMode)
        try {
            localStorage.setItem('theme-mode', newMode)
        } catch (error) {
            console.error('Failed to save theme mode to localStorage:', error)
        }
    }, [])

    const setPrimaryColor = useCallback((newColor: string) => {
        setPrimaryColorState(newColor)
        try {
            localStorage.setItem('primary-color', newColor)
        } catch (error) {
            console.error('Failed to save primary color to localStorage:', error)
        }
    }, [])

    const setUseOriginalColor = useCallback((use: boolean) => {
        setUseOriginalColorState(use)
        try {
            localStorage.setItem('use-original-color', use.toString())
        } catch (error) {
            console.error('Failed to save use-original-color to localStorage:', error)
        }
    }, [])

    const setDesignVersion = useCallback((version: DesignVersion) => {
        setDesignVersionState(version)
        try {
            localStorage.setItem('design-version', version)
        } catch (error) {
            console.error('Failed to save design version to localStorage:', error)
        }
    }, [])

    const toggleMode = useCallback(() => {
        setModeState((prev) => {
            const newMode = prev === 'light' ? 'dark' : 'light'
            try {
                localStorage.setItem('theme-mode', newMode)
            } catch (error) {
                console.error('Failed to save theme mode to localStorage:', error)
            }
            return newMode
        })
    }, [])

    // システム設定の変更を監視
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            try {
                // ローカルストレージに保存された設定がない場合のみシステム設定に従う
                if (!localStorage.getItem('theme-mode')) {
                    setModeState(e.matches ? 'dark' : 'light')
                }
            } catch (error) {
                console.error('Failed to check localStorage in system theme listener:', error)
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const value = useMemo(() => ({
        mode,
        toggleMode,
        setMode,
        primaryColor,
        setPrimaryColor,
        useOriginalColor,
        setUseOriginalColor,
        designVersion,
        setDesignVersion
    }), [mode, primaryColor, useOriginalColor, designVersion, toggleMode, setMode, setPrimaryColor, setUseOriginalColor, setDesignVersion])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
