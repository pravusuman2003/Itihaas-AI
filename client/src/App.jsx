import React, { useState } from 'react';
import Event from './Event.jsx';
import './App.css';

function App() {
  const [year, setYear] = useState('');
  const [interest, setInterest] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const SubmitForm = async (e, random = false) => {
    e.preventDefault();

    let url = `https://itihaas-ai-api.vercel.app`;

    if (random) {
      // If "I am feeling lucky" button was clicked
      url += '/random year/random interest';
    } else {
      // If primary button was clicked
      if (year) url += `/${year}`; else url += '/random year';
      if (interest) url += `/${interest}`; else url += '/random interest';
    }

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error('Failed to fetch data');
      
      console.log("fetch successful");
      let data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      console.log("fetching unsuccessful");
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <>
      <h2>Itihaas AI</h2>
      <form onSubmit={(e) => SubmitForm(e, false)}>
        <input type="number" id='year' value={year} onChange={(e) => setYear(e.target.value)} placeholder='Enter Year' />
        <input type="text" id='interest' value={interest} onChange={(e) => setInterest(e.target.value)} placeholder='Enter your interests' />
        <div className='buttons'>
          <button type="submit">Go back in time</button>
          {/* <button type="button" onClick={(e) => SubmitForm(e, true)}>I am feeling lucky</button> */}
        </div>
      </form>
      <div className='events-container'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result && result.length > 0 && (
          <>
            {result.map((event, index) => (
              <div key={index} className='event-box'>
                <Event title={event.title} description={event.description} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
