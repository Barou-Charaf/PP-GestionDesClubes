import { useState, useEffect, useContext } from 'react';
import Header from '../landing/Components/Header';
import K from '../../assets/ensetLogo.png'; // Assuming K is a fallback image
import BigFooter from '../BigFooter';
import DisplayEventAnnounce from '../events/components/DisplayEventAnnounce';
import ModifieProfile from './modifieProfile'; // Make sure this path is correct
import AddEvent from './AddEvent';
import AddAnouce from './AddAnounce';
import RoomResrvation from './RoomResrvation';
import MaterialReservation from './MaterialReservation';
import Cookies from 'js-cookie';
import { Contex } from '../../App';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// NEW: Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faLinkedin,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';

export default function ClubProfile() {
  const navigate = useNavigate();
  const { login, setLogin, role } = useContext(Contex);
  const [activeTab, setActiveTab] = useState('announcements');
  const { id: clubId } = useParams();
  const token = Cookies.get('auth_token');

  useEffect(() => {
    if (token && setLogin && typeof setLogin === 'function') {
      setLogin(true);
    }
  }, [token, setLogin]);

  const [edit, setEdit] = useState(false);
  const [materiel, setMateriel] = useState(false);
  const [room, setRoom] = useState(false);
  const [event, setEvent] = useState(false);
  const [anouc, setAnouce] = useState(false);

  const {
    data: club,
    isLoading: clubLoading,
    isError: clubError,
    error: clubErrorData,
    refetch: refetchClub,
  } = useQuery({
    queryKey: ['club-profile', clubId],
    queryFn: async () => {
      if (!clubId || !token) {
        throw new Error("Club ID or token is missing for fetching profile.");
      }
      try {
        const res = await axios.get(`http://localhost:8000/api/clubs/${clubId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data && res.data.logo && !res.data.logo.startsWith('http')) {
          res.data.logo = `http://localhost:8000${res.data.logo.startsWith('/') ? '' : '/'}${res.data.logo}`;
        }
        return res.data;
      } catch (err) {
        console.error("Error fetching club profile:", err);
        throw new Error(err.response?.data?.message || err.message || "Failed to fetch club profile.");
      }
    },
    enabled: !!clubId && !!token,
  });

  const {
    data: contentData = [],
    isLoading: contentLoading,
    isError: contentError,
    error: contentErrorData,
    refetch: refetchContent,
  } = useQuery({
    queryKey: ['club-content', activeTab, clubId],
    queryFn: async () => {
      if (!clubId || !token) {
        throw new Error("Club ID or token is missing for fetching content.");
      }
      const url =
        activeTab === 'announcements'
          ? `http://localhost:8000/api/Clubannouncements/${clubId}`
          : `http://localhost:8000/api/ClubActivity/${clubId}`;

      try {
        const res = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const raw = res.data.data || [];
        return raw.map((item) => ({
          ...item,
          images: (item.images || (item.image ? [item.image] : [])).map(img =>
            img.startsWith('http') ? img : `http://localhost:8000${img.startsWith('/') ? '' : '/'}${img}`
          ).filter(Boolean),
        }));
      } catch (err) {
        console.error(`Error fetching club ${activeTab}:`, err);
        throw new Error(err.response?.data?.message || err.message || `Failed to fetch club ${activeTab}.`);
      }
    },
    enabled: !!clubId && !!token,
  });

  // —————— REPLACED: text loader → spinner ——————
  if (clubLoading) {
    return (
      <div className="flex justify-center text-green-400 items-center py-10 mt-50">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  if (clubError) {
    return (
      <p className="text-center w-fit text-red-400 py-10 border-red-400 border-1 p-10 rounded-2xl my-40 mx-auto">
        Error loading club data: {clubErrorData?.message || 'Unknown error'}
      </p>
    );
  }

  if (!club) {
    return (
      <p className="text-center py-10 text-gray-500">Club not found or inaccessible.</p>
    );
  }

  const handleLoadMore = () => {
    console.log('load more');
  };

  return (
    <>
      <div className="bg-gray-100 pl-5 pt-5 pr-5">
        <Header login={login} />
      </div>

      <main className="p-5 pt-16 bg-gradient-to-b from-[#e7f0ff] to white w-full">
        <div className="flex w-full space-x-10">
          <section className="w-[24%] pt-10 pb-7 flex flex-col bg-gray-100 min-h-130 space-y-8 rounded-3xl items-center">
            <img
              src={club.logo || K}
              alt={club.name}
              width={180}
              className="rounded-full object-cover h-[180px]"
              onError={(e) => { e.target.onerror = null; e.target.src = K; }}
            />
            <div className="w-full text-sm px-5 items-center space-y-1">
              <h2 className="text-[1.4rem] font-bold w-[80%] m-auto">Identity Verification</h2>
              <p className="text-[.8rem] w-[80%] text-gray-600 m-auto tracking-wide mt-3 mb-3">
                Officially recognized by ENSET under Student Affairs Department.
              </p>
              <p className="text-2xl font-bold w-[80%] m-auto">{club.name}</p>
              <p className="text-gray-500 w-[80%] m-auto mt-2 mb-1">
                <FontAwesomeIcon icon={faEnvelope} /> {club.email || 'N/A'}
              </p>
              <p className="text-gray-500 w-[80%] m-auto mb-1">
                <FontAwesomeIcon icon={faPhone} /> {club.phone || 'N/A'}
              </p>
              {club.instagram && (
                <a
                  href={club.instagram.startsWith('http') ? club.instagram : `https://${club.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 w-[80%] m-auto mt-2 mb-1 block hover:underline"
                >
                  <FontAwesomeIcon icon={faInstagram} /> Instagram
                </a>
              )}
              {club.linkedin && (
                <a
                  href={club.linkedin.startsWith('http') ? club.linkedin : `https://${club.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 w-[80%] m-auto mb-1 block hover:underline"
                >
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                </a>
              )}
              {club.facebook && (
                <a
                  href={club.facebook.startsWith('http') ? club.facebook : `https://${club.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 w-[80%] m-auto block hover:underline"
                >
                  <FontAwesomeIcon icon={faFacebook} /> Facebook
                </a>
              )}
            </div>
          </section>

          <section className="w-[75%]">
            <div className="border-b border-gray-300 pb-5">
              <h2 className="text-3xl font-bold text-gray-700">Hello TO [{club.name}]</h2>
              <p className="text-gray-800 text-[1.3rem] underline mt-2">Reviewed By You</p>
            </div>

            {login && (
              <div className="flex p-10 pl-4 space-x-3 flex-wrap">
                <button onClick={() => setEdit(true)} className="btn bg-white text-gray-500 border-gray-200 border rounded-full hover:bg-black hover:text-white mb-2">Edit Profile</button>
                <button onClick={() => setRoom(true)} className=" btn  bg-white text-gray-500 border-gray-200 border rounded-full hover:bg-black hover:text-white mb-2">Room Reservation</button>
                <button onClick={() => setMateriel(true)} className="btn  bg-white text-gray-500 border-gray-200 border rounded-full hover:bg-black hover:text-white mb-2">Material Reservation</button>
                <button onClick={() => setEvent(true)} className="btn  bg-white text-gray-500 border-gray-200 border rounded-full hover:bg-black hover:text-white mb-2">Add Event</button>
                <button onClick={() => setAnouce(true)} className="btn  bg-white text-gray-500 border-gray-200 border rounded-full hover:bg-black hover:text-white mb-2">Add Announcement</button>
              </div>
            )}

            <p className="text-gray-400 text-[.8rem] w-[80%] ml-40 pt-10 leading-7">
              {club.description || 'No club description provided.'}
            </p>
          </section>
        </div>

        <section>
          <div className="pl-8 pb-10 pt-5 flex gap-5">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`btn rounded-full border ${activeTab === 'announcements' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
            >
              Announcements
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`btn rounded-full border ${activeTab === 'events' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
            >
              Events
            </button>
          </div>

          <div>
            {contentLoading ? (
              <div className="flex justify-center items-center py-10">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              </div>
            ) : contentError ? (
              <p className="text-center text-red-500 py-10">Error: {contentErrorData?.message || 'Failed to load content.'}</p>
            ) : contentData.length > 0 ? (
              contentData.map((item) => (
                <DisplayEventAnnounce
                  key={item.id}
                  event={item}
                  onclick={() => {
                    navigateToEvent(item.id);
                  }}
                  clicked={(title) => {
                    if (activeTab === "events") {
                      navigate(`/events/${title}`);
                    } else {
                      navigate(`/announcements/${title}`);
                    }
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No {activeTab} for now</p>
            )}
          </div>

          <p className="text-center p-8 font-extrabold text-gray-600">
            <a onClick={handleLoadMore} className="hover:underline cursor-pointer">
              Paginations or Load on scroll...
            </a>
          </p>
        </section>

        {login && edit && (
          <ModifieProfile
            edit={edit}
            setEdit={setEdit}
            clubId={clubId}
            currentClubData={club}
            token={token}
          />
        )}
        {login && materiel && <MaterialReservation materielReservations={[]} materiel={materiel} setMateriel={setMateriel} clubId={clubId} />}
        {login && room && <RoomResrvation reservations={[]} room={room} setRoom={setRoom} token={token} clubId={clubId} />}
        {login && event && <AddEvent clubId={clubId} setEvent={setEvent} />}
        {login && anouc && <AddAnouce anouce={anouc} setAnouce={setAnouce} onSuccess={refetchContent} />}
      </main>

      <BigFooter />
    </>
  );
}
