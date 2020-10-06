import React, { useState, useEffect } from 'react';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleSelected = el => {
    setSelectedArticle(el);
  };

  const handleDeselect = () => {
    setSelectedArticle(null);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);

  return selectedArticle ? (
    <div>
      <h1>{selectedArticle.title}</h1>
      <button onClick={() => handleDeselect()}>x</button>
      <p>{selectedArticle.body}</p>
    </div>
  ) : (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.map(el => (
          <li key={el.id}>
            {el.title}
            <button onClick={() => handleSelected(el)}>+</button>
          </li>
        ))
      )}
    </div>
  );
};

export default App;
