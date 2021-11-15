import React from "react";
import "./sidebarItem.css";

export default function SidebarItemLast({ icon, text, theme, CSSclass, setCSSClass }) {

  const handleShowModal = (event) => {
    setCSSClass("modal--show")
  }

  return (
    <div className={"sidebarItem " + theme}
      onClick={handleShowModal}
    >
      {icon}
      <span className="sidebarItemText"
      >{text}</span>
      <span className="sidebarItemTextName"
      >
        {text === "Logout" && "john"}
      </span>
    </div>
  );
}