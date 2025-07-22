import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";
import Focusable from "../component/focusable";

function CountryDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const { ref, focusKey } = useFocusable({
    focusKey: "COUNTRY_DETAIL_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "back-button",
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(res => {
        setCountry(res.data[0]);
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
  }, [name]);

  if (loading) {
    return (
      <div className="p-4 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading country details...</div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="p-4 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Country not found</div>
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
                  ← Back to Countries
                </button>
              )}
            </Focusable>

            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <div className="flex items-center gap-6 mb-8">
                {country.flags?.png && (
                  <img 
                    src={country.flags.png} 
                    alt={`${country.name.common} flag`}
                    className="w-24 h-16 object-cover rounded-lg shadow-md"
                  />
                )}
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {country.name.common}
                  </h1>
                  {country.name.official && country.name.official !== country.name.common && (
                    <p className="text-gray-400 text-lg">
                      Official: {country.name.official}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Basic Information</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Capital:</span> {country.capital?.[0] || "N/A"}</p>
                      <p><span className="text-gray-400">Region:</span> {country.region}</p>
                      <p><span className="text-gray-400">Subregion:</span> {country.subregion || "N/A"}</p>
                      <p><span className="text-gray-400">Population:</span> {country.population?.toLocaleString() || "N/A"}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Geography</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Area:</span> {country.area?.toLocaleString() || "N/A"} km²</p>
                      <p><span className="text-gray-400">Landlocked:</span> {country.landlocked ? "Yes" : "No"}</p>
                      {country.borders && country.borders.length > 0 && (
                        <p><span className="text-gray-400">Borders:</span> {country.borders.join(", ")}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Culture & Language</h3>
                    <div className="space-y-2">
                      {country.languages && (
                        <p><span className="text-gray-400">Languages:</span> {Object.values(country.languages).join(", ")}</p>
                      )}
                      {country.currencies && (
                        <p><span className="text-gray-400">Currencies:</span> {
                          Object.values(country.currencies).map(currency => 
                            `${currency.name} (${currency.symbol || ""})`
                          ).join(", ")
                        }</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2">Other Information</h3>
                    <div className="space-y-2">
                      <p><span className="text-gray-400">Timezone:</span> {country.timezones?.[0] || "N/A"}</p>
                      <p><span className="text-gray-400">Calling Code:</span> {country.idd?.root || "N/A"}{country.idd?.suffixes?.[0] || ""}</p>
                      <p><span className="text-gray-400">Top Level Domain:</span> {country.tld?.[0] || "N/A"}</p>
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

export default CountryDetail;