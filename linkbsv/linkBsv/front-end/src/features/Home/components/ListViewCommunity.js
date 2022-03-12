import ScrollMenu from 'react-horizontal-scrolling-menu';
import ListItemCommunity from "./ListItemCommunity";


const List = (props)=>{

    const getListItems = ()=>{
        let x = props.users.map((user)=><div className="mr-4 ml-4 ml-3"><ListItemCommunity data={user}/></div>)
        return x;
    }

    return (
        <div  style={{maxWidth:'100vw'}}>
            <ScrollMenu
            data={getListItems()}
            alignCenter={false}
            />
        </div>
    )
}

export default List;