const Mnemonic = require('bsv/mnemonic')

const createMnemonics = ()=>{
    return Mnemonic.fromRandom().toString();
}

export{
    createMnemonics
}