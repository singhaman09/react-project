import axios from 'axios';
import { format } from 'date-fns';

const API_KEY = 'FSX6EDG9ENCA8OSC';
export const fetchStockData = async (symbol, startDate, endDate) => {
  try {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=full`
    );

    if (response.data.Note || response.data.Information) {
      console.warn('API limit reached or using demo key:', response.data.Note || response.data.Information);
      return generateSampleData(startDate, endDate);
    }

    const timeSeriesData = response.data['Time Series (Daily)'];
    
    if (!timeSeriesData) {
      console.warn('No data returned from API, using sample data instead');
      return generateSampleData(startDate, endDate);
    }
    const formattedData = Object.entries(timeSeriesData)
      .filter(([date]) => date >= formattedStartDate && date <= formattedEndDate)
      .map(([date, values]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseFloat(values['5. volume']),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return formattedData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return generateSampleData(startDate, endDate);
  }
};

const generateSampleData = (startDate, endDate) => {
  const data = [];
  const currentDate = new Date(startDate);
  const endDateTime = new Date(endDate).getTime();
  
  let basePrice = 150 + Math.random() * 100;
  
  while (currentDate.getTime() <= endDateTime) {
    // Skip weekends
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      const volatility = Math.random() * 3;
      const priceChange = (Math.random() - 0.5) * volatility;
      basePrice += priceChange;
      
      const open = basePrice;
      const close = basePrice + (Math.random() - 0.5) * 2;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
      
      data.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: Math.floor(Math.random() * 10000000) + 1000000,
      });
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};