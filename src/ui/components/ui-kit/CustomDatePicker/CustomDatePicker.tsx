import { CustomDatePickerProps } from './types';

import styles from './styles/custom-date-picker.module.scss';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedValue,
  onChangeValue,
  title,
  className,
  maxDate,
  minDate,
  calendarAriaLabel,
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.valueAsDate;
    if (date !== null) {
      onChangeValue(date);
    }
  };
  return (
    <label className={`${styles["custom-date-picker"]} ${className}`}>
      <span className={styles["custom-date-picker__name"]}>{title}</span>

      <input
        type="date"
        className={styles["custom-date-picker__input"]}
        value={selectedValue.toISOString().slice(0, 10)} 
        onChange={handleDateChange}
        min={minDate?.toISOString().slice(0, 10)}
        max={maxDate?.toISOString().slice(0, 10)}
        aria-label={calendarAriaLabel}
      />
    </label>
  );
};

export default CustomDatePicker;
