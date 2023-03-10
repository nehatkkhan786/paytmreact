import React from "react";
import axios from 'axios'

const App = () => {

  const handleSubmit = async ()=>{
    const response = await axios.post('http://127.0.0.1:8000/initiatepayment/', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // console.log(response.request.status)
    if(response.request.status === 200){
        displayPaytm(response.data.orderId, response.data.amount, response.data.token)
    } else {
      console.log('something went wrong')
    }
  }

  // function to Load and inject script to dom 
      const loadScript = (url) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = url;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
  // function to Load and inject script to dom 

  // Display Paytm Pop Function
  const displayPaytm = async (orderID, totalAmount, txntoken) => {
    const response = await loadScript(
      `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/DIY12386817555501617.js`
    );

    if (!response) {
      toast.error("Something Went Wrong....");
      return;
    }
    var config = {
      root: "",
      "style": {
        "bodyColor": "",
        "themeBackgroundColor": "",
        "themeColor": "",
        "headerBackgroundColor": "",
        "headerColor": "",
        "errorColor": "",
        "successColor": ""
    },



      flow: "DEFAULT",
      data: {
        orderId: orderID,
        token: txntoken,
        tokenType: "TXN_TOKEN",
        amount: totalAmount,
      },

      handler: {
        transactionStatus:function transactionStatus(paymentStatus){
          console.log("paymentStatus => ",paymentStatus);
        },
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
        // initialze configuration using init method
        window.Paytm.CheckoutJS.init(config)
          .then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
          })
          .catch(function onError(error) {
            console.log("error => ", error);
          });
      });
    }
  };

   // End Display Paytm Pop Function

  return (
    <div>
      <button onClick={handleSubmit}>PAY NOW WITH PAYMENT</button>
    </div>
  );
};

export default App;
