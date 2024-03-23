import logo from './gator.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the UF Club Info Hub!
        </p>
        <div className="text-box"></div>
        <div className="text-box"></div>
        <div className="text-box"></div>
      </header>
    </div>
  );
}

export default App;
