import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.list.find((u) => u.id === parseInt(id))
  );

  if (!user) return <div className="text-center py-10">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to User List</Link>
      <h1 className="text-3xl font-bold mb-6">User Details</h1>
      <div className="bg-white shadow rounded-lg p-6 grid grid-cols-4">
        <p className="mb-2"><span className="font-semibold">First Name:</span> {user.firstName}</p>
        <p className="mb-2"><span className="font-semibold">Last Name:</span> {user.lastName}</p>
        <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="mb-2"><span className="font-semibold">Phone:</span> {user.phone}</p>
        <p className="mb-2"><span className="font-semibold">Company Name:</span> {user.company.name}</p>
        <p className="mb-2"><span className="font-semibold">Company Address:</span> {user.company.address.address}, {user.company.address.city}</p>
        <p className="mb-2"><span className="font-semibold">Company Department:</span> {user.company.department}</p>
        <p className="mb-2"><span className="font-semibold">Company Title:</span> {user.company.title}</p>
      </div>
    </div>
  );
};

export default UserDetails;