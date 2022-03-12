const {Computer} = require("bitcoin-computer");

const Controller = {
    async init(){
        this.computer = new Computer({
            seed : process.env.BITCOINCOMPUTER_MNEMONICS,
            chain : "BSV",
            network : "livenet"
        });
    },

}

module.exports = Controller;