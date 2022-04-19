import React from 'react'
import {Link} from 'react-router-dom';

function LoginForm(){
  // constructor(props);{
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

  return (
    <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-inner'>
            <h2>Login</h2>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input name='username' id='username' value={this.state.username} onChange={this.handleChange}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type='password'name='password' id='password' value={this.state.password} onChange={this.handleChange}></input>
            </div>
            <Link to="/home">
              <input type='submit' value='Login' onClick={this.setCSRF}></input>
            </Link>
          </div>
        </form>
        <div style={{marginTop: '20px'}}>
          {this.state.auth === null ? '' : (this.state.auth ? 'Login successful' : 'Login Failed' )}
        </div>
        <div className='other-button'>
          <button onClick={this.testEndpoint}>Continue</button>
        </div>
        <div>{this.state.endpoint === null ? '' : (this.state.endpoint ? 'Successful Request' : 'Request Rejected')}</div>
      </div>
  )
}

export default LoginForm;