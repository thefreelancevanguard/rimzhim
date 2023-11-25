import React from "react";
import "./Tree.css";
import TreeNode from "../TreeNode/TreeNode";
import LuffyImg from "../../../assets/images/Luffy Wallpaper.jpg";
import KritikaImg from "../../../assets/images/Kritika.jpeg";
import { useTheme } from "../../../context/ThemeContext";

const Tree = () => {
  const { theme } = useTheme();
  const children = [
    {
      fatherImgSrc: LuffyImg,
      mohterImgSrc: KritikaImg,
      fatherName: "F_Name",
      motherName: "M_Name",
      level: 1,
      children: [
        {
          fatherImgSrc: LuffyImg,
          mohterImgSrc: KritikaImg,
          fatherName: "F_Name",
          motherName: "M_Name",
          level: 2,
          children: [
            {
              fatherImgSrc: LuffyImg,
              mohterImgSrc: KritikaImg,
              fatherName: "F_Name",
              motherName: "M_Name",
              level: 3,
              children: [],
            },
          ],
        },
      ],
    },
    {
      fatherImgSrc: LuffyImg,
      mohterImgSrc: KritikaImg,
      fatherName: "F_Name",
      motherName: "M_Name",
      level: 1,
      children: [
        {
          fatherImgSrc: LuffyImg,
          mohterImgSrc: KritikaImg,
          fatherName: "F_Name",
          motherName: "M_Name",
          level: 2,
          children: [],
        },
      ],
    },
    {
      fatherImgSrc: LuffyImg,
      mohterImgSrc: KritikaImg,
      fatherName: "F_Name",
      motherName: "M_Name",
      level: 1,
      children: [
        {
          fatherImgSrc: LuffyImg,
          mohterImgSrc: KritikaImg,
          fatherName: "F_Name",
          motherName: "M_Name",
          level: 2,
          children: [
            {
              fatherImgSrc: LuffyImg,
              mohterImgSrc: KritikaImg,
              fatherName: "F_Name",
              motherName: "M_Name",
              level: 3,
              children: [],
            },
          ],
        },
      ],
    },
    {
      fatherImgSrc: LuffyImg,
      mohterImgSrc: KritikaImg,
      fatherName: "F_Name",
      motherName: "M_Name",
      level: 1,
      children: [
        {
          fatherImgSrc: LuffyImg,
          mohterImgSrc: KritikaImg,
          fatherName: "F_Name",
          motherName: "M_Name",
          level: 2,
          children: [],
        },
      ],
    },
    {
      fatherImgSrc: LuffyImg,
      mohterImgSrc: KritikaImg,
      fatherName: "F_Name",
      motherName: "M_Name",
      level: 1,
      children: [],
    },
    {
      fatherImgSrc: LuffyImg,
      mohterImgSrc: KritikaImg,
      fatherName: "F_Name",
      motherName: "M_Name",
      level: 1,
      children: [
        {
          fatherImgSrc: LuffyImg,
          mohterImgSrc: KritikaImg,
          fatherName: "F_Name",
          motherName: "M_Name",
          level: 2,
          children: [
            {
              fatherImgSrc: LuffyImg,
              mohterImgSrc: KritikaImg,
              fatherName: "F_Name",
              motherName: "M_Name",
              level: 3,
              children: [],
            },
            {
              fatherImgSrc: LuffyImg,
              mohterImgSrc: KritikaImg,
              fatherName: "F_Name",
              motherName: "M_Name",
              level: 3,
              children: [],
            },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className={`ft-container ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <h2 className="ft-heading">Family Tree</h2>
      <div className="tree-container">
        <TreeNode
          fatherImgSrc={LuffyImg}
          mohterImgSrc={KritikaImg}
          fatherName="F_Name"
          motherName="M_Name"
          level={0}
          children={children}
        />
      </div>
    </div>
  );
};

export default Tree;
