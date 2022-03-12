function MySetting() {
  return (
    <div class="settings rounded-large-box ">
      <h4>Settings Title</h4>
      <div class="setting-box clearfix">
        <span class="settingicon">
          <i class="icon-settings-sliders"></i>
        </span>
        <div class="txt">Settings Description goes here</div>

        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default MySetting;
