import React, { Component }  from 'react';
import {IoMdSettings} from '../node_modules/react-icons/io';
import {SiSimpleanalytics} from '../node_modules/react-icons/si';
import {Link} from 'react-router-dom';
import axios from 'axios'


export default class App extends Component {

constructor(props){
  super(props)
  this.state = {
    posts: []
  }
}

componentDidMount(){
  axios.get('https://jsonplaceholder.typicode.com/todos')
  .then(Response =>{
      this.setState({
        posts: Response.data
      })
      console.log(Response.data)
    })
}

render() {
  const {posts} = this.state
  return( 
    <div className="landing-page">
      <div className="verticle-menu">
        {
          posts.map(posts => <a key={posts.id}>{posts.id}. {posts.title}</a>)
        }
      </div>
      {/* <iframe title='vtk' src="https://kitware.github.io/vtk-js/examples/SimpleCone.html"></iframe> */}
      <Link to="/settings" className="settings-button"><IoMdSettings color='white' fontSize='1.5rem'/></Link>
      <Link to="/analytics" className="analytics-button"><SiSimpleanalytics color='white' fontSize='1.5rem'/></Link>
      <a href="login" className="logout-button">Logout</a>
    </div>
  )
};
}
