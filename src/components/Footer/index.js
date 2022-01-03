import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FacebookFilled,
  InstagramFilled,
  GithubFilled,
  MailFilled,
} from "@ant-design/icons";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* footer list */}
          <div className="col-12 col-md-3">
          
            
                 
            
         
            
          </div>
          {/* end footer list */}
          {/* footer list */}
          <div className="col-6 col-sm-4 col-md-3">
            <h6 className="footer__title">Resources</h6>
            <ul className="footer__list">
              
            </ul>
          </div>
          {/* end footer list */}
          {/* footer list */}
          <div className="col-6 col-sm-4 col-md-3">
            <h6 className="footer__title">Legal</h6>
            <ul className="footer__list">
              <li>
                <Link to="/">Terms of Use</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">Security</Link>
              </li>
            </ul>
          </div>
          {/* end footer list */}
          {/* footer list */}
          <div className="col-12 col-sm-4 col-md-3">
            <h6 className="footer__title">Contact</h6>
            <ul className="footer__list">
              <li>
                <Link to="/">ayush.tamta8@gmail.com</Link>
              </li>
              <li>
                <Link to="/"></Link>
              </li>
            </ul>
            <ul className="footer__social">
              <li className="facebook">
                <Link to="">
                  <FacebookFilled />
                </Link>
              </li>
              <li className="instagram">
                <Link to="">
                  <InstagramFilled />
                </Link>
              </li>
              <li className="mail">
                <Link to="">
                  <MailFilled />
                </Link>
              </li>
              <li className="github">
                <Link to="github.com/AyushTamta">
                  <GithubFilled />
                </Link>
              </li>
            </ul>
          </div>
          {/* end footer list */}
          {/* footer copyright */}
          
          </div>
          {/* end footer copyright */}
        </div>
      
    </footer>
  );
}
