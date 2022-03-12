import React, { useState } from "react";
function MobileNavigation() {
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };
  return (
    <>
      <a class=" sidemenu_btn" onClick={toggle} id="sidemenu_toggle">
        <span></span>
        <span></span>
        <span></span>
      </a>
      <div className={`side-menu hidden ${active ? "side-menu-active" : ""}`}>
        <div class="inner-wrapper">
          <span class="btn-close" id="btn_sideNavClose" onClick={toggle}>
            <i></i>
            <i></i>
          </span>
          <nav class="side-nav w-100">
            <div class="nav">
              <a href="#">Blog</a>
              <a href="#">My links</a>
              <a href="#">Connect</a>

              <a href="#" class="signin">
                Sign In
              </a>
            </div>
          </nav>

          <div class="side-footer text-white w-100">
            <ul class="social-icons-simple">
              <li>
                <a class="facebook-text-hvr" href="">
                  <i class="fab fa-facebook-f"></i>{" "}
                </a>{" "}
              </li>
              <li>
                <a class="instagram-text-hvr" href="">
                  <i class="fab fa-instagram"></i>{" "}
                </a>{" "}
              </li>
              <li>
                <a class="twitter-text-hvr" href="">
                  <i class="fab fa-twitter"></i>{" "}
                </a>{" "}
              </li>
            </ul>
            <p class="text-white">&copy; 2021 LinkBSV. All rights reserved.</p>
          </div>
        </div>
      </div>
      <a id="close_side_menu" href=""></a>
    </>
  );
}

export default MobileNavigation;
