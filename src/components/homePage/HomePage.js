import React from 'react'
// import ReactMarkdown from 'react-markdown';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './HomePage.css'

import MdDisplay from '../mdDisplay/MdDisplay';
import ArticlePage from '../articlePage/ArticlePage';
import TableOfContents from '../tableOfContents/TableOfContents';

import Testabout from '../Testabout';

import about10 from '../../blogs/221209-新十条.md'
import about from '../../blogs/about.md'

import mdFiless from '../../blogs/index'




const HomePage = () => {


  function importAll(r) {
    let mdFiles = {};
    r.keys().map(item => { mdFiles[item.replace('./', '')] = r(item); });
    return mdFiles;
  }

  const mdFiles = importAll(require.context('../../blogs/', false, /\.md$/));

  console.log(Object.values(mdFiles)[3]);
  console.log(about);
  

  const testText9 = require(`../../blogs/${Object.keys(mdFiles)[3]}`)
  const testText10 = require(`../../blogs/${Object.keys(mdFiles)[4]}`)
  // console.log(testText10);
  // console.log(about);


  return (
    <Router>
      <div className='Homepage'>

        <Link to='/Pieces-of-Myself/about'>
          <p>About</p>
        </Link>
        <Link to='/Pieces-of-Myself/'>
          <p>Table</p>
        </Link>
        <Link to='/Pieces-of-Myself/10'>
          <p>10</p>
        </Link>
        <Link to='/Pieces-of-Myself/9'>
          <p>9</p>
        </Link>


        
        {/* <ArticlePage article={testText10} /> */}



        <Routes>
          <Route path="/Pieces-of-Myself/aaa" element={<Testabout />} />
          <Route path="/Pieces-of-Myself/" element={<TableOfContents />} />
          <Route path="/Pieces-of-Myself/about" element={<ArticlePage article={about} />} />
          <Route path="/Pieces-of-Myself/10" element={<ArticlePage article={about10} />} />
          <Route path="/Pieces-of-Myself/9" element={<ArticlePage article={Object.values(mdFiles)[3]} />} />
          {/* <Route path="/">
            <ArticlePage article={about} />
          </Route> */}
        </Routes>






        {/* <ReactMarkdown># Home *page*!</ReactMarkdown> */}
        {/* <ReactMarkdown children={readable.md} /> */}

        {/* <MdDisplay inputMdText={about} /> */}
        {/* <Testabout /> */}
        {/* <TableOfContents /> */}
        {/* <ArticlePage article={about} /> */}

      </div>
    </Router>

  )
}

export default HomePage