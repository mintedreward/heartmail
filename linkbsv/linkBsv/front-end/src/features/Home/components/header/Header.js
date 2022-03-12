import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigations";
import {Dashboard} from "@material-ui/icons";
import {isSignedIn} from "../../../../utils/auth"

function Header() {
  return (
    <header>
      <div class="header">
        <div class="header-div">
          <Logo />
          <Navigation />
          {
            isSignedIn()?
            <a href="/account/dashboard" className="signin" style={{display:'flex',alignItems:'center',justifyContent:'center'}}><Dashboard/>&nbsp;Dashboard</a>
            :
            <a onClick={()=>{localStorage.setItem("authActionRoute",1)}} href="/auth/signin" className="signin">Signin</a>
          }
        </div>
      </div>
      <MobileNavigation />
    </header>
  );
}

export default Header;
