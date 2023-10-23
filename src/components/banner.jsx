import React from "react";
import Navigation from "./Navigation";
import "./banner.css";

function Banner({ title }) {
  return (
    <div className="title">
      <h1>{title}</h1>
      <Navigation />
    </div>
  );
}

export default Banner;
