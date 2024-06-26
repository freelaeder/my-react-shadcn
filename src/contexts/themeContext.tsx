import {createContext, useContext, useEffect, useState} from "react"
import {ConfigProvider, theme as antdTheme} from "antd";

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const darkTheme = {
    algorithm: antdTheme.darkAlgorithm, token: {
        // 全局字体
        colorText: '#f0f0f0',
        // 全局背景色
        colorBgContainer: '#020817',
        // 全局边框色
        colorBorder: '#303133',
        // 全局字体
        fontFamily: 'MyCustomFont'
    }
}
const lightTheme = {
    algorithm: antdTheme.defaultAlgorithm, token: {
        // 全局字体
        fontFamily: 'MyCustomFont'
    }
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
                                  children,
                                  defaultTheme = "system",
                                  storageKey = "vite-ui-theme",
                                  ...props
                              }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
        console.log(theme,'theme')
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {/*antd*/}
            <ConfigProvider theme={theme === "system" ? {} : theme === "dark" ? darkTheme : lightTheme}>
                {children}
            </ConfigProvider>
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
