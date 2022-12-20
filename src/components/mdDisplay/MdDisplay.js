import React from 'react'
// import PropTypes from 'prop-types'

import ReactMarkdown from 'react-markdown';

const MdDisplay = props => {

  const inputMdText = props.inputMdText;

  let [readable, setReadable] = React.useState({ md: "" });

  React.useEffect(() => {
    fetch(inputMdText)
      .then((res) => res.text())
      .then((md) => {
        setReadable({ md });
      });
  }, []);



  return (
    <div>
      <ReactMarkdown children={readable.md} />
    </div>
  )
}

// MdDisplay.propTypes = {}

export default MdDisplay