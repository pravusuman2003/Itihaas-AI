import React, { useState } from 'react';
import Event from './Event.jsx';
import './App.css';

function App() {
  const [year,setYear]=useState('');
  const [interest,setInterest]=useState('');
  const [result,setResult]=useState(null);
  const [error,setError]=useState('');

  const SubmitForm= async(e) => {

    e.preventDefault();
    
    let url=`https://itihaas-ai-api.vercel.app`;
    if(year) url+=`/${year}`;
    if(interest) url+=`/${interest}`;
    
    try{
      const response= await fetch(url,{ mode: 'no-cors' });
      if(!response.ok)
        throw new Error();
      else
        console.log("fetch successfull");
        let data= await response.json();
        setResult(data);
        setError(null);
     }
    catch{
      console.log("fetching unsuccessful");
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <>
      <h2>Itihaas AI</h2>
      <form action="" onSubmit={SubmitForm}>
        <input type="number" id='year' value={year} onChange={(e)=> setYear(e.target.value)} placeholder='Enter Year'/>
        <input type="text" id='interest' value={interest} onChange={(e)=> setInterest(e.target.value)} placeholder='Enter your interests'/>
        <button type="submit" >Go back in time</button>
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
  )
}

export default App
