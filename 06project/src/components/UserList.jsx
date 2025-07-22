import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' },
  { id: 4, name: 'Johnathan Davis' },
  { id: 5, name: 'Alice Brown' },
];

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [filteredUsers, setFilteredUsers] = useState(users);

  // Filter users based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value;
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search users"
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
