export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface CustomDatePickerProps {
  className?: string
  title?: string
  selectedValue: Date
  maxDate?: Date
  minDate?: Date
  onChangeValue: (value: Value) => void
  clearIcon?: null
  calendarAriaLabel: string
}