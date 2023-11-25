import React from "react";
import "./TreeNode.css";
import { useTheme } from "../../../context/ThemeContext";

const TreeNode = ({
  fatherImgSrc,
  mohterImgSrc,
  fatherName,
  motherName,
  level,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`tn-container relative  ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="tn-top-container">
        {level > 0 && <div className="tn-connection-line"></div>}
        <div
          className={`tn-info ${
            theme === "dark" ? "dark-theme" : "light-theme"
          }`}
        >
          <div className="tn-img-container">
            <img className="father-img" src={fatherImgSrc} alt="FATHER_IMG" />
            <img className="mother-img" src={mohterImgSrc} alt="MOTHER_IMG" />
          </div>
          <div className="tn-name-container">
            <div>{fatherName}</div>
            <div>{motherName}</div>
          </div>
        </div>
      </div>
      {children?.length > 0 && (
        <div className="children-container">
          {children?.map((child) => {
            return (
              <TreeNode
                fatherImgSrc={child?.fatherImgSrc}
                mohterImgSrc={child?.mohterImgSrc}
                fatherName={child?.fatherName}
                motherName={child?.motherName}
                level={child?.level + 1}
                children={child?.children}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
