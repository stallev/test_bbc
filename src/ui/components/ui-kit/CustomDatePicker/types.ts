export interface CustomDatePickerProps {
  className?: string
  title?: string
  selectedValue: Date
  maxDate?: Date
  minDate?: Date
  onChangeValue: (value: Date) => void
  calendarAriaLabel: string
}
