import Test from "./test.jsx"
function App() {
const variable = "Injecting a variable which is pre calculated or executed called as EVALUATED EXPRESSION"
  return (
    <>
     <h1>Hello Vite+React project {variable} </h1> // here we directly give evaluated expresion if we want to inject variable , no if else or any other calculation here inside it must be done before 
    <Test/>
   
    </>
  )
}

export default App
