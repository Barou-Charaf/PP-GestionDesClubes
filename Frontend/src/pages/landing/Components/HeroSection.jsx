import { Link } from "react-router-dom";
import emiu from "../../../assets/emiu.png";
import enset from "../../../assets/enset.jpeg";
import Geeks from "../../../assets/Geeks.jpeg";
import mechatronic from "../../../assets/mechatronic.jpeg";
import Rotaract from "../../../assets/Rotaract.jpeg";
import Rotaract2 from "../../../assets/Rotaract2.jpeg";
import Rotaract3 from "../../../assets/Rotaract3.jpeg";
import { useNavigate } from "react-router-dom";


export default function HeroSection() {
  const navigte = useNavigate();
  return (
    <section className="sm:w-full  flex justify-between items-center 
    mt-10 pl-20 
    z-20
    ">
      <div className="w-[50%] flex flex-col gap-5 pt-15 ">
        <h1 className="text-6xl font-[500] text-gray-700 ">
        Education is the <br /> kindling of a flame, not the filling of a vessel
        </h1>
        <p className="text-gray-400 text-[.7rem]">
        At ENSET, learning is a journey of discovery, where minds meet to spark change.
        </p>
        <span className="flex gap-5 items-center">
          <button 
          onClick={()=>{
            navigte("/login");
          }}
          className="btn rounded-full">Shape Your Future</button>
          <Link to="/events" className="link
          ">Find Your Path <span
          className="text-[.6rem] font-extrabold"
          >&gt;</span> </Link>
        </span>
      </div>

      <div className="images">

  <div className="absolute bottom-[-10%] right-[5%] z-50 w-20 aspect-[4/3] rounded-full overflow-hidden shadow-lg shadow-violet-100">
    <img src={emiu} alt="emiu" className="w-full h-full object-cover" />
  </div>

  <div className="absolute left-0 z-50 w-56 aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg shadow-violet-100">
    <img src={enset} alt="enset" className="w-full h-full object-cover" />
  </div>

  <div className="absolute top-20 right-0 z-40 w-36 h-[15rem] aspect-[2/3] overflow-hidden shadow-lg shadow-violet-100">
    <img src={Geeks} alt="Geeks" className="w-full h-full object-cover" />
  </div>

  <div className="absolute top-20 right-36 z-40 w-[22rem] h-[15rem] aspect-[3/2] rounded-[2rem] rounded-r-none overflow-hidden shadow-lg shadow-violet-100">
    <img src={Rotaract3} alt="Rotaract3" className="w-full h-full object-cover" />
  </div>

  <div className="absolute top-[10%] left-[50%] z-50 w-[7.5rem] aspect-[4/2] rounded-[2rem] overflow-hidden shadow-lg shadow-violet-100">
    <img src={mechatronic} alt="mechatronic" className="w-full h-full object-cover" />
  </div>

  <div className="absolute left-[15%] bottom-[10%] z-40 w-15 aspect-square rounded-full overflow-hidden shadow-lg shadow-violet-100">
    <img src={Rotaract} alt="Rotaract" className="w-full h-full object-cover" />
  </div>

  <div className="absolute bottom-[-25%] right-[18%] z-40 w-60 aspect-[3/2] rounded-[2rem] overflow-hidden shadow-lg shadow-violet-100">
    <img src={Rotaract2} alt="Rotaract2" className="w-full h-full object-cover" />
  </div>
       </div>


    </section>
  )
}
