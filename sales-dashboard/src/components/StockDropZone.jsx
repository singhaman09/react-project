import React, { useContext } from 'react';
import { useDroppable } from '../hooks/useDragDrop';
import { StockContext } from '../context/StockContext';

const StockDropZone = ({ children }) => {
  const { handleDrop } = useContext(StockContext);
  
  // Using our custom drop hook
  const { isOver, drop } = useDroppable('STOCK', (item) => {
    handleDrop(item.symbol);
  });
  
  return (
    <div 
      ref={drop}
      className={`
        w-full h-full rounded-lg transition-colors
        ${isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}
      `}
    >
      {isOver && (
        <div className="absolute inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center rounded-lg z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="font-medium">Drop to view this stock</p>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default StockDropZone;