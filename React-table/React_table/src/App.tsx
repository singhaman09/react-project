import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable/DataTable";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <DataTable />
      </main>
      <Footer />
    </div>
  );
};

export default App;
