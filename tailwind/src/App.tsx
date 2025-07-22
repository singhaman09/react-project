import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/Dashboard";
import StatsTable from "./components/StatsTable";
import Card from "./components/Card";
import Form from "./components/Form";
import Gallery from "./components/Gallery";
import BlogPost from "./components/BlogPost";
import PricingTable from "./components/PricingTable";
import ButtonGroup from "./components/ButtonGroup";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<StatsTable />} />
      <Route path="card" element={<Card />} />
      <Route path="form" element={<Form />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="blog" element={<BlogPost />} />
      <Route path="pricing" element={<PricingTable />} />
      <Route path="buttons" element={<ButtonGroup />} />
    </Route>
  </Routes>
);

export default App;
