import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
    mode: ThemeMode
    toggleMode: () => void
    setMode: (mode: ThemeMode) => void
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

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode)
        localStorage.setItem('theme-mode', newMode)
    }

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

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

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
