import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom';
import {IoIosArrowForward} from 'react-icons/io'

function Settings() {
  return (
    <div className="landing-page">
      <Link to="/" className="settings-button"><BiArrowBack color='white' fontSize='1.5rem'/></Link>
      <div className='settings-div'>
        <form className='setting-form'>
          <div className='form-inner'>
            <h2>Profile</h2>
            <div className='form-group'>
              <label htmlFor='firstName'>First name:</label>
              <input name='firstName' id='firstName' value="John"></input>
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last name:</label>
              <input name='password' id='password' value="Doe"></input>
            </div>
          </div>
        </form>
        <form className='setting-form'>
          <div className='form-inner'>
            <h2>Password</h2>
            <div className='form-group'>
              <label htmlFor='firstName'>Current Password:</label>
              <input name='firstName' id='firstName'></input>
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>New Password:</label>
              <input name='password' id='password'></input>
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Re-enter new Password:</label>
              <input name='password' id='password'></input>
            </div>
            <input type='submit' value='Submit'></input>
          </div>
        </form>
        <form className='setting-form'>
          <div className='form-inner'>
            <h2>Two-Factor Auth</h2>
            <button className='section-button'><IoIosArrowForward/></button>
          </div>
        </form>
        <a href='login'><h2 className='closeAccount'>Close Account</h2></a>
      </div>
    </div>
  )
}

export default Settings