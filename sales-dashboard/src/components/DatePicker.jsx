import React, { useContext } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { StockContext } from '../context/StockContext';
import { getTimeRangeOptions } from '../utils/dateUtils';

const DatePicker = () => {
  const { timeRange, setTimeRange } = useContext(StockContext);
  const timeRangeOptions = getTimeRangeOptions();

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setTimeRange({
      startDate: start || timeRange.startDate,
      endDate: end || timeRange.endDate
    });
  };

  const handleQuickRangeSelect = (option) => {
    setTimeRange({
      startDate: option.startDate,
      endDate: option.endDate
    });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Date Range</h3>
          <ReactDatePicker
            selected={timeRange.startDate}
            onChange={handleDateChange}
            startDate={timeRange.startDate}
            endDate={timeRange.endDate}
            selectsRange
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {timeRangeOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuickRangeSelect(option)}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;