import { motion } from "framer-motion";
import { useRef } from "react";
import { useEffect,useState } from "react";



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function DisplayEventAnnounce({ event, clicked }) {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);
  const lastIndex = event.images.length - 1;

  const goNext = (e) => {
    e.stopPropagation();
    setCurrent(c => (c === lastIndex ? 0 : c + 1));
  };
  const goPrev = (e) => {
    e.stopPropagation();
    setCurrent(c => (c === 0 ? lastIndex : c - 1));
  };
  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(v => !v);
  };

  return (
    <div
      className="w-[30%] inline-block m-5 relative cursor-pointer active:scale-[0.99] transition"
      onClick={() => clicked(event.title)}
    >
      <div className="relative overflow-hidden rounded-2xl w-full h-80 mb-5">
        {/* FontAwesome heart */}
        <button
          onClick={toggleLike}
          className="absolute top-2 right-2 text-2xl p-1 focus:outline-none"
        >
          <FontAwesomeIcon
            icon={liked ? solidHeart : regularHeart}
            className={liked ? 'text-red-500' : 'text-white/70'}
          />
        </button>

        {/* Only one image at a time */}
        <img
          src={event.images[current]}
          alt={`slide ${current}`}
          className="w-full h-80 object-cover"
        />

        {/* Prev / Next buttons */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white"
        >
          ›
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-2 right-2 flex space-x-1">
          {event.images.map((_, idx) => (
            <span
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
              className={`
                w-2 h-2 rounded-full cursor-pointer
                ${idx === current ? 'bg-white' : 'bg-white/50'}
              `}
            />
          ))}
        </div>
      </div>

      <h3 className="font-extrabold text-gray-600 mb-1 text-xl">
        {event.title}
      </h3>
      <p className="text-[.8rem] text-gray-500">{event.departement}</p>
    </div>
  );
}
