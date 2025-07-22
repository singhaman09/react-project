import React, { createContext, useState, useEffect } from 'react';
import { fetchStockData } from '../api/stockApi';

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState(['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META']);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [timeRange, setTimeRange] = useState({ 
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
    endDate: new Date() 
  });
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const getStockData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchStockData(
          selectedStock,
          timeRange.startDate,
          timeRange.endDate
        );
        setStockData(data);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to fetch stock data. Please try again later.');
        setStockData([]);
      } finally {
        setLoading(false);
      }
    };

    getStockData();
  }, [selectedStock, timeRange]);

  const handleDrop = (stockSymbol) => {
    setSelectedStock(stockSymbol);
  };

  return (
    <StockContext.Provider
      value={{
        stocks,
        selectedStock,
        setSelectedStock,
        timeRange,
        setTimeRange,
        stockData,
        loading,
        error,
        handleDrop
      }}
    >
      {children}
    </StockContext.Provider>
  );
};