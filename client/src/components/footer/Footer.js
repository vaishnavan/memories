import React, { Component } from 'react';
import {Icon} from 'semantic-ui-react';
import './footer.css';

export class Footer extends Component {
    render() {
        return (
            <div data-aos="fade-up" className="footer_main">
                <div className="footer_Icons">
                    <span className="footer_git"><a target="_blank" rel="noreferrer" href="https://github.com/vaishnavan"><Icon name="github" size="big" /></a></span>
                    <span className="footer_link"><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/sakthi-born-to-win-b13956178/"><Icon name="linkedin" size="big" /></a></span>
                    <span className="footer_insta"><a target="_blank" rel="noreferrer" href="https://www.instagram.com/sakthi_ns_pulsar_5/"><Icon name="instagram" size="big" /></a></span>
                    <span className="footer_wht"><a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=919047609410"><Icon name="whatsapp" size="big" /></a></span>
                    <span className="footer_twi"><a target="_blank" rel="noreferrer" href="https://twitter.com/b7fbeae90e3e449"><Icon name="twitter" size="big" /></a></span>
                </div>
                <div  className="footer_content">
                    <span>copyrights <Icon name="copyright" />2021 - Designed and Developed by Vaishnavan M</span>
                </div>
            </div>
        )
    }
}

export default Footer;