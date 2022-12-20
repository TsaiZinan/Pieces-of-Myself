import React from 'react'
// import ReactMarkdown from 'react-markdown';

import './HomePage.css'

import MdDisplay from '../mdDisplay/MdDisplay';

// import about from '../../blogs/2022/新十条.md'
import about from '../../blogs/about.md'

// https://stackoverflow.com/questions/65587431/load-a-list-of-internal-files-in-react
const webpackContext = require.context('../../blogs/', false, /\.md$/)
const filenames = webpackContext.keys()
// const key_value_pairs = filenames.map(name => [name.match(/\/(\w+)\.md$/)[1], webpackContext(name)])
// const messages = Object.fromEntries(key_value_pairs)


const HomePage = () => {

  // let [readable, setReadable] = React.useState({ md: "" });

  // React.useEffect(() => {
  //   fetch(about)
  //     .then((res) => res.text())
  //     .then((md) => {
  //       setReadable({ md });
  //     });
  // }, []);



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

      <MdDisplay inputMdText={about} />

    </div>
  )
}

export default HomePage