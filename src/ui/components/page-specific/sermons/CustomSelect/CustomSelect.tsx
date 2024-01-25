import React from 'react'

interface CustomSelectProps {
  options: string[] | []
  name: string
  action: string
}

const CustomSelect:React.FC<CustomSelectProps> = ({ options, name, action }) => {
  return (
    <div>
      <select multiple size={options.length} name={name}>
        <option value ="">{action}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect
