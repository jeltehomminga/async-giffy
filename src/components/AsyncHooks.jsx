import React, { useState, useEffect } from 'react';
const axios = require('axios');

const AsyncHooks = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const fetchData = query => {
    return axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_APIKEY}&q=${query}&limit=25&offset=0&rating=G&lang=en`
      )
      .then(({ data }) => data.data.map(item => item.images.preview.mp4))
      .catch(err => console.warn(err));
  };

  useEffect(() => {
    query &&
      fetchData(query)
        .then(output => setResults(output))
        .catch(err => console.log(err));
  }, [query]);

  return (
    <div>
      <h1>Async React hooks</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}>
        <input
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          placeholder="Search for Gif's 👾"
        />
        <button type='submit'>Search</button>
      </form>
      {results &&
        results.map(result => {
          return (
            <div className='preview-container' key={result}>
              <video autoPlay loop src={result}></video>
            </div>
          );
        })}
    </div>
  );
};

export default AsyncHooks;
