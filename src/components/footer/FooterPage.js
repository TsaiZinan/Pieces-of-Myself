import React from 'react'
import { Link } from 'react-router-dom';

import { VscGithubAlt } from "react-icons/vsc";
import { RiWeiboLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";

import './FooterPage.css'

import config from '../../config';


const FooterPage = () => {
  return (
    <div className='footerPage'>
      
      <div className='footerPage-icons'>
        <a className='footerPage-icons-link' href={config.githubUrl}>
          <RiGithubLine />
        </a>
        <a className='footerPage-icons-link' href={config.weiboUrl}>
          <RiWeiboLine />
        </a>
      </div>

      {/* <div className='footerPage-link'>
        <Link to='/about' className='footerPage-link-text'>
          About
        </Link>
      </div> */}

    </div>
  )
}

export default FooterPage