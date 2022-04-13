import React, {useState} from 'react';
import LoginForm from './LoginForm';
import Analytics from './Analytics';
import Settings from './Settings';
import {IoMdSettings} from '../node_modules/react-icons/io';
import {SiSimpleanalytics} from '../node_modules/react-icons/si';

function App(){
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if(details.email === adminUser.email && details.password === adminUser.password){
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
    <div>
      {(user.email !== "") ? (
        <div className='landing-page'>
          <div className = "verticle-menu">
            <a href="#" className='active'>Task 1</a>
            <a href="#">Task 2</a>
            <a href="#">Task 3</a>
            <a href="#">Task 4</a>
            <a href="#">Task 5</a>
          </div>
          <button onClick={Logout} className="logout-button">Logout</button>
          <button onClick={<Settings/>} className="settings-button"><IoMdSettings color='white' fontSize='1.5rem'/></button>
          <button onClick={<Analytics/>} className="analytics-button"><SiSimpleanalytics color='white' fontSize='1.5rem'/></button>
        </div>
      ) : (
        <div className='App'>
          <LoginForm Login={Login} error={error}/>
        </div>
      )}
    </div>
  );
}

export default App;
