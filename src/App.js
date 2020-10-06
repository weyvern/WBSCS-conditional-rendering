// Bring in React core, and useState and useEffect hooks
import React, { useState, useEffect } from 'react';

// App component starts
const App = () => {
  // State for loading component
  const [loading, setLoading] = useState(true);
  // State for data from API
  const [data, setData] = useState();
  // State for toggling selected articles
  const [selectedArticle, setSelectedArticle] = useState(null);
  // Stores an article object into selectedArticle
  const handleSelected = el => {
    setSelectedArticle(el);
  };
  // Resets selectedArticle
  const handleDeselect = () => {
    setSelectedArticle(null);
  };

  // Runs when the component loads, gets data from JSONplaceholder API and sets loading to false
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);

  // If selectedArticle is defined, it will return the selected article, else, the list of articles
  return selectedArticle ? (
    <div>
      <h1>{selectedArticle.title}</h1>
      {/*On click, reset selectedArticle*/}
      <button onClick={() => handleDeselect()}>x</button>
      <p>{selectedArticle.body}</p>
    </div>
  ) : (
    <div>
      {/*If loading is true, it will return the loading component, else, the list of articles*/}
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.map(el => (
          <li key={el.id}>
            {el.title}
            {/*On click, store article in state*/}
            <button onClick={() => handleSelected(el)}>+</button>
          </li>
        ))
      )}
    </div>
  );
};

export default App;
