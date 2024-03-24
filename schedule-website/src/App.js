import React, { useEffect, useState } from 'react';
import logo from './gator.png';
import secondlogo from './image0.png'; 
import './App.css';

function App() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/getschedule')
      .then(response => response.json())
      .then(data => setSchedule(data));
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={secondlogo} className="App-secondlogo" alt="secondlogo" />
          Welcome to the UF Club Info Hub! 
        </header>

        <div className="underlined-text">UPCOMING EVENTS AND ANNOUNCEMENTS</div>

        <div className="text-box-container">
          {Object.entries(schedule).length > 0 ? Object.entries(schedule).map(([club, events], index) => (
            <div key={index} className="text-box">
              <strong>{club}:</strong> {events.map(event => event.join(', ')).join('; ')}
            </div>
          )) : (
            <>
              <div className="text-box">Open Source Club: event this,event that</div>
              <div className="text-box">HAHAHAHAHAH</div>
              <div className="text-box">JAJAJAJ</div>
              <div className="text-box">KKAKAKAK</div>
              <div className="text-box">AZASAD</div>
              <div className="text-box">aSDSADASD</div>
            </>
          )}
        </div>
      </div>

      <footer></footer>
    </>
  );
}

export default App;



