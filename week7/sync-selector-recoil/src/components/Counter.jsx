import React from 'react'
import { useRecoilState } from 'recoil'
import { countAtom } from '../store/atoms'

const Counter = () => {
    const [count,setCount] = useRecoilState(countAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default Counter
