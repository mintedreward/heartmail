import intro_1Img from "../assets/images/intro_1.svg";
import intro_2Img from "../assets/images/intro_2.svg";
import IntroComponent from "./IntroComponent";
function Introduction() {
  return (
    <>
      <IntroComponent
        isReverse={true}
        introImage={intro_1Img}
        introText="Wherever you want"
      />
      <IntroComponent
        isReverse={false}
        introImage={intro_2Img}
        introText="Wherever you want"
      />
    </>
  );
}

export default Introduction;
