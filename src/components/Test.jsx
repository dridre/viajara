import React, { useState } from "react";

export default function Test() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateInput = () => {
    console.log(inputValue);
  };

  return (
    <div>
      <input value={inputValue} onChange={handleChange} onBlur={updateInput} />
    </div>
  );
}
