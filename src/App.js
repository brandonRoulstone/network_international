import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import axios from 'axios';
import {useEffect } from 'react';
import LandingPage from './Components/LandingPage';

 function App() {
  // const [dataInit, setData] = useState('');
  // const [ action, setAction ] = useState('');
  // const [currencyCode, setCurrencyCode] = useState('');
  // const [value, setValue] = useState(0);

  // const fetchData = async () => {
  //   const data  = await axios.post(`http://localhost:7000/api/access-token`)
  //   setData(data.data.access_token)
  //   console.log(dataInit);
  // }

  useEffect(() => {

  },[]);

  return (
    <div className="App">
      <ToastContainer />
      <LandingPage />
    </div>
  );
}

export default App;
