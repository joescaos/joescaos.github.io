import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Education } from './components/sections/Education'
import { Skills } from './components/sections/Skills'
import { Certifications } from './components/sections/Certifications'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { ScrollToTop } from './components/ui/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-surface-base text-ink-primary font-sans">
      <Navbar />
      <main>
        <Hero />
        <div className="border-t border-surface-border" />
        <About />
        <div className="border-t border-surface-border" />
        <Experience />
        <div className="border-t border-surface-border" />
        <Education />
        <div className="border-t border-surface-border" />
        <Skills />
        <div className="border-t border-surface-border" />
        <Certifications />
        <div className="border-t border-surface-border" />
        <Projects />
        <div className="border-t border-surface-border" />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
