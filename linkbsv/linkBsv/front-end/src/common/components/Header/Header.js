import HeaderNavigation from "./HeaderNavigation";
import {isSignedIn} from "../../../utils/auth"

function Header({ linkName }) {
  return (
    <header>
      <HeaderNavigation linkName={linkName} />
      <a href="" class=" sidemenu_btn" id="sidemenu_toggle">
        <span></span>
        <span></span>
        <span></span>
      </a>
      <div class="side-menu hidden">
        <div class="inner-wrapper">
          <span class="btn-close" id="btn_sideNavClose">
            <i></i>
            <i></i>
          </span>
          <nav class="side-nav w-100">
            <div class="nav">
              <a href="/account/dashboard">Links</a>
              <a href="/account/appearance">Appearance</a>
              <a href="/account/settings">Settings</a>
              {
                isSignedIn()?
                <a href="/account/dashboard" class="signin">
                  Dashboard
                </a>
                :
                <a href="/auth/signin" class="adminlink">
                  Sign In
                </a>

              }

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
            <p class="text-white">
              &copy; <script>document.write(new Date().getFullYear())</script>{" "}
              LinkBSV. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <a id="close_side_menu" href=""></a>
    </header>
  );
}

export default Header;
