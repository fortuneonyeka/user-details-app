import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/UserSlice';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchUser.toLowerCase())
  );

  if (status === 'loading') return <div className="text-center py-10"> <ClipLoader color="#4A90E2" size={50} /></div>;
  if (status === 'failed') return <div className="text-center py-10 text-red-500">Error loading users</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <Link key={user.id} to={`/user/${user.id}`} className="bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg mb-2">Name: {user.firstName} {user.lastName}</h2>
              <p className="text-gray-600 text-sm mb-1">Email: {user.email}</p>
              <p className="text-gray-600 text-sm mb-1">Phone: {user.phone}</p>
            </div>
            <p className="text-gray-500 text-sm mt-2">Company: {user.company.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;