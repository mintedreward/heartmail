import {HandCashConnect} from "@handcash/handcash-connect";
import configs from "../consts/configs";

const {PublicKey} = require('bsv');
const {PrivateKey} = require('bsv');

const ECIES = require('bsv/ecies');





const Controller = {
    init(){
        if(!this.HC){
            this.HC = new HandCashConnect(configs.handcashAppId);
    
        }
    },
    async getProfile(){
        this.init();
        const account = this.HC.getAccountFromAuthToken(localStorage.getItem("handCashAuthToken"));

        const currentProfile = await account.profile.getCurrentProfile();
        
        const {publicProfile} = currentProfile;
        return publicProfile;
    },
    async encryptAndStore(input){
        this.init();
        const account = this.HC.getAccountFromAuthToken(localStorage.getItem("handCashAuthToken"));

        const {publicKey} = await account.profile.getEncryptionKeypair();
        const ecPublicKey = PublicKey.fromString(publicKey);
        const encryptedBuffer = ECIES().publicKey(ecPublicKey).encrypt(input);
        return encryptedBuffer.toString('base64');
    },
    async decrypt(digest){
        const account = this.HC.getAccountFromAuthToken(localStorage.getItem("handCashAuthToken"));
        const {privateKey} = await account.profile.getEncryptionKeypair();
        const ecPrivateKey = PrivateKey.fromWIF(privateKey);
        
        const encryptedBuffer = Buffer.from(digest, 'base64');
        const decryptedBuffer = ECIES().privateKey(ecPrivateKey).decrypt(encryptedBuffer);
        
        return decryptedBuffer.toString('utf8');
    },
    async sendLinkCreationFee(){
        this.init();
        try{
            const account = this.HC.getAccountFromAuthToken(localStorage.getItem("handCashAuthToken"));
            const paymentParameters = {
                description: "LinkBsv Link Creation Fee",
                payments: [
                    { destination: 'linkbsv', currencyCode: 'USD', sendAmount: configs.linkCreationFee },
                ]
            };
            const paymentResult = await account.wallet.pay(paymentParameters);
            return paymentResult['transactionId'];


        }catch(e){
            console.log(e);
            return false;
        }
    
        
    }
}

export default Controller;