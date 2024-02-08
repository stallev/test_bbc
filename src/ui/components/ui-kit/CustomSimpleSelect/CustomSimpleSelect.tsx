import { ALL_TAXONOMY_ITEMS_NAME } from '@/constants/mock';
import { Text } from '..';

import styles from './styles/custom-simple-select.module.scss';

interface CustomSelectProps {
  options: string[] | []
  name: string
  title: string
  defaultValueText?: string
  selectedValue: string
  ariaLabel: string
  onChangeValue: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const CustomSimpleSelect: React.FC<CustomSelectProps> = ({
  options,
  name,
  title,
  defaultValueText = 'all',
  selectedValue,
  ariaLabel,
  onChangeValue
}) => {
  return (
    <div className={styles["custom-simple-select"]}>
      <Text
        textType='span'
        className={styles["custom-simple-select__name"]}
      >
        {title}
      </Text>
      
      <select aria-label={ariaLabel} size={1} name={name} onChange={onChangeValue} value={selectedValue}>
        <option value={ALL_TAXONOMY_ITEMS_NAME}>{defaultValueText}</option>

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSimpleSelect;
