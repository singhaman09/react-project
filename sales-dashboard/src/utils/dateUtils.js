import { format, subDays, subMonths, subYears } from 'date-fns';

export const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export const getTimeRangeOptions = () => {
  const today = new Date();
  
  return [
    {
      label: '1 Week',
      startDate: subDays(today, 7),
      endDate: today
    },
    {
      label: '1 Month',
      startDate: subMonths(today, 1),
      endDate: today
    },
    {
      label: '3 Months',
      startDate: subMonths(today, 3),
      endDate: today
    },
    {
      label: '6 Months',
      startDate: subMonths(today, 6),
      endDate: today
    },
    {
      label: '1 Year',
      startDate: subYears(today, 1),
      endDate: today
    },
    {
      label: '5 Years',
      startDate: subYears(today, 5),
      endDate: today
    }
  ];
};