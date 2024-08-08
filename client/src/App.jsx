import React, { useState } from 'react';
import './App.css';

function App() {
  const [year,setYear]=useState('');
  const [interest,setInterest]=useState('');
  const [result,setResult]=useState('');

  const SubmitForm= async(e) => {

    e.preventDefault();
    
    let url=`http://localhost:3000`;
    if(year) url+=`/${year}`;
    if(interest) url+=`/${interest}`;
    
    try{
      const response= await fetch(url);
      if(!response.ok)
        throw new Error();
      else
        console.log("fetch successfull");
      const data= await response.json();
      setResult(data);
     }
    catch{
      console.log("fetching unsuccessful");
      setResult(error.message);
    }
  };

  return (
    <>
      <form action="" onSubmit={SubmitForm}>
        <input type="number" id='year' value={year} onChange={(e)=> setYear(e.target.value)} placeholder='Enter Year'/>
        <input type="text" id='interest' value={interest} onChange={(e)=> setInterest(e.target.value)} placeholder='Enter your interests'/>
        <button type="submit" >Go back in time</button>
        <div>
          {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
      </form>
    </>
  )
}

export default App
