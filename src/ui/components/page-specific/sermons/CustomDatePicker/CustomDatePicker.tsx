import { useState } from 'react';
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const CustomDatePicker = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <DatePicker onChange={onChange} value={value} />
    </div>
  );
};

export default CustomDatePicker;
