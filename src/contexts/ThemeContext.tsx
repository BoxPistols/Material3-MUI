import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
    mode: ThemeMode
    toggleMode: () => void
    setMode: (mode: ThemeMode) => void
    primaryColor: string
    setPrimaryColor: (color: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        // ローカルストレージから初期値を取得
        const savedMode = localStorage.getItem('theme-mode') as ThemeMode
        if (savedMode === 'light' || savedMode === 'dark') {
            return savedMode
        }
        // システム設定を確認
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    })

    const [primaryColor, setPrimaryColorState] = useState<string>(() => {
        // ローカルストレージからプライマリカラーを取得
        const savedColor = localStorage.getItem('primary-color')
        return savedColor || '#65558F' // デフォルトのMaterial Design 3 Purple
    })

    const setMode = useCallback((newMode: ThemeMode) => {
        setModeState(newMode)
        localStorage.setItem('theme-mode', newMode)
    }, [])

    const setPrimaryColor = useCallback((newColor: string) => {
        setPrimaryColorState(newColor)
        localStorage.setItem('primary-color', newColor)
    }, [])

    const toggleMode = useCallback(() => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }, [mode, setMode])

    // システム設定の変更を監視
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            // ローカルストレージに保存された設定がない場合のみシステム設定に従う
            if (!localStorage.getItem('theme-mode')) {
                setModeState(e.matches ? 'dark' : 'light')
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
        setPrimaryColor
    }), [mode, primaryColor, toggleMode, setMode, setPrimaryColor])

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
