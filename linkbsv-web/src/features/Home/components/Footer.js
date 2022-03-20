import "../styles/footer.css"
function Footer() {
  return (
      <div className="footer-container-root">
        <div className="row">
          <div className="col col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>
          <div className="col col-lg-8 col-md-8 col-sm-8 col-xs-12">
            <div className="footer">
              <div>
                <h3 className="footer-header pb-2">Our Business Partners</h3>
              </div>
              <div className="underline1"></div>

              <div className="feature-box">
                <div className="feature-item ">Handcash Wallet</div>
                <div className="feature-item mr-4 ml-4">DappInstitute</div>
                <div className="feature-item mr-4">Coingeek</div>
                <div className="feature-item">Bitcoin Computer</div>
              </div>
              <div className="footer-box">
                <div className="footer-col">
                  <ul>
                    <li className="col-h">Company</li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Press</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <ul>
                    <li className="col-h">Company</li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Press</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <ul>
                    <li className="col-h">Company</li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Press</a></li>
                  </ul>
                </div>
              </div>
              <div className="footer-end">
                <h3>&#169; HeartMail Inc. {new Date().getFullYear()}</h3>
                <div className="social-links">
                  <a href="#"><img className="social-buttons" src="" alt="" /></a>
                  <a href="#"><img className="social-buttons" src="" alt="" /></a>
                  <a href="#"><img className="social-buttons" src="" alt="" /></a>
                  <a href="#"><img className="social-buttons" src="" alt="" /></a>
                  <a href="#"><img className="social-buttons" src="" alt="" /></a>
                </div>
              </div>
            </div>

          </div>
          <div className="col col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>
        </div>
      </div>
  );
}

export default Footer;
