import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import Focusable from "../component/focusable";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { ref, focusKey } = useFocusable({
    focusKey: "USER_DETAIL_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "back-button",
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`https://dummyjson.com/users/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
        // Set focus to back button after loading
        setTimeout(() => {
          setFocus("back-button");
        }, 100);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-400">User not found</div>
      </div>
    );
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <Focusable 
              focusKey="back-button" 
              onEnterPress={() => navigate(-1)}
              onClick={() => navigate(-1)}
            >
              {(focused) => (
                <button
                  className={`mb-6 px-4 py-2 rounded transition-all ${
                    focused 
                      ? "bg-blue-600 ring-2 ring-blue-400 scale-105" 
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  ← Back to Users
                </button>
              )}
            </Focusable>

            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <div className="flex items-center gap-6 mb-8">
                {user.image && (
                  <img 
                    src={user.image} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                  />
                )}
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-400 text-lg">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Personal Information</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Age:</span> {user.age}</p>
                      <p><span className="text-gray-400">Gender:</span> {user.gender}</p>
                      <p><span className="text-gray-400">Phone:</span> {user.phone}</p>
                      <p><span className="text-gray-400">Birth Date:</span> {user.birthDate}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Address</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Street:</span> {user.address?.address}</p>
                      <p><span className="text-gray-400">City:</span> {user.address?.city}</p>
                      <p><span className="text-gray-400">State:</span> {user.address?.state}</p>
                      <p><span className="text-gray-400">Postal Code:</span> {user.address?.postalCode}</p>
                      <p><span className="text-gray-400">Country:</span> {user.address?.country}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Professional</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Department:</span> {user.company?.department}</p>
                      <p><span className="text-gray-400">Company:</span> {user.company?.name}</p>
                      <p><span className="text-gray-400">Title:</span> {user.company?.title}</p>
                      <p><span className="text-gray-400">University:</span> {user.university}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Physical</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Height:</span> {user.height} cm</p>
                      <p><span className="text-gray-400">Weight:</span> {user.weight} kg</p>
                      <p><span className="text-gray-400">Eye Color:</span> {user.eyeColor}</p>
                      <p><span className="text-gray-400">Hair Color:</span> {user.hair?.color}</p>
                      <p><span className="text-gray-400">Hair Type:</span> {user.hair?.type}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Account Info</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Username:</span> {user.username}</p>
                      <p><span className="text-gray-400">IP Address:</span> {user.ip}</p>
                      <p><span className="text-gray-400">MAC Address:</span> {user.macAddress}</p>
                      <p><span className="text-gray-400">User Agent:</span> {user.userAgent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default UserDetail;