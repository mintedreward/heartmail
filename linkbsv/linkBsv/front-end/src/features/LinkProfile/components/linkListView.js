import {useState,useEffect} from 'react';
import ListItemLink from "../../../common/components/listItemLink";
import {merge} from 'lodash-es';

const List = (props)=>{

  const [renderedLinks,setRenderedLinks] = useState(null);

  const renderLinks = () => {
    let i;
    let j;

    let sorted = [];
    let unOrdered = [];
    
    if(props.linkOrder){

      let linkOrder = JSON.parse(props.linkOrder);
  
      for (i=0;i<linkOrder.length;i++){
          for(j=0;j<props.links.length;j++){
            if(linkOrder[i] == props.links[j]['linkId']){
              sorted.push(props.links[j]);
            }else{
              unOrdered.push(props.links[j])
            }
          }
      }


    }else{
      sorted = props.links;
    }


    setRenderedLinks(merge(sorted,unOrdered));
  }

  useEffect(()=>{
     renderLinks()
  },[props.links,props.linkOrder])



    return (
       <div>
           {
             (renderedLinks)?
             renderedLinks.map((link)=>{
                  return <div className="mb-3">
                            <ListItemLink link={link}/>
                        </div>
                  
              })
             :
              <span></span>
           }
       </div>
    )
}

export default List;