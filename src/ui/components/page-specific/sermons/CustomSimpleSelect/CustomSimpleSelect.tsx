import React, { useState } from 'react';

import styles from './styles/custom-simple-select.module.scss';

interface CustomSelectProps {
  options: string[] | []
  name: string
  action: string
}

const CustomSimpleSelect: React.FC<CustomSelectProps> = ({ options, name, action }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    console.log(selectedOption);
  };

  return (
    <div className={styles["custom-simple-select"]}>
      <select size={1} name={name} onChange={handleSelectChange} value={selectedValue || ''}>
        <option value="all">{name}</option>
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
