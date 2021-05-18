import React, {useState} from 'react'

function HookCounterArray() {

  const [myArray, setArray] = useState([1,2,3,4]);

  return (
    <div>
      <h2>{myArray[0]}</h2>
      <h2>{myArray[1]}</h2>
      <h2>{myArray[2]}</h2>
      <h2>{myArray[3]}</h2>
      <button onClick={setArray()}>increment Array 1</button>
    </div>
  )
}

export default HookCounterArray