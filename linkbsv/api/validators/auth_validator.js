const { Validator } = require('node-input-validator');

module.exports = {
    validateSignUpReq: async function (data) {
        let { userId,encMnemonics,userName,avatarUrl,userHandleHandCash,userHandleMoneyButton,referrer} = data
        const v = new Validator(data, {
            userId: 'required|string',
            userName : 'required|string',
            encMnemonics: 'required|string',
            avatarUrl:'string',
            userHandleHandCash:'string',
            userHandleMoneyButton:'string',
            referrer: 'string',
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        } else {
            return {
                userId, encMnemonics,avatarUrl,userName,userHandleHandCash,userHandleMoneyButton,referrer
            }
        }
    },
    validateSignInReq: async function (data) {
        let { userId} = data
        const v = new Validator(data, {
            userId: 'required|string'
        });
        let matched = await v.check();
        if (!matched) {
            throw (v.errors)
        } else {
            return {
                userId
            }
        }
    },
}