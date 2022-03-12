function LinkNavigation({ linkName }) {
  return (
    <div class="top-nav-div">
      {linkName !== "link" && <a href="/account/dashboard">Links</a>}
      {linkName === "link" && <span class="active">Links</span>}
      {linkName !== "appearance" && <a href="/account/appearance">Appearance</a>}
      {linkName === "appearance" && <span class="active">Appearance</span>}
      {linkName !== "setting" && <a href="/account/settings">Settings</a>}
      {linkName === "setting" && <span class="active">Settings</span>}
    </div>
  );
}

export default LinkNavigation;
