// components/site/Navbar.tsx

import { useState, useEffect } from "react"

// The useTheme custom hook for managing the theme using an on/off toggle
const useTheme = (storageKey = "vite-ui-theme") => {
  // useState to hold the current theme state. It initializes the state based on the user's saved preference in localStorage, or defaults to the system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem(storageKey) // Check if a theme preference is saved in localStorage (after first visit)
      ? localStorage.getItem(storageKey) === "true" // Return true if saved preference is 'true', otherwise false
      : window.matchMedia("(prefers-color-scheme: dark)").matches // If no saved preference (a.k.a. this is the user's first visit), use system preference
  })

  // useEffect hook to apply changes whenever the theme state changes
  useEffect(() => {
    const root = window.document.documentElement // Access the root element of the document
    root.classList.remove("light", "dark") // Remove any existing theme classes
    root.classList.add(isDarkMode ? "dark" : "light") // Add the current theme class based on isDarkMode state
    localStorage.setItem(storageKey, isDarkMode.toString()) // Save the current theme preference to localStorage
  }, [isDarkMode, storageKey]) // Dependencies array, effect runs when these values change

  // Function to toggle the theme state
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode) // Set the isDarkMode state to the opposite of its current value

  // Return the theme state and the toggle function from the hook
  return { isDarkMode, toggleDarkMode }
}

export default useTheme

/* 
* Notes on useEffect:

* Purpose: useEffect is used to perform side effects in functional React components. 
    Side effects are operations that can reach outside the functional scope of a React component, affecting other components or non-React parts of the web page, like updating the DOM, making API calls, or interacting with browser APIs (like localStorage in this case).

* Behavior: In the useTheme hook, useEffect is used to:
    1. Update the class of the document's root element (a DOM side effect) whenever the isDarkMode state changes.
    2. Save the theme preference to localStorage when the theme changes.

* This hook runs after the component renders, ensuring that DOM updates are done after the DOM has been painted.

*/
