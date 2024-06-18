import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

 function App() {
  const [dataInit, setData] = useState([]);
  const reference ='3d12d446-33a2-4c0f-adec-c0d4fcf7e0a3';
  const apiKey = `ZGJhZTNkOTEtODg0Ni00MGJlLWI2MzAtOTE5YTRhZjZlNDFjOmE4NzJkMDFiLThhZTUtNGFkMC1iOGJkLTk4NjdlNzIyNTViMw==${reference}`;

  const options = {
    method: 'POST',
    url: 'https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token',
    headers: {
      // accept: 'application/vnd.ni-identity.v1+json',
      'Content-type': 'application/vnd.ni-identity.v1+json',
      'Authorization': `Basic ${apiKey}`
    }
  };

  const fetchData = async () => {
    let data = await axios.request(options).then(function (response) {
      console.log("here " + response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
    setData(data);
  }

  console.log("this data: " + dataInit);

  useEffect(() => {
    fetchData()
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
