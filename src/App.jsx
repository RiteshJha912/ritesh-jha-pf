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
  const [isLoaderFinished, setIsLoaderFinished] = useState(false)
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  
  const showLoader = !isLoaderFinished || !isHeroLoaded

  useEffect(() => {
    if (!showLoader) {
      document.body.style.overflow = 'auto' // Allow scrolling after loading
    } else {
      document.body.style.overflow = 'hidden' // Prevent scrolling while loading
    }
  }, [showLoader])

  return (
    <>
      {showLoader && (
        <LoadingScreen
          onFinish={() => setIsLoaderFinished(true)}
          isHeroLoaded={isHeroLoaded}
        />
      )}
      
      <Hero onImageLoad={() => setIsHeroLoaded(true)} />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}

export default App
