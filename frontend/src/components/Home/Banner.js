import React from "react";
import logo from "../../imgs/logo.png";

const Banner = (props) => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>A place to </span>
          <span id="get-part">get </span>
            <input className="search-box" placeholder="Enter your item title" onChange={props.handleChange}/>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
