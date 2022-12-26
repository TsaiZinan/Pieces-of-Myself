import React from 'react'
import PropTypes from 'prop-types'

import MdDisplay from '../mdDisplay/MdDisplay';

const ArticlePage = props => {
  return (
    <div>
      <MdDisplay inputMdText={props.article} />
    </div>
  )
}

ArticlePage.propTypes = {}

export default ArticlePage