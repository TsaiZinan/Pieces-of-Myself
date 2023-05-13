import React from 'react'
import { Link } from 'react-router-dom';

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

      <div className='footerPage-link'>
        <Link to='/about' className='footerPage-link-text'>
          About
        </Link>
      </div>

    </div>
  )
}

export default FooterPage