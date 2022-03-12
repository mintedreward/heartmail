import ContentArea from "./components/ContentArea";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import HeroBackGroundDiv from "./components/HeroBackgroudDiv";
import HeroDiv from "./components/HeroDiv";
import "./styles/home.css";

function Home() {
  return (
    <div className="container-home-root">
      <div>
        <HeroBackGroundDiv />
      </div>
      <div>
        <Header />
      </div>
      <div>
        <HeroDiv />
      </div>
      <div>
        <ContentArea />
      </div>
      <div  style={{marginTop:'15rem'}}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
