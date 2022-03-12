const Item = (props)=>{
    return (
        <div className="container-linkItem-root p-4">
            <div className="row">
                <div className="col col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
                <div className="col col-lg-10 col-md-10 col-sm-2 col-xs-10">
                    <div className="text-left">
                        <div className="text-left">
                            <h3 className="title mb-2 text-left">My Handcash Link</h3>
                        </div>
                        <div>
                            <span>
                                love me some pew pew
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
            </div>
        </div>
    )
}

export default Item;