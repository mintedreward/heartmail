import ButtonNavigation from "./ButtonNavigation";
import LinkNavigation from "./LinkNavigation";

function HeaderNavigation({ linkName }) {
  return (
    <div class="header-admin-div">
      <LinkNavigation linkName={linkName} />
      <ButtonNavigation />
    </div>
  );
}

export default HeaderNavigation;
