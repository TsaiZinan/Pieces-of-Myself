import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route, useParams } from 'react-router-dom';

import './AboutPage.css'

import MdDisplay from '../mdDisplay/MdDisplay';

const AboutPage = props => {

  return (
    <div className='aboutPage'>
      <MdDisplay inputMdText={props.about} />
    </div>
  )
}

AboutPage.propTypes = {}

export default AboutPage