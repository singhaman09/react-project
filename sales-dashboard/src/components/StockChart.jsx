import React, { useState, useContext } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';
import { StockContext } from '../context/StockContext';
// import Loading from './Loading';
import StockDropZone from './StockDropZone';

const StockChart = () => {
  const { stockData, selectedStock, loading, error } = useContext(StockContext);
  const [chartType, setChartType] = useState('line');
  
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const ChartSkeleton = () => (
    <div className="animate-pulse h-[400px] w-full bg-gray-100 rounded-md flex flex-col justify-end px-4 py-2">
      <div className="h-2 w-3/4 bg-gray-300 rounded mb-2"></div>
      <div className="h-64 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 mt-4 rounded"></div>
    </div>
  );
  

  const renderChartTypeSelector = () => {
    return (
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Chart Type</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handleChartTypeChange('line')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => handleChartTypeChange('area')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'area' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => handleChartTypeChange('bar')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Bar
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <ChartSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <StockDropZone>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </StockDropZone>
    );
  }

  if (!stockData || stockData.length === 0) {
    return (
      <StockDropZone>
        <div className="bg-white p-4 rounded-lg shadow-md h-96">
          <div className="text-center">No data available for {selectedStock}</div>
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Drag and drop a stock symbol here</p>
            </div>
          </div>
        </div>
      </StockDropZone>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickCount={5}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => `$${value.toFixed(2)}`} 
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="close" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Close Price" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickCount={5}
              />
              {/* Left Y-axis for price */}
              <YAxis 
                yAxisId="price"
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              {/* Right Y-axis for volume */}
              <YAxis
                yAxisId="volume"
                orientation="right"
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "Volume") {
                    return [`${(value / 1000000).toFixed(1)}M`, name];
                  }
                  return [`$${value.toFixed(2)}`, name];
                }}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Bar dataKey="close" fill="#82ca9d" name="Close Price" yAxisId="price" />
              <Bar dataKey="volume" fill="#8884d8" name="Volume" yAxisId="volume" />
            </BarChart>
          </ResponsiveContainer>
        );
        
      default: // Line chart (default)
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickCount={5}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => `$${value.toFixed(2)}`} 
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#8884d8" 
                name="Close Price" 
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="open" 
                stroke="#82ca9d" 
                name="Open Price" 
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <StockDropZone>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{selectedStock} Stock Price</h2>
          <div className="text-sm text-gray-500">
            {stockData.length > 0 && `${stockData[0].date} - ${stockData[stockData.length - 1].date}`}
          </div>
        </div>
        
        {renderChartTypeSelector()}
        
        <div className="mt-4">
          {renderChart()}
        </div>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          Drag and drop any stock symbol to change the chart
        </div>
      </div>
    </StockDropZone>
  );
};

export default StockChart;