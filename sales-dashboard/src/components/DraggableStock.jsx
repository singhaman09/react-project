import React, { useContext } from 'react';
import { useDraggable } from '../hooks/useDragDrop';
import { StockContext } from '../context/StockContext';

const DraggableStock = ({ symbol }) => {
  const { selectedStock, setSelectedStock } = useContext(StockContext);
  
  // Using our custom drag hook
  const { isDragging, drag } = useDraggable('STOCK', { symbol });
  
  // Handle click to select stock
  const handleClick = () => {
    setSelectedStock(symbol);
  };
  
  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={`
        p-3 mb-2 border rounded-lg cursor-grab
        ${isDragging ? 'opacity-50 bg-gray-100' : ''}
        ${selectedStock === symbol ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}
      `}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
          {symbol.charAt(0)}
        </div>
        <div>
          <p className="font-medium">{symbol}</p>
          <p className="text-xs text-gray-500">Drag to chart</p>
        </div>
      </div>
    </div>
  );
};

export default DraggableStock;