import React from 'react'
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Alert, Button } from "react-bootstrap";
export default function PaypalSdk({ theEnrollmentData, itsCourse }) {
    const paypalRef = useRef()
    const [thisCountryWorks,setThisCountryWorks]=useState(false)
    useEffect(() => {
        try {
            window.paypal.Buttons({
                // Set up the transaction
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: theEnrollmentData.money
                            }
                        }]
                    });
                },
                // Finalize the transaction
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (orderData) {
                        // Successful capture! For demo purposes:
                        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                        var transaction = orderData.purchase_units[0].payments.captures[0];
                        alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

                        // Replace the above to show a success message within this page, e.g.
                        // const element = document.getElementById('paypal-button-container');
                        // element.innerHTML = '';
                        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                        // Or go to another URL:  actions.redirect('thank_you.html');
                    });
                }


            }).render(paypalRef.current);
            setThisCountryWorks(true)
        } catch (error) {
            setThisCountryWorks(false)
        }

    }, [])
    return (
        <div>
            <div ref={paypalRef}>
                {thisCountryWorks ? (<div></div>):(<Alert variant="danger" >This Payment Not In This Country</Alert>)}
                
            </div>
        </div>
    )
}
