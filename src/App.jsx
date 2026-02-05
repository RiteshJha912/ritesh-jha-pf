import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './sections/Hero/hero.jsx'
import ProjectsTeaser from './sections/Projects/ProjectsTeaser.jsx'
import AllProjects from './pages/AllProjects/AllProjects.jsx'
import Skills from './sections/Skills/skills.jsx'
import Contact from './sections/Contact/contact.jsx'
import Footer from './sections/Footer/footer.jsx'
import Experience from './sections/Experience/experience.jsx'
import LoadingScreen from './common/loadingScreen.jsx'
import Navbar from './sections/Navbar/Navbar.jsx'


function App() {
  const [isLoaderFinished, setIsLoaderFinished] = useState(false)
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)

  // Handle loading state bypass for non-home routes
  useEffect(() => {
    if (window.location.pathname !== '/') {
      setIsHeroLoaded(true);
    }
  }, []);
  
  const showLoader = !isLoaderFinished || !isHeroLoaded

  useEffect(() => {
    if (!showLoader) {
      document.body.style.overflow = 'auto' // Allow scrolling after loading
    } else {
      document.body.style.overflow = 'hidden' // Prevent scrolling while loading
    }
  }, [showLoader])

  return (
    <BrowserRouter>
      {showLoader && (
        <LoadingScreen
          onFinish={() => setIsLoaderFinished(true)}
          isHeroLoaded={isHeroLoaded}
        />
      )}
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero onImageLoad={() => setIsHeroLoaded(true)} />
            <ProjectsTeaser />
            <Skills />
            <Experience />
            <Contact />
          </>
        } />
        
        <Route path="/projects" element={<AllProjects />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
