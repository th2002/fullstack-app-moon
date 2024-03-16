import React from 'react';

const InputContainer = ({ placeholder, onChangeText, stateValue }) => {
  const handleChange = e => {
    onChangeText(e.target.value);
  };

  return (
    <input
      spellCheck="false"
      type="text"
      placeholder={placeholder}
      value={stateValue}
      onChange={handleChange}
      className="h-12 w-full rounded-md border border-third bg-secondary px-4 font-sans text-lg font-semibold shadow-md outline-none"
    />
  );
};

export default InputContainer;

