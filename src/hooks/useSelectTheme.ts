import { useState, useEffect } from "react"

// Define a type for Theme, which can be 'dark', 'light', or 'system'
type Theme = "dark" | "light" | "system"

// The useTheme custom hook for managing the theme
const useTheme = (
  defaultTheme: Theme = "system",
  storageKey: string = "vite-ui-theme",
) => {
  // useState to hold the current theme state. It initializes the state based on the user's saved preference in localStorage, or defaults to the provided defaultTheme
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  // useEffect hook to apply changes whenever the theme state changes
  useEffect(() => {
    const root = window.document.documentElement // Access the root element of the document
    root.classList.remove("light", "dark") // Remove any existing theme classes
    let effectiveTheme = theme // Initialize effectiveTheme variable with the current theme
    // If the current theme is 'system', determine the effective theme based on the system's preference
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }

    // Add the effective theme class to the root element
    root.classList.add(effectiveTheme)

    // Save the effective theme preference to localStorage
    localStorage.setItem(storageKey, effectiveTheme)
  }, [theme, storageKey]) // Dependencies array, effect runs when these values change

  // Return the theme state and the setTheme function from the hook
  // 'as const' ensures the tuple is readonly [Theme, typeof setTheme]
  // This also allows us to use the same syntax as "useState"
  // Usage in consuming components: `const [theme, setTheme] = useTheme();`
  // return [theme, setTheme] as const

  // You can also export these variables as an object if desired:
  // Usage in consuming components: `const { theme, setTheme } = useTheme();`
  return { theme, setTheme }
}

// Export the custom hook for use in other components
export default useTheme
