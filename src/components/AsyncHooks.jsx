import React, { useState, useEffect } from 'react';
const apiKey = 'Zm6sHZW096tLwxcHRQEtNZUvpyuakNA1';

const AsyncHooks = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const fetchData = async query => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25&offset=0&rating=G&lang=en`
      );
      const json = await response.json();
      return json.data.map(item => item.images.preview.mp4);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    query && fetchData(query).then(setResults);
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
