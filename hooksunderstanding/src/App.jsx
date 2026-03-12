import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter , setCounter]=useState(15)

const addValue= ()=>{
  
  if(counter<20){
    counter=counter+1 
    setCounter(counter)
  }
  console.log(counter)
}

const subValue = ()=>{

  if(counter>0){
    counter=counter-1 
    setCounter(counter)
  }
  console.log(counter)
}
  return (
    <>
     <h1>Abhishek Mishra Counter {counter} </h1>
     <h3>Counter :{counter}</h3>
     <button onClick={addValue}>ADD 1 :{counter} </button>
     <br></br>
     <button onClick={subValue}>SUB 1 :{counter} </button>
    </>
  )
}

export default App
