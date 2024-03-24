import logo from './gator.png';
import secondlogo from './image0.png'; 


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={secondlogo} className="App-secondlogo" alt="secondlogo" />
        Welcome to the UF Club Info Hub!
      </header>
  
      <div className="underlined-text">UPCOMING EVENTS AND ANNOUNCEMENTS</div>

      <div className="text-box-container">
        <div className="text-box">Open Source Club: *event this, *event that</div>
        <div className="text-box"></div>
        <div className="text-box"></div>
        <div className="text-box"></div>
        <div className="text-box"></div>
        <div className="text-box"></div>
      </div>
    </div>
  );
}

export default App;


