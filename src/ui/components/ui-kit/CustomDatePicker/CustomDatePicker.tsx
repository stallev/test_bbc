import React from 'react';
import DatePicker from 'react-date-picker';
import { useRouter } from 'next/router';
import { Text } from '..';
import { CustomDatePickerProps } from './types';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import styles from './styles/custom-date-picker.module.scss';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedValue,
  onChangeValue,
  title,
  className,
  maxDate,
  minDate,
  calendarAriaLabel,
  clearIcon
}) => {
  const { locale } = useRouter();

  return (
    <div className={styles["custom-date-picker"]}>
      <Text
        textType='span'
        className={styles["custom-date-picker__name"]}
      >
        {title}
      </Text>

      <DatePicker
        className={styles["custom-date-picker__picker"]}
        onChange={onChangeValue}
        value={selectedValue}
        locale={locale}
        maxDate={maxDate && maxDate}
        minDate={minDate && minDate}
        clearIcon={clearIcon}
        calendarAriaLabel={calendarAriaLabel}
      />
    </div>
  );
};

export default CustomDatePicker;
