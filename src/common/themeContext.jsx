import React, { createContext, useContext, useEffect, useState } from 'react'

const themeContext = createContext()

export const useTheme = () => useContext(themeContext)

export const ThemeProvider = ({ children }) => {
  // Initialize theme state with dark mode by default or from localStorage
  const [theme, setTheme] = useState('dark') // Default theme is dark

  useEffect(() => {
    // Check for stored theme in localStorage when component mounts
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // If no saved theme, set to 'dark' initially
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    // Apply the theme to the document body
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme) // Store the preference in localStorage
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  )
}
