import {isSignedIn} from "../../../utils/auth";
import {ExitToApp} from "@material-ui/icons"
import {doSignOut} from "../../../utils/api"

function ButtonNavigation() {
  return (
    <div class="top-right-div">
      {
        isSignedIn()?
        <a href="#" 
          onClick={()=>{
            if(doSignOut()){
              window.location.href="/"
            }
          }} 
          class="signin"
        >
          <span>
            <ExitToApp/>
          </span>
          <span>
            &nbsp;
          </span>
          <span>
            Sign Out
          </span>
        </a>
        :
        <a href="/auth/signin" class="signin">
          Sign In
        </a>

      }
    </div>
  );
}

export default ButtonNavigation;
