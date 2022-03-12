const {HandCashConnect} = require('@handcash/handcash-connect');
const {getLinkGenTx} = require("../helpers/db_helper");

const Controller = {
    init(){
        this.HC = new HandCashConnect(process.env.HANDCASH_APPID);
        this.account = this.HC.getAccountFromAuthToken(process.env.HANDCASH_AUTHTOKEN);

        
    },
    async verifyProfOfLinkGenerationPayment(txId){
        let paymentResult = await this.account.wallet.getPayment(txId);

        if(paymentResult){
            let satoshiAmountLinkGenFee = Math.floor((100000000/paymentResult['fiatExchangeRate'])*process.env.DEFAULT_LINK_GENERATION_FEE)

            
            if(paymentResult['type'] == "receive" && 
            paymentResult['satoshiAmount'] >= satoshiAmountLinkGenFee){
            
                if(await this.isDuplicateLinkGenTx(txId)){
                    return false;
                }else{
                    return true;
                }

            }
        }else{
            return false;
        }

    },

    async makeRefBonusTx(to,amount){


        try{
            
            let paymentParameters = {
                description: "LinkBsv Referral Bonus",
                appAction: "LinkBsv Referral Bonus",
                payments: [
                    { destination: to, currencyCode: 'USD', sendAmount: amount },
                ]
            };
            paymentResult = await this.account.wallet.pay(paymentParameters);
            return paymentResult;

        }catch(e){
            console.log(e);
            return false;
        }


    },

    async isDuplicateLinkGenTx(txId){
        let tx = await getLinkGenTx(txId);
        if(tx){
            return true
        }else{
            return false;
        }
    }
}

module.exports = Controller;