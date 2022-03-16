import {useState} from 'react';
import {ArrowBack, Label,LabelOutlined,Link,Note,NoteAddOutlined, NoteOutlined} from "@material-ui/icons";
import TextButton from "../../../repository/components/TextButton/textButton";

const Form = (props)=>{

    const [linkTitle,setLinkTitle] = useState(null);
    const [linkUrl,setLinkUrl] = useState(null);
    const [linkDescription,setLinkDescription] = useState(null);



    return (
        <div      
        >
            <div className="row">
                <div className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div
                    className="text-right"
                    >
                      <div className="pb-2">
                        <span onClick={props.onClickBack}>
                                <TextButton 
                                    label="Back"
                                    borderColor = "rgba(4,54,115,0)"
                                    width="auto"
                                    padding="12px 0px"
                                    color="rgba(4,54,115,1)"
                                    bgColor = "rgba(255,255,255,0)"
                                    boxShadowOff
                                    icon ={ <ArrowBack/>}
                                />
                            </span>
                      </div>
                    </div>
                    <div
                        className="p-2"
                        style={{
                            boxShadow:'0px 0px 15px rgba(0,0,0,0.1)',
                            borderRadius:'12px'
                        }} 
                    >
                        <div
                        className="pl-3 pr-3 pt-4 pb-4"
                        style={{display:'flex',width:'100%'}}
                        >
                            <span>
                            <Label style={{color:'rgba(4,54,115,1)'}}/>
                            </span>
                            <input 
                                type="text" 
                                className="pl-2"
                                placeholder="Link Title"
                                style={{
                                    width:'100%',
                                    border:'none',
                                    outline : 'none',
                                    fontSize:'16px'
                                }}
                                onChange={(e)=>{
                                    setLinkTitle(e.target.value);
                                }}
                            />
                        </div>
                        <div className="divider" style={{height:'1px',backgroundColor:'rgba(0,0,0,0.08)'}}></div>
                        <div
                        className="pl-3 pr-3 pt-4 pb-4"
                        style={{display:'flex',width:'100%'}}
                        >
                            <span>
                              <Link style={{color:'rgba(4,54,115,1)'}}/>
                            </span>

                            <input 
                                type="text" 
                                className="pl-2"
                                placeholder="https://"
                                style={{
                                    width:'100%',
                                    border:'none',
                                    outline : 'none',
                                    fontSize:'16px'
                                }}
                                onChange={(e)=>{
                                    setLinkUrl(e.target.value);
                                }}
                            />
                        </div>
                        <div className="divider" style={{height:'1px',backgroundColor:'rgba(0,0,0,0.08)'}}></div>
                        <div
                        className="pl-3 pr-3 pt-4 pb-4"
                        style={{display:'flex',width:'100%'}}
                        >
                            <span>
                              <NoteOutlined style={{color:'rgba(4,54,115,1)'}}/>
                            </span>

                            <input 
                                type="text" 
                                className="pl-2"
                                placeholder="Description (Optional)"
                                style={{
                                    width:'100%',
                                    border:'none',
                                    outline : 'none',
                                    fontSize:'16px'
                                }}
                                onChange={(e)=>{
                                    setLinkDescription(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center pt-4 d-block w-100">
                    <span onClick={()=>props.onLinkAdd(linkTitle,linkUrl,linkDescription)}>
                        <TextButton 
                            label="Add Link $0.10"
                            borderColor = "rgba(0,0,0,0)"
                            width="auto"
                            padding="12px 40px"
                            color="rgba(255,255,255,1)"
                            bgColor = "rgba(245,119,62,1)"
                        />
                    </span>

                </div>
            </div>

        </div>
    )
}

export default Form;