import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { WhoItsFor } from './components/WhoItsFor'
import { WhoAmI } from './components/WhoAmI'
import { Blueprint } from './components/Blueprint'
import { Packages } from './components/Packages'
import { HowItWorks } from './components/HowItWorks'
import { Boundaries } from './components/Boundaries'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { ReadinessScanner } from './components/ReadinessScanner'
import { Footer } from './components/Footer'

export function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-void-950 dark:text-gray-100">
      <Header />
      <main>
        <Hero />
        <WhoItsFor />
        <Blueprint />
        <Packages />
        <HowItWorks />
        <Boundaries />
        <FAQ />
        <WhoAmI />
        <Contact />
        <ReadinessScanner />
      </main>
      <Footer />
    </div>
  )
}
