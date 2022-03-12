const isSignedIn = ()=>{
    let userName = localStorage.getItem("userName");
    let acMnemonics = localStorage.getItem("acMnemonics");
    return (userName && userName.trim().length>0 && acMnemonics && acMnemonics.trim().length>0);
}

export{
    isSignedIn
}