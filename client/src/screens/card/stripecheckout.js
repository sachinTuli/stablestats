import Stripecheckout from 'react-stripe-checkout';
import React,{useState} from 'react';
// import console from 'console';

function Checkout(){

const [product] = useState({
    name:"Product1",
    price:10,
    productBy:"Me"
});

const makePayment = token=>{
    const body = {
        token,
        product
    }
    const headers = {
        "Content-Type" : "application/json"
    }

    return fetch('http://localhost:3001/payment/pay',{
        method : 'POST',
        headers,
        body : JSON.stringify(body)
    }).then(response=>{
        console.log("Response ",response)
    })
    .catch(err=>{
        console.log(err);
    })
}

    return(
    <Stripecheckout stripeKey="pk_test_w6UKhfU0nOAzPlLcX6hTSkNi00OsiVI8xz" token={makePayment} name="Buy Product"></Stripecheckout>
          )}
          export default Checkout