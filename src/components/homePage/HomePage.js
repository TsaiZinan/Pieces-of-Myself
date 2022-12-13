import React from 'react'
import ReactMarkdown from 'react-markdown';

import about from '../../blogs/2022/新十条.md'

const HomePage = () => {

  let [readable, setReadable] = React.useState({ md: "" });

  React.useEffect(() => {
    fetch(about)
      .then((res) => res.text())
      .then((md) => {
        setReadable({ md });
      });
  }, []);



  return (
    <div>
      <ReactMarkdown># Home *page*!</ReactMarkdown>
      <ReactMarkdown children={readable.md} />
    </div>
  )
}

export default HomePage