import React from 'react'
// import ReactMarkdown from 'react-markdown';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './HomePage.css'

import MdDisplay from '../mdDisplay/MdDisplay';
import ArticlePage from '../articlePage/ArticlePage';
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
      <div className='Homepage'>

        <Link to='/Pieces-of-Myself/about'>
          <p>About</p>
        </Link>
        <Link to='/Pieces-of-Myself/'>
          <p>Table</p>
        </Link>



        <Routes>
          <Route path="/Pieces-of-Myself/about" element={<MdDisplay inputMdText={about} />} />
          <Route path="/Pieces-of-Myself/" element={<TableOfContents />} />
          <Route path="/Pieces-of-Myself/static/media/:path" element={<ArticlePage />} />
        </Routes>


      </div>
    </Router>

  )
}

export default HomePage