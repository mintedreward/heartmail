import heroBg from "../assets/images/hero_bg.svg";
function HeroBackGroundDiv() {
  return (
    <div class="herobg-div">
      <img src={heroBg} alt="" class="img-fluid hero-desk" />
      <div class="herobg-mobile"></div>
    </div>
  );
}

export default HeroBackGroundDiv;
