import React, {useState} from 'react';
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
  return <div>
      <div style={{height: '50px'}}></div>
      <button onClick={this.setCSRF}>Set CSRF Token</button>
      <div style={{height: '50px'}}></div>
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
          <input type='submit' value='Login'></input>
        </div>
       </form>
       <div style={{height: '50px'}}></div>
      <div>
        {this.state.auth === null ? '' : (this.state.auth ? 'Login successful' : 'Login Failed' )}
      </div>
      <div style={{height: '50px'}}></div>
      <button onClick={this.testEndpoint}>Test Endpoint</button>
      <div>{this.state.endpoint === null ? '' : (this.state.endpoint ? 'Successful Request' : 'Request Rejected')}</div>
    </div>
};
}


// function App() {
//   const adminUser = {
//     email: 'admin@admin.com',
//     password: 'admin123',
//   };

//   const [user, setUser] = useState({ email: '' });
//   const [error, setError] = useState('');

//   const Login = (details) => {
//     console.log(details);

//     if (
//       details.email === adminUser.email &&
//       details.password === adminUser.password
//     ) {
//       console.log('Logged in');
//       setUser({
//         email: details.email,
//       });
//     } else {
//       console.log('Details do not match');
//       setError('Details do not match!');
//     }
//   };

//   const Logout = () => {
//     setUser({
//       email: '',
//     });
//   };

//   return (
//       <div>
//         {user.email !== '' ? (
//           <div className="landing-page">
//             <div className="verticle-menu">
//               <a href="#" className="active">
//                 Task 1
//               </a>
//               <a href="#">Task 2</a>
//               <a href="#">Task 3</a>
//               <a href="#">Task 4</a>
//               <a href="#">Task 5</a>
//             </div>
//             <button onClick={Logout} className="logout-button">
//               Logout
//             </button>
//             <Link to="/settings" className="settings-button"><IoMdSettings color='white' fontSize='1.5rem'/></Link>
//             <Link to="/analytics" className="analytics-button"><SiSimpleanalytics color='white' fontSize='1.5rem'/></Link>
//           </div>
//         ) : (
//           <div className="App">
//             <LoginForm Login={Login} error={error} />
//           </div>
//         )}
//       </div>
//   );
// }

// export default App;
