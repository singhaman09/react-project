import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import Focusable from "../component/focusable";

function FocusableList({ children }) {
  const { ref } = useFocusable({
    focusKey: "user-list",
    trackChildren: true,
    autoRestoreFocus: true,
    preferredChildFocusKey: "user-0",
  });

  return (
    <div ref={ref} className="grid gap-3" style={{ outline: "none" }}>
      {children}
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const { ref, focusKey } = useFocusable({ 
    focusKey: "USER_PAGE", 
    trackChildren: true,
    preferredChildFocusKey: "user-0"
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
        // Set focus to first user after loading
        setTimeout(() => {
          setFocus("user-0");
        }, 100);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-4 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="p-4 min-h-screen bg-black text-white flex flex-col gap-4">
        <Header />
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">Users ({users.length})</h1>

          <FocusableList>
            {users.map((user, index) => {
              const goToDetail = () => navigate(`/user/${user.id}`);
              const focusId = `user-${index}`;

              return (
                <Focusable
                  key={user.id}
                  focusKey={focusId}
                  onEnterPress={goToDetail}
                  onClick={goToDetail}
                >
                  {(focused) => (
                    <div
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        focused 
                          ? "border-blue-500 bg-gray-700 shadow-lg scale-105" 
                          : "border-gray-600 bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {user.image && (
                          <img 
                            src={user.image} 
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.firstName} {user.lastName}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {user.email}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Age: {user.age} • {user.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Focusable>
              );
            })}
          </FocusableList>
        </div>
        
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default UserList;