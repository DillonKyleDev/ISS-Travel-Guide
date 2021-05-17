import React, {useState} from 'react'
import HookCounter from './HookCounter'

function HookCounterTwo() {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <button onClick={() => setCount(6)}>Increment</button>
      <p>{count}</p>
      <button onClick={() => setCount(4)}>Decrement</button>
    </div>
  )
}


export default HookCounterTwo