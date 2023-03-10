import React from "react";

const test = () => {
    const makePayment = () => {
        setLoading(true);
        var config = {
            root: "",
            style: {
                bodyBackgroundColor: "#fafafb",
                bodyColor: "",
                themeBackgroundColor: "#0FB8C9",
                themeColor: "#ffffff",
                headerBackgroundColor: "#284055",
                headerColor: "#ffffff",
                errorColor: "",
                successColor: "",
                card: {
                    padding: "",
                    backgroundColor: "",
                },
            },
            data: {
                orderId: paymentData.order,
                token: paymentData.token,
                tokenType: "TXN_TOKEN",
                amount: paymentData.amount /* update amount */,
            },
            payMode: {
                labels: {},
                filter: {
                    exclude: [],
                },
                order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
            },
            website: "WEBSTAGING",
            flow: "DEFAULT",
            merchant: {
                mid: paymentData.mid,
                redirect: false,
            },
            handler: {
                transactionStatus: function transactionStatus(paymentStatus) {
                    console.log("paymentStatus => ", paymentStatus);
                    setLoading(false);
                },
                notifyMerchant: function notifyMerchant(eventName, data) {
                    console.log("Closed");
                    setLoading(false);
                },
            },
        };

        if (window.Paytm && window.Paytm.CheckoutJS) {
            // initialze configuration using init method
            window.Paytm.CheckoutJS.init(config)
                .then(function onSuccess() {
                    console.log("Before JS Checkout invoke");
                    // after successfully update configuration invoke checkoutjs
                    window.Paytm.CheckoutJS.invoke();
                })
                .catch(function onError(error) {
                    console.log("Error => ", error);
                });
        }
    };
    return <div>test</div>;
};

export default test;
