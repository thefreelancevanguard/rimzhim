import React, { useState } from "react";
import "./input.css";

const TextInput = ({
  label,
  userLabel,
  inputType,
  placeholder,
  value,
  changeUserData,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <fieldset className={`text-input-container`}>
        <legend>{label}</legend>
        <div className="input-section">
          <input
            type={inputType}
            value={value}
            onChange={(e) => {
              changeUserData(userLabel, e.target.value);
            }}
            placeholder={placeholder}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
        </div>
      </fieldset>
    </>
  );
};

export default TextInput;
