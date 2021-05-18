import React, {useState, useEffect} from 'react'


function UseEffect() {

  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  return (
    <div>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        Clicked {count} times
      </button>
    </div>
  )
}

export default UseEffect