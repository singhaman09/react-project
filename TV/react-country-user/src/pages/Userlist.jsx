import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import{ AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

function UserList() {
  const [users, setUsers] = useState([]);
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Header/>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
     
      {/* <button
        className="bg-red-500 text-white px-3 py-1 rounded mb-4"
        onClick={() => logout(() => navigate("/"))}
      >
        Logout
      </button> */}
      <ul className="grid gap-3">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              to={`/user/${user.id}`}
              className="text-blue-500 hover:underline"
            >
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default UserList;
