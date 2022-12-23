import React from 'react'
// import ReactMarkdown from 'react-markdown';

import './HomePage.css'

import MdDisplay from '../mdDisplay/MdDisplay';
import ArticlePage from '../articlePage/ArticlePage';

// import about from '../../blogs/2022/新十条.md'
import about from '../../blogs/about.md'

// read the files name list of blog folder
// https://stackoverflow.com/questions/65587431/load-a-list-of-internal-files-in-react
const webpackContext = require.context('../../blogs/', false, /\.md$/)
const filenames = webpackContext.keys()



const HomePage = () => {




  return (
    <div className='Homepage'>
      <div>
        {filenames.map((title, titleIndex) => {
          return (
            <p>{title}</p>
          )
        })}
      </div>
      {/* <ReactMarkdown># Home *page*!</ReactMarkdown> */}
      {/* <ReactMarkdown children={readable.md} /> */}

      {/* <MdDisplay inputMdText={about} /> */}
      <ArticlePage article={about} />

    </div>
  )
}

export default HomePage