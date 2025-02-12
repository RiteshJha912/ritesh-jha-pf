import { useState, useEffect } from 'react'
import './App.css'
import Hero from './sections/Hero/hero.jsx'
import Projects from './sections/Projects/projects.jsx'
import Skills from './sections/Skills/skills.jsx'
import Contact from './sections/Contact/contact.jsx'
import Footer from './sections/Footer/footer.jsx'
import Experience from './sections/Experience/experience.jsx'
import LoadingScreen from './common/loadingScreen.jsx'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = 'auto' // Allow scrolling after loading
    } else {
      document.body.style.overflow = 'hidden' // Prevent scrolling while loading
    }
  }, [isLoaded])

  return (
    <>
      {!isLoaded && <LoadingScreen onFinish={() => setIsLoaded(true)} />}
      {isLoaded && (
        <>
          <Hero />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
