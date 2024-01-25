import { useState } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  )
}

export default CustomDatePicker;
