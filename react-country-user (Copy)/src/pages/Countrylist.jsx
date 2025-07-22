import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import SearchBar from "../component/SearchBar";
import { AppContext } from "../context/AppContext";
import Focusable from "../component/focusable";

function FocusableList({ children }) {
  const { ref } = useFocusable({
    focusKey: "country-list",
    trackChildren: true,
    autoRestoreFocus: true,
    preferredChildFocusKey: "country-0", // Focus first item by default
  });

  return (
    <div ref={ref} className="grid gap-3" style={{ outline: "none" }}>
      {children}
    </div>
  );
}

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useContext(AppContext);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "search-bar",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,region,capital,flags,cca2")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
        // Set focus to first country after loading
        setTimeout(() => {
          setFocus("country-0");
        }, 100);
      })
      .catch((err) => {
        console.error("Failed to fetch countries", err);
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  // Reset focus when search changes
  useEffect(() => {
    if (filteredCountries.length > 0) {
      setTimeout(() => {
        setFocus("country-0");
      }, 100);
    }
  }, [search, filteredCountries.length]);

  if (loading) {
    return (
      <div className="p-4 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading countries...</div>
      </div>
    );
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="p-4 min-h-screen bg-black text-white flex flex-col gap-4">
        <Header />
        <SearchBar />
        
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">
            Countries ({filteredCountries.length})
          </h2>
          
          {filteredCountries.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No countries found matching "{search}"
            </p>
          ) : (
            <FocusableList>
              {filteredCountries.map((country, index) => {
                const goToDetail = () => navigate(`/country/${country.name?.common}`);
                const focusId = `country-${index}`;

                return (
                  <Focusable
                    key={country.cca2 || country.name?.common || index}
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
                          {country.flags?.png && (
                            <img 
                              src={country.flags.png} 
                              alt={`${country.name?.common} flag`}
                              className="w-8 h-6 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-lg">
                              {country.name?.common || "Unnamed Country"}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {country.region} • {country.capital?.[0] || "No capital"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Focusable>
                );
              })}
            </FocusableList>
          )}
        </div>
        
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default CountryList;