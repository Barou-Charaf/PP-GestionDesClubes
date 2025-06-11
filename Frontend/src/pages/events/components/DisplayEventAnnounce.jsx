import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function DisplayEventAnnounce({ event, clicked }) {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);

  // Normalize to an array of full image URLs
  const images = useMemo(() => {
    const toFullUrl = (img) => {
      if (typeof img === "string") {
        return img.startsWith("http")
          ? img
          : `http://localhost:8000${img.startsWith("/") ? "" : "/"}${img}`;
      }
      return null;
    };
    if (Array.isArray(event.images))
      return event.images.map(toFullUrl).filter(Boolean);
    if (typeof event.image === "string") return [toFullUrl(event.image)];
    return [];
  }, [event]);

  const hasMultiple = images.length > 1;
  const lastIndex = images.length - 1;

  const goNext = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c === lastIndex ? 0 : c + 1));
  };
  const goPrev = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c === 0 ? lastIndex : c - 1));
  };
  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((v) => !v);
  };

  return (
    <div
      className="w-80 inline-block m-5 relative cursor-pointer transition"
      onClick={() => clicked?.(event.id)}
    >
      <div className="relative overflow-hidden rounded-2xl w-full h-80 mb-5">
        <button
          onClick={toggleLike}
          className="absolute top-2 right-2 text-2xl p-1 focus:outline-none z-10"
        >
          <FontAwesomeIcon
            icon={liked ? solidHeart : regularHeart}
            className={liked ? "text-red-500" : "text-red-400"}
          />
        </button>

        {images.length > 0 ? (
          <img
            src={images[current]}
            alt={`slide ${current}`}
            className="w-full h-80 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.png";
            }}
          />
        ) : (
          <div className="w-full h-80 bg-gray-300 flex items-center justify-center text-gray-600">
            No Image Available
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-violet-400 text-white rounded-full p-2 hover:bg-violet-500 z-10"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-violet-400 text-white rounded-full p-2 hover:bg-violet-500 z-10"
            >
              ›
            </button>
            <div className="absolute bottom-2 right-2 flex space-x-1 z-10">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(idx);
                  }}
                  className={`w-2 h-2 rounded-full cursor-pointer border border-white ${
                    idx === current ? "bg-violet-600" : "bg-violet-300/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Single-line title truncation */}
      <h3 className="font-extrabold text-gray-600 mb-1 text-xl truncate">
        {event.title}
      </h3>

      {/* Multi-line clamp + break any super-long word, then ellipsize */}
      <p
        className="text-[.8rem] text-gray-500 overflow-hidden break-words"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          wordBreak: "break-all",
        }}
      >
        {event.description}
      </p>
    </div>
  );
}
