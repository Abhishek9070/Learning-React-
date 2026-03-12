
import Test from "./test.js";
function App() {
  return (   // HERE WE CAN RETURN JUST A SINGLE ELEMENT SO WRAPPING EVERYHTHING IN DIV IS SLOW SO 
    // FRAGMENT (<> </>) COMES INTO ACTION 
    <>
   <h1>HELOO REACT APP</h1>   
   <Test/>
   </>
  );
}

export default App;
