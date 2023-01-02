import React from 'react'
import { VscGithubAlt } from "react-icons/vsc";
import { RiWeiboLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";

import './FooterPage.css'


const FooterPage = () => {
  return (
    <div className='footerPage'>
      <div className='footerPage-icons'>
        <a className='footerPage-icons-link' href="https://github.com/TsaiZinan">
          <RiGithubLine />
        </a>
        <a className='footerPage-icons-link' href="https://weibo.com/1932764551">
          <RiWeiboLine />
        </a>
      </div>

    </div>
  )
}

export default FooterPage