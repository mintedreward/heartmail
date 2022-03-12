const _ = require("lodash");
module.exports = {
    sortUserLinks(links,linkOrder){

        let sorted = [];
        let unOrdered = [];
        let i;
        let j;
        let order = JSON.parse(linkOrder);

        if(linkOrder){
            for(i=0;i<order.length;i++){
                 for(j=0;j<links.length;j++){
                     if(order[i] == links[j]['linkId']){
                         sorted.push(links[j]);
                     }else{
                         unOrdered.push(links[j]);
                     }
                 }
            }
        }else{
            sorted = links;
        }

        let returnArray = _.uniqBy(unOrdered.concat(sorted),(o)=>{
            return o['linkId']
        });


        return _.reverse(returnArray);

     }
}