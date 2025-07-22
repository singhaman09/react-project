import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authentication";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import { toast } from "react-toastify";


export default function Dashboard() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!",{
      toastId: 'success1',
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-purple-400">
      <Header />

      <main className="my-8 bg-purple-800 mx-4 rounded-2xl px-6 py-10 shadow-lg mt-3 flex flex-col items-center justify-center text-center space-y-6 flex-grow">
        <h1 className="text-4xl font-bold text-zinc-100">Welcome to Your Dashboard</h1>
        <p className="text-lg text-zinc-300">
          Here you can manage your profile, view orders, and explore more options tailored for you.
        </p>

        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-purple-900 rounded-lg cursor-pointer font-bold transition"
        >
          Logout
        </button>
      </main>

      <Footer />
    </div>
  );
}
