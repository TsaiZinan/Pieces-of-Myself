import React from 'react'
import { Link } from 'react-router-dom';

import { VscGithubAlt } from "react-icons/vsc";
import { RiWeiboLine, RiGithubLine, RiLinkedinLine, RiFacebookLine, RiTwitterLine } from "react-icons/ri";

import './FooterPage.css'

import config from '../../config';


const FooterPage = () => {
  return (
    <div className='footerPage'>

      <div className='footerPage-icons'>

        {config.githubUrl.length > 0 ?
        <a className='footerPage-icons-link' href={config.githubUrl}>
          <RiGithubLine />
        </a> : <></>}

        {config.weiboUrl.length > 0 ?
        <a className='footerPage-icons-link' href={config.weiboUrl}>
          <RiWeiboLine />
        </a> : <></>}

        {config.linkedinUrl.length > 0 ?
        <a className='footerPage-icons-link' href={config.linkedinUrl}>
          <RiLinkedinLine />
        </a> : <></>}

        {config.facebookUrl.length > 0 ?
        <a className='footerPage-icons-link' href={config.facebookUrl}>
          <RiFacebookLine />
        </a> : <></>}

        {config.twitterUrl.length > 0 ?
        <a className='footerPage-icons-link' href={config.twitterUrl}>
          <RiTwitterLine />
        </a> : <></>}
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