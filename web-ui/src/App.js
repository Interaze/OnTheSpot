import React, {useState} from 'react';
import LoginForm from './LoginForm';
import authHeader from './services/auth-header';
import authService from './services/auth.service';
import userService from './services/user.service';

function App(){
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if(details.email == adminUser.email && details.password == adminUser.password){
      console.log("Logged in");
      setUser({
        email: details.email
      });
    }else{
      console.log("Details do not match");
      setError("Details do not match!");
    }
  }

  const Logout = () =>{
    setUser({
      email: ""
    });
  }

  return(
    <div className = "App">
      {(user.email != "") ? (
        <div className = "welcome">
          <h2>Welcome</h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}


export default App;