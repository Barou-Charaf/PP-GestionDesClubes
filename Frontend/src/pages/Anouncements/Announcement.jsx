import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Header from '../landing/Components/Header';
import BigFooter from '../BigFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Announcement() {
  const { id } = useParams();

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['announcement', id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8000/api/announcements/${id}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      // Extract the announcement object (or undefined if missing)
      const raw = Object.values(res.data)[0];
      if (!raw || typeof raw !== 'object') {
        return null;
      }
      return {
        ...raw,
        images: raw.image ? [raw.image] : [],
      };
    },
    enabled: !!id,
    // don't throw on 404: let us handle `null`
    retry: false,
    onError: (err) => {
      // you can optionally inspect err.response.status === 404 here
    },
  });

  // full‐page loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center text-green-400 items-center py-60">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  // full‐page error
  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading announcement: {error.message}
      </div>
    );
  }

  return (
    <main>
      <section className="px-5 py-2 pt-5 bg-gray-100">
        <Header />
      </section>

      <section className="bg-gradient-to-b from-[#0095ff32] to-white min-h-[70vh] pt-30 px-10 relative mb-30">
        {event ? (
          <>
            <div className="flex w-full h-full justify-center items-center">
              {event.images.map((image, idx) => (
                <img
                  key={idx}
                  src={
                    image.startsWith('http')
                      ? image
                      : `http://localhost:8000${image.startsWith('/') ? '' : '/'}${image}`
                  }
                  alt={`announcement-${idx}`}
                  className="h-[33rem] w-[50rem] object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.png';
                  }}
                />
              ))}
            </div>

            <div className="px-10 pt-3">
              <h1 className="text-4xl tracking-wider text-gray-600 font-semibold pt-10 pb-4">
                {event.title}
              </h1>
              <p
                style={{ wordSpacing: '0.2rem' }}
                className="text-gray-500 text-[.9rem] tracking-wider leading-[1.7rem] pb-40 pl-5"
              >
                {event.description}
              </p>
            </div>
          </>
        ) : (
          <h1 className="text-center text-gray-600 py-20">
            Announcement with that ID does not exist.
          </h1>
        )}
      </section>

      <BigFooter />
    </main>
  );
}
