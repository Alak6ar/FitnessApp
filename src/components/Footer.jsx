import React from "react";
import { FaEnvelope, FaFacebook, FaFax, FaGoogle, FaPhone, FaSnapchat, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import x from "../../public/images/x.jpg"
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-flex">
            <div className="footer-card">
                <div className="widget widget_gymedge_about">
                    <h3 className="widgettitle">About Company</h3>
                    <p>Praesent vel rutrum purus. Nam vel dui eu risus duis dignissim dignissim. Suspen disse at eros tempus, congueconsequat.Fusce sit amet urna feugiat.Praesent vel rutrum purus. Nam vel dui eu risus.</p>
                    <div className="footer-social-media-area">
                        <ul>
                            <li><Link><FaFacebook /></Link></li>
                            <li><Link><FaGoogle /></Link></li>
                            <li><Link><FaYoutube /></Link></li>
                            <li><Link><FaSnapchat /></Link></li>
                            <li><Link><FaTwitter /></Link></li>
                            <li><Link><FaTwitch /></Link></li>
                           
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-card">
                <div className="widget widget-do-etfw">
                    <h3 className="widgettitle">Follow Us on Twitter</h3>
                    <div className="twitter-timeline twitter-timeline-rendered">
                        <div className="x-logo">
                    <img src={x} alt="" />
                        </div>
                        <h2>Nothing to see here - </h2>
                    </div>
                </div>
            </div>
            <div className="footer-card">
                <div className="widget widget_gymedge_address">
                    <h3 className="widgettitle">Corporate Office</h3>
                    <ul>
                        <li>44 New Design Street, rne 005</li>
                        <li>
                            <Link to="tel:01800433633"><FaPhone />01800433633</Link>
                        </li>
                        <li>
                            <Link to="mailto:info@gymedge.com"><FaEnvelope />info@gymedge.com</Link>
                        </li>
                        <li>
                            <Link><FaFax/> (123) 118 9999</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
