import {useState,useEffect} from 'react';
import FormInput from "./socailMediaFormInput";
import {MobileScreenShare} from "@material-ui/icons"
function SocialMediaSetting(props) {

  const [urlFacebook,setUrlFacebook] = useState(null);
  const [urlTwitter,setUrlTwitter] = useState(null);
  const [urlTwetch,setUrlTwetch] = useState(null);
  const [urlHandCash,setUrlHandCash] = useState(null);
  const [urlMoneyButton,setUrlMoneyButton] = useState(null);
  const [urlRelayx,setUrlRelayx] = useState(null);
  const [urlPatreon,setUrlPatreon] = useState(null);
  const [urlInstragram,setUrlInstragram] = useState(null);
  const [urlTelegram,setUrlTelegram] = useState(null);
  const [urlSpotify,setUrlSpotify] = useState(null);
  const [urlYoutube,setUrlYoutube] = useState(null);
  const [urlTwitch,setUrlTwitch] = useState(null);
  const [urlLinkedin,setUrlLinkedin] = useState(null);
  const [urlTikTok,setUrlTiktok] = useState(null);

  useEffect(()=>{
    if(props.links && props.links.length>0){
      props.links.forEach((link)=>{
        switch(link['platform'].toLowerCase()){
          case "facebook":
            setUrlFacebook(link['url']);
            break;
          case "twitter":
            setUrlTwitter(link['url']);
            break;
          case "instagram":
            setUrlInstragram(link['url']);
            break;
          case "youtube":
            setUrlYoutube(link['url']);
            break;
          case "twitch":
            setUrlTwitch(link['url']);
            break;
          case "linkedin":
            setUrlLinkedin(link['url']);
            break;
          case "patreon":
            setUrlPatreon(link['url']);
            break;
          case "telegram":
            setUrlTelegram(link['url']);
            break;
          case "spotify":
            setUrlSpotify(link['url']);
            break;
          case "tiktok":
            setUrlTiktok(link['url']);
            break;
          case "handcash":
            setUrlHandCash(link['url']);
            break;
          case "moneybutton":
            setUrlMoneyButton(link['url']);
            break;
          case "relayx":
            setUrlRelayx(link['url']);
            break;
          case "twetch":
            setUrlTwetch(link['url']);
            break;
        }
      })
    }

  },[props.links])

 


  return (
    <div class="pt-5 mt-5">
      <h4
      style={{
        fontSize:'22px',
        fontWeight:'600'
      }}
      ><MobileScreenShare style={{color:'rgb(4,54,115)'}}/> Social media integration</h4>
      <div class="socialmediaint-box clearfix p-4"
      style={{
        boxShadow:'0px 0px 15px rgba(0,0,0,0.1)',
        borderRadius:'1rem'
      }}
      >
        <div className="mb-3">
          <FormInput platform="Facebook" placeholder="Your Facebook URL" url={urlFacebook}/>
        </div>
        <div className="mb-3">
          <FormInput platform="Twitter" placeholder="Your Twitter URL" url={urlTwitter} />
        </div>
        <div className="mb-3">
          <FormInput platform="Instagram" placeholder="Your Instagram URL" url={urlInstragram} />
        </div>
        <div className="mb-3">
          <FormInput platform="Youtube" placeholder="Your Youtube URL" url={urlYoutube} />
        </div>
        <div className="mb-3">
          <FormInput platform="Twitch" placeholder="Your Twitch URL" url={urlTwitch} />
        </div>
        <div className="mb-3">
          <FormInput platform="Linkedin" placeholder="Your Linkedin URL" url={urlLinkedin} />
        </div>
        <div className="mb-3">
          <FormInput platform="Patreon" placeholder="Your Patreon URL" url={urlPatreon} />
        </div>
        <div className="mb-3">
          <FormInput platform="Telegram" placeholder="https://t.me/yourUserName" url={urlTelegram} />
        </div>
        <div className="mb-3">
          <FormInput platform="Spotify" placeholder="Your Spotify URL" url={urlSpotify} />
        </div>
        <div className="mb-3">
          <FormInput platform="TikTok" placeholder="Your TikTok URL" url={urlTikTok}/>
        </div>
        <div className="mb-3">
          <FormInput platform="Handcash" placeholder="Your Handcash @username" url={urlHandCash} />
        </div>
        <div className="mb-3">
          <FormInput platform="Moneybutton" placeholder="Your Moneybutton @username" url={urlMoneyButton}/>
        </div>
        <div className="mb-3">
          <FormInput platform="Relayx" placeholder="Your Relayx @username" url={urlRelayx} />
        </div>
        <div className="mb-3">
          <FormInput platform="Twetch" placeholder="Your Twetch URL" url={urlTwetch} />
        </div>
      </div>
    </div>
  );
}

export default SocialMediaSetting;
