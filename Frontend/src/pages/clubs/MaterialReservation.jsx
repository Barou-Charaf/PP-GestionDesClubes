import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReserveMaterial from './ReserveMaterial';
import MyMaterialReservations from './MyMaterialReservations';
import Cookies from 'js-cookie';

const MaterialReservation = ({ materiel, setMateriel, clubId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reserve, setReserve] = useState(false);
  const [seeReservations, setSeeReservations] = useState(false);
  const token = Cookies.get('auth_token');

  const { data: allReservations = [], isLoading } = useQuery({
    queryKey: ['material-reservations'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/materials', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data.map(r => ({
        id: r.id,
        reason: r.pdf_demande,
        date: new Date(r.created_at).toLocaleDateString(),
        status: r.status,
        type: r.status === 'pending' ? 'upcoming' : 'past',
        clubId: r.club_id
      }));
    },
    enabled: !!token,
  });

  // 1️⃣ Filter down to *this* club’s reservations
  const myClubReservations = allReservations.filter(
    r => Number(r.clubId) === Number(clubId)
  );

  // 2️⃣ Pagination based on that filtered list
  const perPage = 5;
  const totalPages = Math.ceil(myClubReservations.length / perPage) || 1;
  const idxLast = currentPage * perPage;
  const idxFirst = idxLast - perPage;
  const currentReservations = myClubReservations.slice(idxFirst, idxLast);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <section className="absolute top-30 left-0 right-0 z-100 h-full bg-gradient-to-b from-[#e6f0ff] to-white p-6">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => setSeeReservations(true)}
          className="btn bg-white text-gray-900 rounded-full border border-gray-300 hover:bg-black hover:text-white"
        >
          My Reservations
        </button>
        <button
          onClick={() => setReserve(true)}
          className="btn bg-white text-gray-900 rounded-full border border-gray-300 hover:bg-black hover:text-white"
        >
          Reserve
        </button>
      </div>

      <div className="bg-white relative p-4 rounded-lg shadow-md w-full max-w-5xl mx-auto">
        <button
          onClick={() => setMateriel(false)}
          className="btn absolute -left-4 -top-5 bg-white border border-gray-300 size-11 p-0 rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Material Reservations</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Reason</th>
                <th className="px-6 py-3 text-left">Reserved At</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4">{reservation.id}</td>
                  <td className="px-6 py-4">
                    <a
                      href={reservation.reason}
                      download
                      className="btn text-white py-2 w-40"
                    >
                      Download
                    </a>
                  </td>
                  <td className="px-6 py-4">{reservation.date}</td>
                  <td className="px-6 py-4">{reservation.status || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 3️⃣ Working pagination on the filtered list */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn px-3 py-2 border border-gray-300 bg-white rounded-l-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="px-4 py-2 border-t border-b border-gray-300">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn px-3 py-2 border border-gray-300 bg-white rounded-r-md disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {reserve && (
        <ReserveMaterial
          setReserve={setReserve}
          clubId={clubId}
          token={token}
        />
      )}
      {seeReservations && (
        <MyMaterialReservations
          reservations={myClubReservations}
          setSeeReservations={setSeeReservations}
          token={token}
        />
      )}
    </section>
  );
};

export default MaterialReservation;
