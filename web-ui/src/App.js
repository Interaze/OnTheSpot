import React, { Component }  from 'react';
// import LoginForm from './LoginForm';
import {IoMdSettings} from '../node_modules/react-icons/io';
import {SiSimpleanalytics} from '../node_modules/react-icons/si';
import {Link} from 'react-router-dom';
import Vtk from './Vtk';

export default class App extends Component {
  render() {
    return( 
      <div className="landing-page">
        <div className="verticle-menu">
          <a href="/#" className="active">
            Task 1
          </a>
          <a href="/#">Task 2</a>
          <a href="/#">Task 3</a>
          <a href="/#">Task 4</a>
          <a href="/#">Task 5</a>
        </div>
        
        <Vtk />
        
        <Link to="/settings" className="settings-button"><IoMdSettings color='white' fontSize='1.5rem'/></Link>
        <Link to="/analytics" className="analytics-button"><SiSimpleanalytics color='white' fontSize='1.5rem'/></Link>
      </div>
    )
  };
}