import appLogo from "../../assets/images/icons/app-logo.svg";

function SideBar() {
  return (
    <aside className="left-side">
      <div className="left-side-div">
        <div className="logo p-1">
          <img src={appLogo} alt="" className="img-fluod" />
        </div>

        <div className="user-bottom">
          <i className="icon-user"></i>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
