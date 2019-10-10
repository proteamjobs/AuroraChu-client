import React from "react";
import renderHTML from "react-render-html";
import privacyText from "../../doc/Privacy";
import "./Privacy.css";
const Privacy = () => {
  return (
    <>
      <div className="privacy_container">
        <h1>개인정보처리방침</h1>
        <div className="privacy_content_container">
          {renderHTML(privacyText)}
        </div>
      </div>
    </>
  );
};

export default Privacy;
