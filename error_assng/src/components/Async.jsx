import React, { use, useEffect, useState } from 'react'

const Async = () => {

    const [data,setData]=useState(null);
    const [error,setError]=useState(null);
    const [loading , setLoading]=useState(false);
     const [numUsers, setNumUsers] = useState(1);

    const fetchData=async()=>{
        setLoading(true);
        setError(false);
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            if(!response.ok){
                throw new Error("failed to fetch")
            }
            const result=await response.json();
            setData(result)

        }
        catch(error){
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])



  return (
    <div>
            <h1>Data Fetching with async/await</h1>
            <label htmlFor="numUsers">Select number of users to fetch:</label>
      <select
        id="numUsers"
        value={numUsers}
        onChange={(e) => setNumUsers(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={'ALL'}>All</option>
      </select>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {data && (
        <ul>
          {data.slice(0, numUsers).map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}

      <button onClick={fetchData}>Refresh Data</button>
    </div>
  )
}


export default Async