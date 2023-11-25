import React, { useState } from "react";
import "./input.css";

const Textarea = ({ label, userLabel, placeholder, value, changeUserData }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <fieldset className={`text-input-container`}>
        <legend>{label}</legend>
        <div className="input-section">
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              changeUserData(userLabel, e.target.value);
            }}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          ></textarea>
        </div>
      </fieldset>
    </>
  );
};

export default Textarea;
