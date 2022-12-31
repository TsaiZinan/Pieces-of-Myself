import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route, useParams } from 'react-router-dom';

import './ArticlePage.css'

import MdDisplay from '../mdDisplay/MdDisplay';

const ArticlePage = props => {

  const { path } = useParams();
  let mdPath = '/Pieces-of-Myself/static/media/' + path

  return (
    <div className='articlePage'>
      {/* <div>{path}</div>
      <div>{props.article}</div>
      {console.log(path)}
      {console.log(props.article)} */}
      <MdDisplay inputMdText={mdPath} />
    </div>
  )
}

ArticlePage.propTypes = {}

export default ArticlePage