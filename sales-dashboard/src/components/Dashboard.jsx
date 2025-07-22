import React, { useContext } from 'react';
import { StockContext } from '../context/StockContext';
import StockChart from './StockChart';
import DatePicker from './DatePicker';
import DraggableStock from './DraggableStock';

const Dashboard = () => {
  const { stocks } = useContext(StockContext);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Interactive Stock Dashboard</h1>
        <p className="text-gray-600">
          View stock price data with interactive charts. Drag and drop stock symbols to change the displayed chart.
        </p>
      </div>
      
      <DatePicker />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Stock Symbols</h2>
            <p className="text-sm text-gray-500 mb-4">Drag symbols to chart or click to select</p>
            
            <div className="space-y-2">
              {stocks.map((symbol) => (
                <DraggableStock key={symbol} symbol={symbol} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <StockChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;