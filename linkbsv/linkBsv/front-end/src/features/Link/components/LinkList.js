import { useState, useEffect } from 'react';
import ListItemLink from "./LinkItem";
import { Pagination } from "antd"
import TextButton from "../../../repository/components/TextButton/textButton";
import {Add} from "@material-ui/icons";
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd";
import {updateUserLinkOrder} from "../../../utils/api";
import {merge} from 'lodash-es';

function LinkList(props) {

  const [linkRenderWidth, setLinkRenderWidth] = useState(4);
  const [renderedLinks, setRenderedLinks] = useState([]);

  const onDragEnd = async(result)=>{
      
      //if(!result.destination.index != null) return;

      const arrTmp = Array.from(renderedLinks);
      const [reOrderedItem] = arrTmp.splice(result.source.index,1);
      
      arrTmp.splice(result.destination.index,0,reOrderedItem);

      setRenderedLinks(arrTmp);

      let i;
      let linkOrder = [];
      for(i=0;i<arrTmp.length;i++){
            linkOrder.push(arrTmp[i]['linkId']);
      };

      let payload = {
        userId : localStorage.getItem("userId"),
        linkOrder : JSON.stringify(linkOrder)
      }
      let r = await updateUserLinkOrder(payload);



  }


  const renderLinks = (currentPage) => {
    let i;
    let arrTmp = [];
    let leftBound = linkRenderWidth * currentPage;
    let rightBound = linkRenderWidth * currentPage + linkRenderWidth;

    for (i = leftBound; i < rightBound; i++) {
      if (props.links[i]) {
             arrTmp.push(props.links[i]);
          }
    }

    console.log(props.links)
    

    setRenderedLinks(arrTmp);

  }
  useEffect(() => {
    if (props.links) {
      console.log(props.links)
      renderLinks(0);
    }else{
      console.log(props.links)
    }
  },[props.links])

  return (
    <>

      <div className="pb-4">
        <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          My links
          <span className="ml-4"
          onClick={props.onClickAddLink}
          >
            <TextButton
            width="18rem"
            label="Add A Link"
            bgColor="rgba(245,119,62,1)"
            borderColor="rgba(0,0,0,0)"
            color="rgba(255,255,255,1)"
            padding="0.6rem 1.8rem"
            fontSize="18px"
            icon = {<Add/>}
            boxShadowOff
            iconColor="rgba(255,255,255,1)"

            
            />
          </span>
        </h3>
      </div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="links">
            {
              (provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    renderedLinks.map((link, index) => (
                      <Draggable key={link['linkId']} index={index} draggableId={link['linkId']} >
                        {
                          (provided)=>(
                            <div className="pb-3" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <ListItemLink link={link} key={index} onDeleteLink={props.onDeleteLink} />
                            </div>
                          )
                        }
                      </Draggable>
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </div>
      <div>
        <Pagination
          defaultCurrent={1}
          total={props.links ? props.links.length : 0}
          defaultPageSize={linkRenderWidth}
          onChange={(page, size) => {
            renderLinks(page - 1);
          }}
        />
      </div>
    </>
  );
}

export default LinkList;
