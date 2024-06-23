// REMINDER THAT THE SESSION ID GETS SENT FROM THE FRONT-END TO THE BACKEND TO CATCH THE REQUEST
import { useEffect, useRef } from "react";
import axios from "axios";
const PaymentsPage = () => {
  const checkoutButtonRef = useRef(null);
  const mountId = 'mount-id';
  let sessionId = '';

  useEffect(() => {
    window.NI.mountCardInput(mountId, {
      style: {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      },
      hostedSessionApiKey: 'NzVkYWE0N2QtYTJhNS00NGYyLWI0YWQtMjRiY2NjMTFlYTIzOjVhMThiZTQyLWQzYTQtNDI0MC05OWU1LTMwZDBkMGI0ODU1NA==', // Replace with your hosted session API key
      language: 'en',
      outletRef: '0b64b105-6d7b-48e5-8d62-55cc977e756d', // Replace with your outlet reference UUID
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

    checkoutButtonRef.current.addEventListener('click', async () => {
      try {
        const response = await window.NI.generateSessionId();
        sessionId = response.session_id;
        console.log('Session ID generated:', sessionId);

        // Send sessionId to your backend to complete the payment
        const paymentResponse = await axios.post(' http://localhost:7000/api/hosted-sessions/payment', {
          sessionId,
          order: {
            action: 'SALE',
            amount: { currencyCode: 'AED', value: 100 } // Replace with actual order details
          },
          outletRef: '0b64b105-6d7b-48e5-8d62-55cc977e756d' // Replace with your outlet reference UUID
        }
      );

        const { status, error } = await window.NI.handlePaymentResponse(paymentResponse.data);

        if (status === window.NI.paymentStates.AUTHORISED || status === window.NI.paymentStates.CAPTURED) {
          alert('Payment successful');
        } else if (status === window.NI.paymentStates.FAILED || status === window.NI.paymentStates.THREE_DS_FAILURE) {
          alert('Payment failed');
        } else {
          alert('Payment status unknown');
        }
      } catch (err) {
        console.error('Error during payment process', err);
        alert('Payment process encountered an error');
      }
    });

  }, []);

  return (
    <div>
      <div id={mountId}></div>
      <button ref={checkoutButtonRef} className="checkoutButton">Check out</button>
    </div>
  );
}

export default PaymentsPage
