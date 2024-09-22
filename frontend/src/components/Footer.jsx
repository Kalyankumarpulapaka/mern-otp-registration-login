import React from "react";

function Footer() {
  const footerStyle = {
    position: "relative",
    left: 0,
    bottom: 0,
    width: "100%",
    hight:"100%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: "17px 0",
    fontSize: "14px",
  };

  return (
    <div style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Jobvista. All rights reserved.</p>
      <p>
        Follow us on:
        <a href="https://twitter.com" style={{ color: "white", marginLeft: "10px" }}>
          Twitter
        </a>{" "}
        |
        <a href="https://linkedin.com" style={{ color: "white", marginLeft: "10px" }}>
          LinkedIn
        </a>
      </p>
    </div>
  );
}

export default Footer;
