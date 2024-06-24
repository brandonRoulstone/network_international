// import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GetToken = () => {
    const [token, setToken] = useState('');
    const accessToken = async () => {
        const { data } = await axios.post('http://localhost:7000/api/access-token')
        setToken(data.paymentGateway);
    }

    // const successMsg = () => {
    //     toast("copied to clipboard", {
    //         position: "top-center"
    //     })
    // }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // alert("copied to clipboard")
    }

  return (
    <>
      { token.length > 0 ? (
        <div className='token border border-success w-100 text-center fw-bold text-white d-flex flex-col justify-content-center gap-4 py-5'>
            Click here: <a className='text-success' href={token} target='_blank' rel='noreferrer'>Here is your payment gateway link</a>
            <button className='bg-transparent border border-white round' onClick={() => copyToClipboard(token)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="white" className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
            </svg>
            </button>
        </div>
      ) : (
        <div className='btn-container'>
            <button onClick={() => accessToken()} className='btn btn-info'>Get Token</button>
        </div>
      ) }
    </>
  )
}

// GetToken.propTypes = {

// }

export default GetToken;
