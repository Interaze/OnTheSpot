import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom';

function Analytics() {
  return (
    <div className="landing-page">
      <div className="verticle-menu">
        <a href="#" className="active">
          Task 1
        </a>
        <a href="#">Task 2</a>
        <a href="#">Task 3</a>
        <a href="#">Task 4</a>
        <a href="#">Task 5</a>
      </div>
      <Link to="/" className="settings-button"><BiArrowBack color='white' fontSize='1.5rem'/></Link>
    </div>
  )
}

export default Analytics