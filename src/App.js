import React, { useState } from 'react';
import './App.css';

function PhoneticValueRetriever() {
  const [word, setWord] = useState('');
  const [phoneticValue, setPhoneticValue] = useState('');

  function handleInputChange(event) {
    setWord(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('🚀 ~ file: App.js:18 ~ .then ~ data:', data);
        const phoneticValue = data[0].phonetics[1].text;
        setPhoneticValue(phoneticValue);
      })
      .catch((error) => {
        console.error(`Error fetching phonetic value for "${word}":`, error);
      });
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter a word:
          <input type="text" value={word} onChange={handleInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      {phoneticValue && <p>Phonetic value: {phoneticValue}</p>}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PhoneticValueRetriever />
      </header>
    </div>
  );
}

export default App;
