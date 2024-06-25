import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentsPage = () => {
  const mountId = 'mount-point';
  let sessionId = '';

  // Function to mount card input
  const mountCardInput = () => {
    window.NI.mountCardInput(mountId, {
      style: {
        main: {
          backgroundColor: "lightblue",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          height: "25rem"
        },
        base: {
          color: "#333",
          fontFamily: "Arial, sans-serif",
          fontSize: "16px"
        },
        input: {
          color: "#000080", // navy blue text
          borderColor: "#1e90ff", // dodger blue border
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "#fff" // white background for input fields
        },
        invalid: {
          borderColor: "#ff4500" // orange red border for invalid input
        }
      },
      apiKey: 'NzVkYWE0N2QtYTJhNS00NGYyLWI0YWQtMjRiY2NjMTFlYTIzOjVhMThiZTQyLWQzYTQtNDI0MC05OWU1LTMwZDBkMGI0ODU1NA==',
      language: 'en',
      outletRef: '0b64b105-6d7b-48e5-8d62-55cc977e756d',
      onSuccess: () => {
        console.log('SDK successfully authenticated');
      },
      onFail: (error) => {
        console.error('SDK authentication failed', error);
      },
      onChangeValidStatus: ({ isCVVValid, isExpiryValid, isNameValid, isPanValid }) => {
        console.log('Field validity:', { isCVVValid, isExpiryValid, isNameValid, isPanValid });
      }
    });
  };

  // Function to handle checkout button click
  const handleCheckoutButtonClick = async () => {
    try {
      const response = await window.NI.generateSessionId();
      sessionId = response.session_id;
      const outletRef = '0b64b105-6d7b-48e5-8d62-55cc977e756d';
      console.log('Session ID generated:', sessionId);
      console.log("click")

      const paymentResponse = await axios.post('http://localhost:7000/api/hosted-sessions/payment', 
        {
          sessionId,
          order: {
            action: 'SALE',
            amount: { currencyCode: 'AED', value: 100 }
          },
          outletRef 
        }
      );

      const { status } = await window.NI.handlePaymentResponse(paymentResponse.data, 
        {
          mountId: '3ds_iframe',
          style: { width: 500, height: 500 }
        }
      );

      if (status === window.NI.paymentStates.AUTHORISED || status === window.NI.paymentStates.CAPTURED) {
        toast.success('Payment successful');
      } else if (status === window.NI.paymentStates.FAILED || status === window.NI.paymentStates.THREE_DS_FAILURE) {
        toast.warning('Payment failed');
      } else {
        toast.warning('Payment status unknown');
      }
    } catch (error) {
      console.error('Error during payment process', error);
    }
  };

  useEffect(() => {
    mountCardInput();
  }, []);
  
  return (
    <div className="container">
      <div id={mountId} style={{ height: '26rem', width: '100%', marginTop: '1.5rem' }}></div>
      <button onClick={() => handleCheckoutButtonClick()} className="checkoutButton btn btn-lg">Check out</button>
    </div>
  );
};

export default PaymentsPage;
