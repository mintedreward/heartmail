import configs from "../../../consts/configs";
const { MoneyButtonClient } = require('@moneybutton/api-client')
const client = new MoneyButtonClient(configs.moneyButtonClientOauthId);

function LoginButtons() {

  const onClickMoneyButton = ()=>{
    client.requestAuthorization(
      'auth.user_identity:read users.profiles:read users.balance:read',
      `https://linkbsv.com/auth/moneybutton/success`
    )
  }

  return (
    <>
      <div class="loginwithtxt">Connect with</div>
      <div class="loginbtn-group">
        <a href={`https://app.handcash.io/#/authorizeApp?appId=${configs.handCashAppId}`} class="btns">
          <i class="handcash"></i> Handcash
        </a>
        <a href="#" class="btns" onClick={onClickMoneyButton}>
          <i class="moneycon"></i> Moneybutton
        </a>
        {/* for now any button is redirecting us to next screen */}
      </div>
    </>
  );
}

export default LoginButtons;

