import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import Focusable from "./focusable";

function Header() {
  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "header-nav",
    preferredChildFocusKey: "nav-country",
    trackChildren: true,
  });

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Country & User App</h1>
      {isLoggedIn && (
        <FocusContext.Provider value={focusKey}>
          <nav ref={ref} className="flex gap-4">
            <Focusable 
              onEnterPress={() => navigate("/country")} 
              focusKey="nav-country"
              onClick={() => navigate("/country")}
            >
              {(focused) => (
                <button
                  className={`cursor-pointer px-3 py-2 rounded transition-colors ${
                    focused 
                      ? "bg-blue-600 text-white border-2 border-blue-400" 
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  Countries
                </button>
              )}
            </Focusable>

            <Focusable 
              onEnterPress={() => navigate("/users")} 
              focusKey="nav-users"
              onClick={() => navigate("/users")}
            >
              {(focused) => (
                <button
                  className={`cursor-pointer px-3 py-2 rounded transition-colors ${
                    focused 
                      ? "bg-blue-600 text-white border-2 border-blue-400" 
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  Users
                </button>
              )}
            </Focusable>

            <Focusable 
              onEnterPress={() => logout(() => navigate("/"))} 
              focusKey="nav-logout"
              onClick={() => logout(() => navigate("/"))}
            >
              {(focused) => (
                <button
                  className={`px-3 py-2 rounded transition-colors ${
                    focused 
                      ? "bg-red-700 text-white border-2 border-red-400" 
                      : "bg-red-600 text-white"
                  }`}
                >
                  Logout
                </button>
              )}
            </Focusable>
          </nav>
        </FocusContext.Provider>
      )}
    </header>
  );
}

export default Header;