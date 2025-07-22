import React, { useEffect, useState } from 'react';
import '../App';

const Promises = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePromise, setActivePromise] = useState('null');
  const [numUsers, setNumUsers] = useState(1);

  const endpoints = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
  ];

  const fetchData = (type) => {
    setLoading(true);
    setError(null);

    const requests = endpoints.map((url) =>
      fetch(url).then((res) => res.json())
    );

    switch (type) {
      case 'all':
        Promise.all(requests)
          .then((results) => {
            setData(results);
            setLoading(false);
          })
          .catch(() => {
            setError('Error fetching data.');
            setLoading(false);
          });
        break;

      case 'race':
        Promise.race(requests)
          .then((result) => {
            setData([result]);
            setLoading(false);
          })
          .catch(() => {
            setError('Error fetching data.');
            setLoading(false);
          });
        break;

      case 'any':
        Promise.any(requests)
          .then((result) => {
            setData([result]);
            setLoading(false);
          })
          .catch(() => {
            setError('Error fetching data.');
            setLoading(false);
          });
        break;

      case 'settled':
        Promise.allSettled(requests)
          .then((results) => {
            const fulfilledResults = results.filter(
              (result) => result.status === 'fulfilled'
            );
            setData(fulfilledResults.map((res) => res.value));
            setLoading(false);
          })
          .catch(() => {
            setError('Error fetching data.');
            setLoading(false);
          });
        break;

      default:
        setError('Invalid Promise Type');
        setData(null);
        setLoading(false);
        break;
    }
  };

  useEffect(() => {
    fetchData(activePromise);
  }, [activePromise]);

  return (
    <div>
      <nav>
        <ul className="navbar">
          <li>
            <button onClick={() => setActivePromise('all')}>Promise.all</button>
          </li>
          <li>
            <button onClick={() => setActivePromise('race')}>Promise.race</button>
          </li>
          <li>
            <button onClick={() => setActivePromise('any')}>Promise.any</button>
          </li>
          <li>
            <button onClick={() => setActivePromise('settled')}>Promise.allSettled</button>
          </li>
        </ul>
      </nav>

      <h1>Data Fetching with {activePromise.toUpperCase()}</h1>
      <label htmlFor="numUsers">Select number of users to fetch:</label>
      <select
        id="numUsers"
        value={numUsers}
        onChange={(e) => setNumUsers(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={endpoints.length}>All</option>
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

      <button onClick={() => fetchData(activePromise)}>Refresh Data</button>
    </div>
  );
};

export default Promises;