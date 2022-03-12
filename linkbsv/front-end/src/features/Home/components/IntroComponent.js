function IntroComponent({ isReverse, introText, introImage }) {
  return (
    <section class="intro-1">
      <div class="intro-div">
        <div class="container">
          <div
            className={`row justify-content-md-center ${
              isReverse ? "flex-row-reverse" : ""
            }`}
            style={{ alignItems: "center" }}
          >
            <div class="col-sm-12 col-md-4 cols col-md-push-4">
              <img src={introImage} alt="" class="img-fluid" width="200" />
            </div>
            <div class="col-sm-12 col-md-4 cols col-md-push-4">
              <h3>{introText}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroComponent;
