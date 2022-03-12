
import ListViewCommunity from "../ListViewCommunity";

function CommunityArea(props) {


  return (
    <div class="community pt-5 pb-5">
      <div class="container pt-5 mt-5">
        <div className="header pb-5 mb-5" >
          <h3 class="blk-title text-left pt-30 pb-30" style={{fontSize:'3rem'}}>Explore Our Community</h3>
          <h6 style={{fontSize:'1.2rem',lineHeight:'2.2rem', maxWidth:'60%',color:'rgba(0,0,0,0.7)'}}>
          The world's biggest influencers, creators, publishers and brands use LinkBsv in their marketing strategy.
          </h6>
        </div>
        <div class="row">
          {
            props.users?
            <ListViewCommunity users={props.users}/>
            :
            <span></span>

          }
        </div>
      </div>
    </div>
  );
}

export default CommunityArea;
