import React, { useEffect, useState } from 'react'
import logo from './logo.svg';

const loadRazorPay = (src) => {
    return new Promise(resolve => {
  
  
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
  
    })
  }
const PaymentComp = () => {
    const [paymentObject, setPaymentObject] = useState(null);
    useEffect(()=>{
        try {
            loadRazorPay();
          } catch (error) {
            console.error('Razorpay SDK failed to load', error);
            alert('Razorpay SDK failed to load');
          }
      
          const data=fetch('http://localhost:1337/razorpay',
          {method: 'POST'})
          .then(t=>t.json())
      
          console.log(data);
          const __DEV__ = document.domain === 'localhost'
          const options = {
            "key": __DEV__ ? "rzp_test_nRMxpBADLzd3pQ" : "API_NOT_AVAILABLE", 
            "currency": data.currency,
            "amount": data.amount,
            "order_id": data.id,
            "name": "Daya CS Pvt. Ltd", //your business name
            "description": "Java Bootcamp",
            "image": "https://www.dayacs.com/images/logowhtup.png",
            "handler": function (response) {
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature)
            },
            "prefill": { 
              "name": "Gaurav Kumar", //your customer's name
              "email": "gaurav.kumar@example.com",
              "contact": "9000090000"
            },
            "notes": {
              "address": "Razorpay Corporate Office"
            },
            "theme": {
              "color": "#3399cc"
            }
          };
    
    const newPaymentObject = new window.Razorpay(options);
    setPaymentObject(newPaymentObject);
    return () => {
        if (paymentObject) {
          paymentObject.close();
        }
      };
    }, []);
    const handlePaymentClick = () => {
        if (paymentObject) {
          paymentObject.open();
        }
      };
  return (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={handlePaymentClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy $149
        </a>
      </header>
  )
}

export default PaymentComp;
