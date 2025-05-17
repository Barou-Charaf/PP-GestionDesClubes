import { Link } from "react-router-dom"
import ensetLogo from "../../../assets/ensetLogo.png"
import {useState , useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



export default function Header({login}) {

  const [clubs,setClubs]=useState([
    "THis a club number One",
    "THis a club number One",
    "THis a club number One",
    "THis a club number One",
    "THis a club number One",
    "THis a club number One",
    "THis a club number One",
    "THis a club number One",
  ]);

  const clubOptions = [
    { label: 'Football Club', url: '/clubs/football' },
    { label: 'Chess Club', url: '/clubs/chess' },
    { label: 'Coding Club', url: '/clubs/coding' }
  ];

  return (
    <header className="flex justify-between h-20  items-center w-full z-100 ">
       <span className="flex items-center gap-6">
       <img src={ensetLogo} alt="Ensetlogo"  className="w-40" />
        <ul className="flex  flex-wrap  justify-center p-3 text-sm font-medium text-gray-500 
        " >
            <Link to="/"
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Home</li></Link>






            {/* here it is the Clubs logic  */}
            <li
            className="border-[1.5px] border-transparent py-1 mr-2    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            >
           <ClubDropdown options={clubOptions} />

            </li>
            {/* here it ends  */}






            <Link   to="/events"
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Events</li></Link>
            <Link   to="/announcements"
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Announcement</li></Link>
            {/* <Link   
            className="border-[1.5px] border-transparent py-1 px-3    hover:text-gray-900 hover:border-violet-400  rounded    active:scale-98"
            ><li>Resources</li></Link> */}
        </ul>
       </span>
      { login ?
      <button></button> : 
      <button
         className="btn"
        >
          <Link to="/login">Log In</Link>
        </button>}
    </header>
  )
}






const ClubDropdown = ({ options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (url) => {
    navigate(url);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" px-8 flex gap-3 items-center"
      >
        Clubs 
        <FontAwesomeIcon icon={faChevronDown}  className="text-[.7rem]"/>
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((club, index) => (
            <li
              key={index}
              onClick={() => handleNavigate(club.url)}
              className="px-4 py-2 cursor-pointer hover:bg-violet-100 hover:text-violet-700"
            >
              {club.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
