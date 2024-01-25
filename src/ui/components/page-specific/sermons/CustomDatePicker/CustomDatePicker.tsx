import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const CustomDatePicker = () => {
  const { locale } = useRouter();
  const [value, onChange] = useState<Value>(null);

  useEffect(() => {
    console.log('value is ', value)
  }, [value])
  return (
    <div>
      <DatePicker
        onChange={onChange}
        value={value}
        locale={locale}
        maxDate={new Date()}
      />
    </div>
  );
};

export default CustomDatePicker;
