import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import SearchBar from "../component/SearchBar";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/footer";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const { search } = useContext(AppContext);
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2"
      )
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Countries</h1>

      {/* <button
        className="bg-red-500 text-white px-3 py-1 rounded mb-4"
        onClick={() => logout(() => navigate("/"))}
      >
        Logout
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded mb-4 ml-4"
        onClick={() => navigate("/users")}
      >
        Users
      </button> */}
      <SearchBar />
      <ul className="grid gap-3">
        {countries
          .filter((c) =>
            c.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <li key={country.cca3}>
              <Link
                to={`/country/${country.name.common}`}
                className="text-blue-500 hover:underline"
              >
                {country.name.common}
              </Link>
            </li>
          ))}
      </ul>
      <Footer />
    </div>
    </>
  );
}

export default CountryList;
