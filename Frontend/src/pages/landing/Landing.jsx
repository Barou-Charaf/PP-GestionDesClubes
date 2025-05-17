
import FeatursSection from "./Components/FeatursSection.jsx"
import Footer from "./Components/Footer.jsx"
import Header from "./Components/Header.jsx"
import HeroSection from "./Components/HeroSection.jsx"
import Qouts from "./Components/Qouts.jsx"
import ThirdSection from "./Components/ThirdSection.jsx"


export default function Landing() {
  return (
    <section className="
    flex flex-col  z-0 before:z-10 px-6 
    bg-blue-30 h-screen w-full pt-4  relative bg-gradient-to-b from-blue-100 to-white 
    before:content-['ENSET'] before:absolute before:text-[400px] before:text-white before:text-shadow-blue-800 
    before:w-full  before:left-0 
    before:flex before:justify-center items-center  before:font-medium 
    ">
   <Header  />
    <HeroSection />  
    <FeatursSection />
    <ThirdSection />
    <Qouts />
    <Footer />
    </section>
    
  )
}
