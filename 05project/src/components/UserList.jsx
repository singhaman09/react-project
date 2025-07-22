import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


const users=[
    {id:1,name:'p1',description:'this is car'},
    {id:2,name:'p2',description:'this is bike'},
    {id:3,name:'p3',description:'this is cycle'}
  ]
const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [filteredUsers, setFilteredUsers] = useState(users);  //this will has list of list record match , initial it is original 
 

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
