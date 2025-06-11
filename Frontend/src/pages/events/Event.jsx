import { useState, useMemo } from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Header from '../landing/Components/Header';
import BigFooter from "../BigFooter";

export default function Event() {
  const { id : eventId } = useParams(); // Get the eventId from the URL

  console.log("Current eventId from URL:", eventId); // Debugging: Check if eventId is correct

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      if (!eventId) {
        // If eventId is null/undefined, throw an error immediately to prevent the query
        // This usually happens if the route parameter isn't correctly configured
        throw new Error("Event ID is missing from the URL. Check your router configuration.");
      }
      try {
        const res = await axios.get(`http://localhost:8000/api/activities/${eventId}`);
        if (res.status === 404) {
          // If the API returns a 404, consider it a "not found" scenario
          throw new Error("Event not found.");
        }
        return res.data;
      } catch (err) {
        console.error("Error fetching event:", err); // Log the actual error
        // Re-throw the error so react-query can catch it and set isError to true
        throw new Error(err.response?.data?.message || err.message || "Failed to fetch event.");
      }
    },
    enabled: !!eventId, // Only run the query if eventId is a truthy value
    retry: 1, // Try fetching once more on failure
  });

  // Normalize image URLs similar to DisplayEventAnnounce
  const images = useMemo(() => {
    const toFullUrl = (img) => {
      if (typeof img === "string") {
        return img.startsWith("http") ? img : `http://localhost:8000${img.startsWith("/") ? "" : "/"}${img}`;
      }
      return null;
    };

    if (event && Array.isArray(event.images)) {
      return event.images.map(toFullUrl).filter(Boolean);
    }
    return [];
  }, [event]);


  return (
    <main>
      <section className='px-5 py-2 pt-5 bg-gray-100'>
        <Header />
      </section>

      <section
        className='bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh] pt-30 px-10 relative'
      >
        {isLoading && (
          <p className="text-center text-gray-500 py-10">Loading event details…</p>
        )}

        {isError && (
          <p className="text-center text-red-500 py-10">
            Error: {error?.message || "An unexpected error occurred while fetching the event."}
            <br />
            Please ensure the event ID is valid and the API is running.
          </p>
        )}

        {!isLoading && !isError && event ? (
          <section>
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[28rem] ">
              {images.length > 0 ? (
                // Limiting to 5 images for the grid layout (adjust if your design supports more)
                images.slice(0, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`event-${index}`}
                    className={`w-full h-full object-cover rounded-2xl 
                                ${index === 0 ? 'col-span-2 row-span-2' : ''} 
                                ${index !== 0 ? 'aspect-square' : ''}
                                ${index === 0 ? '' : 'transition-transform transform '}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback.png"; // Fallback image if loading fails
                    }}
                  />
                ))
              ) : (
                <div className="col-span-4 row-span-2 flex items-center justify-center bg-gray-200 rounded-2xl">
                  <p className="text-gray-500">No images available for this event.</p>
                </div>
              )}
            </div>

            <div className="pl-20 pr-10 pt-10">
              <h1 className="text-4xl tracking-wider text-gray-600 font-semibold pt-10 pb-4 ">{event.title}</h1>
              <p
                style={{ wordSpacing: '0.2rem' }}
                className="text-gray-500 text-[.9rem] tracking-wider leading-[1.7rem] pb-40 pl-5">{event.description}</p>
            </div>
          </section>
        ) : (
          // Only show "Event with that Id does not exist" if not loading, no error, and event is falsy
          !isLoading && !isError && (
            <h1 className="text-center text-gray-700 py-10">Event with that Id does not exist.</h1>
          )
        )}
      </section>

      <BigFooter />
    </main>
  );
}