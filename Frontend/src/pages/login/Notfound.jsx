import React from 'react'
import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        It looks like the club you're looking for doesn't exist, or the page has been moved.
      </p>
      <Link
        to="/"
       className='btn'
>
        Back to Clubs Home
      </Link>
    </div>
  );
}
