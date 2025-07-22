import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStart } from '../features/functions';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    //dispatches fetchUserStart
    dispatch(fetchUserStart());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 bg-black">
      <h2 className="text-4xl font-bold mb-4 text-center border rounded-lg bg-white px-4 py-3">User  Listing</h2>
      {loading && <p className="text-blue-500 text-center text-4xl text-white">Loading...</p>}
      {/* deals with error */}
      {error && <p className="text-red-500 text-white">Error: {error}</p>}

      {/* list users */}
      <ul className="bg-white shadow-md border rounded-lg bg-black">

        {users.map((user) => (
          <li key={user.id} className="p-4 border-b last:border-b-0 hover:bg-gray-100 mx-1 my-3 py-4 text-black">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;