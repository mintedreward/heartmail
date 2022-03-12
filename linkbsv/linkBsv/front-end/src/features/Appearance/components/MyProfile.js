import UserAvatar from "../../../repository/components/userAvatar/userAvatar";

function MyProfile() {
  return (
    <div >
      <h2 style={{fontSize:'28px',fontWeight:'500',color:'rgba(2,41,89,1)'}}>My Profile</h2>
      <div class="profileblk rounded-large-box ">
        <div class="editicon">
          <a href="#">
            <i class="icon-pencil"></i>
          </a>
        </div>
        <div class="">
          <span>
            <UserAvatar avatarUrl={localStorage.getItem("avatarUrl")} color="rgba(0,0,0,0.2)"/>
          </span>
        </div>
        <div class="txt">
          <h2 style={{fontWeight:'600'}}>{localStorage.getItem("userName")}</h2>
          <p>{localStorage.getItem("paymail")}</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
