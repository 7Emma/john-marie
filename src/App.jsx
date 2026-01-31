import { useState } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/Header";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Program from "./pages/Programme";
import RSVP from "./components/RSVP";
import Gifts from "./pages/Gifts";
import RSVPModal from "./components/RSVPModal";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <>
      <NavBar onOpenRSVP={() => setIsRSVPOpen(true)} />
      <Home onOpenRSVP={() => setIsRSVPOpen(true)} />
      <OurStory />
      <Program />
      <RSVP />
      <Gifts />
      <Footer />
      
      {/* Modal RSVP Global */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
      
      {/* Bouton scroll to top */}
      <ScrollToTop />
    </>
  );
}

export default App;
