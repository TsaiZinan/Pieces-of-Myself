import React from 'react'
// import ReactMarkdown from 'react-markdown';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './HomePage.css'

import MdDisplay from '../mdDisplay/MdDisplay';
import ArticlePage from '../articlePage/ArticlePage';
import AboutPage from '../aboutPage/AboutPage';
import TableOfContents from '../tableOfContents/TableOfContents';


import about from '../../blogs/about.md'





const HomePage = () => {


  // function importAll(r) {
  //   let mdFiles = {};
  //   r.keys().map(item => { mdFiles[item.replace('./', '')] = r(item); });
  //   return mdFiles;
  // }

  // const mdFiles = importAll(require.context('../../blogs/', false, /\.md$/));




  return (
    <Router>
      <div className='homepage'>

        <div className='homepage-nav'>

          <Link to='/Pieces-of-Myself/' className='homepage-nav-text'>
            <p>Home</p>
          </Link>
          <Link to='/Pieces-of-Myself/about' className='homepage-nav-text'>
            <p>About</p>
          </Link>

        </div>





        <Routes>
          {/* <div className='homepage-about'>
            <Route path="/Pieces-of-Myself/about" element={<MdDisplay inputMdText={about} />} />
          </div> */}
          <Route path="/Pieces-of-Myself/about" element={<AboutPage about={about} />} />
          <Route path="/Pieces-of-Myself/" element={<TableOfContents />} />
          <Route path="/Pieces-of-Myself/static/media/:path" element={<ArticlePage />} />
        </Routes>


      </div>
    </Router>

  )
}

export default HomePage