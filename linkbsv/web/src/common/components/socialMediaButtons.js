import {useState,useEffect} from 'react';
import {Facebook, Instagram, LinkedIn, Telegram, Twitter, YouTube} from "@material-ui/icons"
import { faPatreon, faSpotify, faTiktok, faTwitch } from '@fortawesome/free-brands-svg-icons';
import TextButton from "../../repository/components/TextButton/textButton";
import iconTwetch from "../../assets/images/icons/twetch-logo.jpeg";

const Buttons = (props)=>{

    const [mediaLinksData,setMediaLinksData] = useState(null);

    useEffect(()=>{
        let i;
        if(props.links && props.links.length>0){
          let arrTemp = [];
          let objTemp;
          for(i=0;i<props.links.length;i++){


            switch(props.links[i]['platform'].toLowerCase()){
              case "facebook":
                objTemp = {
                    icon : <Facebook style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "twitter":
                objTemp = {
                    icon : <Twitter style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "instagram":
                objTemp = {
                    icon : <Instagram style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "youtube":
                objTemp = {
                    icon : <YouTube style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "twitch":
                objTemp = {
                    icon : <faTwitch style={{color:'rgba(35,45,55,1)'}} />,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "linkedin":
                objTemp = {
                    icon : <LinkedIn style={{color:'rgba(35,45,55,1)'}} />,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "patreon":
                objTemp = {
                    icon : <faPatreon style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "telegram":
                objTemp = {
                    icon : <Telegram style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "spotify":
                objTemp = {
                    icon : <faSpotify style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
              case "tiktok":
                objTemp = {
                    icon : <faTiktok style={{color:'rgba(35,45,55,1)'}}/>,
                    url : props.links[i]['url']
                }
                arrTemp.push(objTemp);
                break;
            //   case "handcash":
            //     setUrlHandCash(link['url']);
            //     break;
            //   case "moneybutton":
            //     setUrlMoneyButton(link['url']);
            //     break;
            //   case "relayx":
            //     setUrlRelayx(link['url']);
            //     break;
              case "twetch":
                objTemp = {
                  icon : <img src={iconTwetch} style={{width:'28px',borderRadius:'14px'}}/>,
                  url : props.links[i]['url']
              }
              arrTemp.push(objTemp);
              break;
            }
          }
          setMediaLinksData(arrTemp);
        }
    
      },[props.links])


      return (
          <div className="mediaLinksContainer" style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
              {
                  mediaLinksData?
                  mediaLinksData.map(link=>
                    <a href={link['url']} 
                       className="mr-2 ml-2 bg-info" 
                       target="_blank"
                       style={{
                           display:'flex',
                           justifyContent:'center',
                           alignContent:'center',
                           alignItems:'center',
                           width:'48px',
                           height:'48px',
                           borderRadius:'24px',
                           textDecoration:'none',
                           color:'rgba(0,0,0,0)'
                        }}>
                      <span>{link['icon']}</span>
                    </a>
                    )
                  :
                  <span></span>
              }
          </div>
      )

}

export default Buttons;

