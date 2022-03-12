import LoginButtons from "./LoginButtons";
import LoginUser from "./LoginUser";
import WelcomeText from "./WelcomeText";

function LoginBox() {
  return (
    <div class="login-box">
      <LoginUser />
      <WelcomeText />
      <LoginButtons />
    </div>
  );
}

export default LoginBox;
