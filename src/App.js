// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

 function App() {
  const [dataInit, setData] = useState('');
  const [ action, setAction ] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [value, setValue] = useState(0);

  const fetchData = async () => {
    const data  = await axios.post(`http://localhost:7000/api/access-token`)
    setData(data.data.access_token)
    console.log(data.data.access_token)
  }
  // const outlet = 'ae2059b8-8054-44e3-9a6a-0f5356c9f408';
  const postData = async () => {
    const { data } = await axios.post(`http://localhost:7000/api/access-token`, action, currencyCode, value, {
      headers: {
        Authorization: `Bearer ${dataInit}`,
        'Content-Type': 'application/vnd.ni-payment.v2+json',
        Accept: 'application/vnd.ni-payment.v2+json'
      }
    })
    console.log(data.access_token)
  }

  // console.log("Token: " + dataInit)

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{dataInit}</p>

        {/* <form> */}
          <label htmlFor='action'>Action : </label>
          <input type='text' name='action' value={action} onChange={(e) => setAction(e.target.value)}/>
          <label htmlFor='action'>currencyCode : </label>
          <input type='text' name='currencyCode' value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)}/>
          <label htmlFor='action'>value : </label>
          <input type='number' name='value' value={value} onChange={(e) => setValue(e.target.value)}/>
          {/* <input type='submit'/> */}
          <button onClick={() => postData()}>Submit</button>
        {/* </form> */}
      </header>
    </div>
  );
}

export default App;
