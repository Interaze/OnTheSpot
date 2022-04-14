import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom';

function Settings() {
  return (
    <div className="landing-page">
      <Link to="/" className="settings-button"><BiArrowBack color='white' fontSize='1.5rem'/></Link>
    </div>
  )
}

export default Settings