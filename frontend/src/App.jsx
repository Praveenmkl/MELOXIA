import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar/Navbar.jsx'
import HeroSection from './sections/Hero/Hero.jsx'
import Creator from './sections/Creator/Creator.jsx'
import Services from './sections/Services/Services.jsx'
import FormSection from './sections/FormSection/FormSection.jsx'
import Footer from './sections/Footer/Footer.jsx'
import Stats from './sections/Stat/Stat.jsx'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSignInClick = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  };

  return (
    <AuthProvider>
      <div>
        <Navbar onSignUpClick={handleSignInClick} />
      <div id="home">
        <HeroSection />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <Creator />
      </div>
      <div id="contact">
        <FormSection/>
      </div>
      <Footer/>
      {isSignInOpen && (
        <SignIn 
          onClose={() => setIsSignInOpen(false)} 
          onSignUpClick={handleSignUpClick}
        />
      )}
      {isSignUpOpen && (
        <SignUp 
          onClose={() => setIsSignUpOpen(false)}
          onSignInClick={handleSignInClick}
        />
      )}
      </div>
    </AuthProvider>
  )
}

export default App