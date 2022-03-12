import shareImg from "../assets/images/share.svg";
import instagramImg from "../assets/images/instagram.svg";
import whatsappImg from "../assets/images/whatsapp.svg";
import React, { useState } from "react";

function SocialBox() {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };
  return (
    <div class="social-box">
      <h3 onClick={toggle}>Share</h3>
      <div className={`social-div ${show ? "show-social-div" : ""}`}>
        <a href="#">
          <img class="share" src={shareImg} alt="" width="26" />
        </a>
        <a href="#">
          <img class="insta" src={instagramImg} alt="" width="26" />
        </a>
        <a href="#">
          <img class="whatsapp" src={whatsappImg} alt="" width="26" />
        </a>
      </div>
    </div>
  );
}

export default SocialBox;
