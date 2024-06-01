import './App.css'
import LandingPage from './components/LandingPage/Landingpage' 
import Header from './components/LandingPage/Header'
import FeaturesSection from './components/LandingPage/Features'
import FaqSection from './components/LandingPage/FAQ'
import FooterSec from './components/LandingPage/footer'

function App() {

  return (
    <>
    <Header/>
    <LandingPage />
    <FeaturesSection/>
    <FaqSection/>
    <FooterSec/>
    </>
  )
}

export default App
