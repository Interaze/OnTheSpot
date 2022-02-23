import logo from './logo.svg';
import './App.css';

function App() {
  return (
    
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