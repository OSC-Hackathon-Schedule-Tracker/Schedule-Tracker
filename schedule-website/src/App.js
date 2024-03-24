import React, { useEffect, useState } from 'react';
import logo from './gator.png';
import secondlogo from './image0.png'; 
import './App.css';

function App() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/getschedule')
      .then(response => response.json())
      .then(data => setSchedule(data));
  }, []);

  const formatEventData = (data) => {
    return Object.entries(data).map(([clubName, events]) => (
      <div key={clubName} className="text-box">
        <strong>{clubName}:</strong>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              - {event[0]}, Date: {event[1]}, Time: {event[2]}, Location: {event[3] === '~' ? 'null' : event[3]}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

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
          {Object.entries(schedule).length > 0 ? (
            formatEventData(schedule)
          ) : (
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






