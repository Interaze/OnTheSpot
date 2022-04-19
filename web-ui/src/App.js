import React, { Component }  from 'react';
// import LoginForm from './LoginForm';
// import {IoMdSettings} from '../node_modules/react-icons/io';
// import {SiSimpleanalytics} from '../node_modules/react-icons/si';
// import {Link} from 'react-router-dom';

import axios from './axiosConfig';
export default class App extends Component {
  constructor(props){
  super(props)
  this.state = {
    username: '',
    password: '',
    auth: null,
    endpoint: null
  }
}
setCSRF = () => {
  axios.get('api/set-csrf/').then(res => console.log(res))
}
handleChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
}
handleSubmit = (event) => {
  event.preventDefault();
  axios.post('/api/login/',
  {username: this.state.username,
  password: this.state.password}
  ).then(res => {
  this.setState({auth: true})
  }).catch(res => this.setState({auth: false}))
}
testEndpoint = () => {
  axios.get('/api/test-auth/').then(res => this.setState(
  {endpoint:      true}))
  .catch(res => this.setState({endpoint: false})) 
}
render() {
  return <div className='App'>
      <form onSubmit={this.handleSubmit}>
        <div className='form-inner'>
          <h2>Login</h2>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input name='username' id='email' value={this.state.username} onChange={this.handleChange}></input>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password'name='password' id='password' value={this.state.password} onChange={this.handleChange}></input>
          </div>
          <input type='submit' value='Login' onClick={this.setCSRF}></input>
        </div>
       </form>
      <div>
        {this.state.auth === null ? '' : (this.state.auth ? 'Login successful' : 'Login Failed' )}
      </div>
      <div className='other-button'>
        <button onClick={this.testEndpoint}>Test Endpoint</button>
      </div>
      <div>{this.state.endpoint === null ? '' : (this.state.endpoint ? 'Successful Request' : 'Request Rejected')}</div>
    </div>
};
}


// import React, { Component } from 'react';
// import './App.css';
// // Notice we're importing from the file we created, not the axios package
// import axios from './axiosConfig';
// export default class App extends Component {
//   constructor(props){
//   super(props)
//   this.state = {
//     username: '',
//     password: '',
//     auth: null,
//     endpoint: null
//   }
// }
// setCSRF = () => {
//   axios.get('api/set-csrf/').then(res => console.log(res))
// }
// handleChange = (e) => {
//   this.setState({[e.target.name]: e.target.value})
// }
// handleSubmit = (event) => {
//   event.preventDefault();
//   axios.post('/api/login/',
//   {username: this.state.username,
//   password: this.state.password}
//   ).then(res => {
//   this.setState({auth: true})
//   }).catch(res => this.setState({auth: false}))
// }
// testEndpoint = () => {
//   axios.get('/api/test-auth/').then(res => this.setState(
//   {endpoint:      true}))
//   .catch(res => this.setState({endpoint: false})) 
// }
// render() {
//   return <div style={{marginLeft: '20px'}}>
//       <div style={{height: '50px'}}></div>
//       <button onClick={this.setCSRF}>Set CSRF Token</button>
//       <div style={{height: '50px'}}></div>
//       <form onSubmit={this.handleSubmit}>
//         <label>Username</label>
//         <input name='username' value={this.state.username} onChange={this.handleChange}></input>
//         <label >Password</label>
//         <input name='password' value={this.state.password} onChange={this.handleChange}></input>
//         <input type='submit' value='Login'></input>
//        </form>
//        <div style={{height: '50px'}}></div>
//       <div>
//         {this.state.auth === null ? '' : (this.state.auth ? 'Login successful' : 'Login Failed' )}
//       </div>
//       <div style={{height: '50px'}}></div>
//       <button onClick={this.testEndpoint}>Test Endpoint</button>
//       <div>{this.state.endpoint === null ? '' : (this.state.endpoint ? 'Successful Request' : 'Request Rejected')}</div>
//     </div>
// };
// }