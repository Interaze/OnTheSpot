import logo from './logo.svg';
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Chris <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div id="draggable">
        <h3>Log in</h3>
        <form action="loginFunc.php" method="POST">
            <input type="text" placeholder="Username" class="textInput" name="User"></input>
            <input type="password" placeholder="Password" class="textInput" name="Password"></input>
            <br></br>
            <input type="submit" value="Submit" id="submitBttn"></input>
        </form>
    </div>
  );
}

export default App;
