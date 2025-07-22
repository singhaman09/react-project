// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import OrderFilters from './components/Orders/OderFilters';
import OrderList from './components/Orders/OrderList';
import WishlistPage from './components/Wishlist/WishlistPage';
import { useOrders } from './hooks/useOrders';
import './styles/global.css';

// Orders Page Component
const OrdersPage: React.FC = () => {
  const {
    orders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    submitRating,
    refreshOrders
  } = useOrders();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <Layout
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      isSidebarOpen={isSidebarOpen}
      sidebarContent={<div>Sidebar Content</div>}
    >
      <OrderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalOrders={orders.length}
      />
      
      <OrderList
        orders={orders}
        loading={loading}
        error={error}
        onRatingSubmit={submitRating}
        onRetry={refreshOrders}
      />
    </Layout>
  );
};

// Home Page Component
const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to M Store</h1>
      <p>Your one-stop destination for fashion and lifestyle</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/orders" style={{ margin: '0 10px', padding: '10px 20px', background: '#ff3f6c', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          View Orders
        </a>
        <a href="/wishlist" style={{ margin: '0 10px', padding: '10px 20px', background: '#ff3f6c', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          View Wishlist
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<div style={{ padding: '20px', textAlign: 'center' }}>Profile Page - Coming Soon</div>} />
          <Route path="/cart" element={<div style={{ padding: '20px', textAlign: 'center' }}>Cart Page - Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;