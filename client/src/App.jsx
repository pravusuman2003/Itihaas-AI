import React, { useState } from 'react'
import './App.css'

function App() {
  const SubmitForm= async(e) => {
    e.preventDefault();
    try{
      const res= await fetch()
    }
  }

  return (
    <>
    <form action="" onSubmit={SubmitForm}>
      <input type="number" name="" id="" />
      <button type="submit">Submit</button>
      <div>
        Response: {JSON.stringify(response)}
      </div>
    </form>
      
    </>
  )
}

export default App
