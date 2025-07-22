import './App.css'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)

  /* 
      useEffect(() => {
        first
      
        return () => {
          second
        }
      }, [third])
      
      first => side effect fn (to make effect works)
      second => cleanup fn  (To clean unmount thing)
      third=> comma sep dependeny arr , when updates then useffect calls 
       */


  //variation no = 1  run at every time 
  // useEffect(() => {
  //   alert("hi")
  // })


  //variation no = 2   run at 1 time
  // useEffect(() => {
  //   alert("Only 1 time")
  // }, [])

  //variation no = 3  run when arr updated
  // useEffect(() => {
  //   alert("Only when updated time")
  // }, [count])

  //variation no =4  run when each one of them will update
  // useEffect(() => {
  //   alert("Only when total/count updated")
  // }, [count,total])


  //variation no =5  alert run when count update; when previous count is updated then it unmounted then cleanup will trigger 
  // useEffect(() => {
  //   alert("count updated")

  //   return () => {
  //     alert("Count is unmounted")
  //   }
  // }, [count])


  




  function handleClick() {
    setCount(count + 1);
  }

  function handletotal() {
    setTotal(total + 1);
  }


  return (
    <div>

      <h1>Hey</h1>
      <button onClick={handleClick}>Click me</button>
      <p>Clicked {count} times</p>
      <button onClick={handletotal}>Click me</button>
      <p>total {total} times</p>
    </div>
  )
}

export default App
