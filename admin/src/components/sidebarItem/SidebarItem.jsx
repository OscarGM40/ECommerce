import React from "react";
import "./sidebarItem.css";

export default function SidebarItem({ icon, text, theme }) {

  return (
    <div className={"sidebarItem " + theme}>
      {icon}
      <span className="sidebarItemText">{text}</span>
    </div>
  );
}