import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleOptionsChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const handleSubmit = async () => {
    setError('');
    setResponseData(null);

    try {
      // Validate JSON input
      const parsedData = JSON.parse(jsonInput);
      const { data } = await axios.post('http://127.0.0.1:5000/api/endpoint', parsedData);

      setResponseData(data);
    } catch (err) {
      setError('Invalid JSON input or API error.');
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const { alphabets, numbers, highest_lowercase_alphabet } = responseData;

    const selectedData = {
      Alphabets: alphabets,
      Numbers: numbers,
      'Highest lowercase alphabet': highest_lowercase_alphabet
    };

    return (
      <div>
        {selectedOptions.map(option => (
          <div key={option}>
            <h3>{option}</h3>
            <pre>{JSON.stringify(selectedData[option], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>{'5678'}</h1> {/* Replace with your roll number */}
      <div>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          rows="6"
          cols="50"
          placeholder='Enter JSON here (e.g., {"data": ["A", "C", "z"]})'
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {responseData && (
        <div>
          <select multiple onChange={handleOptionsChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <div>
            {renderResponse()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
