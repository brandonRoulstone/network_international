import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

 function App() {
  const [dataInit, setData] = useState('');


  const fetchData = async () => {
    const data  = await axios.post(`http://localhost:7000/api/access-token`)
    setData(data.data.access_token)
    // console.log(data.data.access_token)
  }

  console.log("Token: " + dataInit)

  useEffect(() => {
    // fetchData()
  },[]);

  return (
    <div className="App">
      <header className="App-header">
      <p>{dataInit}</p>
      </header>
    </div>
  );
}

export default App;
