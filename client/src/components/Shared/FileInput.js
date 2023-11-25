import React, { useState } from "react";
import "./input.css";
import { uploadImage } from "../../utils/changeImageIntoString";

const FileInput = ({ label, userLabel, changeUserData }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <fieldset className={`text-input-container`}>
        <legend>{label}</legend>
        <div className="input-section">
          <input
            type="file"
            onChange={async (e) => {
              const value = await uploadImage(e);
              //   console.log(value);
              changeUserData(userLabel, value);
            }}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
        </div>
      </fieldset>
    </>
  );
};

export default FileInput;
