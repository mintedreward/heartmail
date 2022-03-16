import configs from "../consts/configs";
import {MoneyButtonClient} from "@moneybutton/api-client";
const client = new MoneyButtonClient(configs.moneyButtonClientOauthId);

const Controller = {

    

    async sendLinkCreationFee(){
        try{
            
            // let payment = await imb.swipe({
                //     to: 'moneybutton@moneybutton.com',
                //     amount: '0.01',
                //     currency: 'USD'
                //   });
                // console.log(payment);
                
            let r = await client.createUserPayment(localStorage.getItem("userId"),{to: 'moneybutton@moneybutton.com',
                amount: '0.01',
                currency: 'USD'
              })

            console.log(r);
        }catch(e){
            console.log(e);
            return false;
        }
    
        
    }
}

export default Controller;