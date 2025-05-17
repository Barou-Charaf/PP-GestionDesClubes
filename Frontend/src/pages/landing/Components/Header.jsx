import { Link } from "react-router-dom"
import ensetLogo from "../../../assets/ensetLogo.png"
export default function Header() {
  return (
    <header className="flex justify-between h-20  items-center w-full z-20 ">
       <span className="flex items-center gap-6">
       <img src={ensetLogo} alt="Ensetlogo"  className="w-40" />
        <ul className="flex  flex-wrap  justify-center p-3 text-sm font-medium text-gray-500 
        " >
            <Link
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Home</li></Link>
            <Link
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Clubs</li></Link>
            <Link
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Events</li></Link>
            <Link
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Announcement</li></Link>
            <Link
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Resources</li></Link>
        </ul>
       </span>
        <button
         className="btn"
        >
          <Link to="/login">Log In</Link>
        </button>
    </header>
  )
}
