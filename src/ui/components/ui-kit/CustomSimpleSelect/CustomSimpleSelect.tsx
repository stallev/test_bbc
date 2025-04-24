import { ALL_TAXONOMY_ITEMS_NAME } from '@/constants/mock';
import { PostCategoryConvertedListItem } from '@/types/postTypes';

import { Text } from '..';
import styles from './styles/custom-simple-select.module.scss';

interface CustomSelectProps {
  options: PostCategoryConvertedListItem[] | [];
  name: string;
  title: string;
  defaultValueText?: string;
  selectedValue: string;
  ariaLabel: string;
  onChangeValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const CustomSimpleSelect: React.FC<CustomSelectProps> = ({
  options,
  name,
  title,
  defaultValueText = 'all',
  selectedValue,
  ariaLabel,
  onChangeValue,
  className,
}) => {
  return (
    <div className={`${styles['custom-simple-select']} ${className}`}>
      <Text textType="span" className={styles['custom-simple-select__name']}>
        {title}
      </Text>

      <select
        aria-label={ariaLabel}
        size={1}
        name={name}
        onChange={onChangeValue}
        value={selectedValue}
      >
        <option value={ALL_TAXONOMY_ITEMS_NAME}>{defaultValueText}</option>

        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSimpleSelect;
