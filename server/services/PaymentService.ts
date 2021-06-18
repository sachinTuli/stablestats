import express from 'express';

const stripe = require("stripe")('sk_test_iAMtyoKyEuPJeePz8KhVcTO100AvnSjX72');

class PaymentService {

    public async newCustomer(req:express.Request,res:express.Response) : Promise<any> {
        console.log('customer added .. ',req.body);
        try {
            const customer = await stripe.customers.create(
              {
                email: req.body.email,
              }
            );
            return res.status(200).send({
              //   customerDetails: customer,
              customerId: customer.id,
              customerEmail: customer.email,
            });
          } catch (error) {
            return res.status(400).send({ Error: error.raw.message });
          }
    }

    public async addNewCard(req:express.Request,res:express.Response) : Promise<any> {
        console.log('card add.. ',req.body);
        const {
            cardNumber,
            cardExpMonth,
            cardExpYear,
            cardCVC,
            cardName,
            country,
            postal_code,
            customerId
          } = req.body;

          if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
            return res.status(400).send({
              Error: "Please Provide All Necessary Details to save the card",
            });
          }

          try {
            const cardToken = await stripe.tokens.create({
              card: {
                name: cardName,
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCVC,
                address_country: country,
                address_zip: postal_code,
              },
              // customer: customer.stripe_id,
              // stripe_account: StripeAccountId,
            });
        
            const card = await stripe.customers.createSource(customerId, {
              source: `${cardToken.id}`,
            });
        
            return res.status(200).send({
              card: card.id,
            });
          } catch (error) {
            return res.status(400).send({
              Error: error.raw.message,
            });
          }
    }

    public async payment(req:express.Request,res:express.Response) : Promise<any> {
        console.log('customer payment .. ',req.body);
        const {
            cardNumber,
            cardExpMonth,
            cardExpYear,
            cardCVC,
            country,
            postalCode,
            amount,
            email
          } = req.body;
      
          if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
            return res.status(400).send({
              Error: "Necessary Card Details are required for One Time Payment",
            });
          }
          try {
            const cardToken = await stripe.tokens.create({
              card: {
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCVC,
                address_state: country,
                address_zip: postalCode,
              },
            });
      
            const charge = await stripe.charges.create({
              amount: amount,
              currency: "usd",
              source: cardToken.id,
              receipt_email: email,
              description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
            });
      
            if (charge.status === "succeeded") {
              return res.status(200).send({ Success: charge });
            } else {
              return res
                .status(400)
                .send({ Error: "Please try again later for One Time Payment" });
            }
          } catch (error) {
            return res.status(400).send({
              Error: error.raw.message,
            });
          }
    }

    public payment1(req:express.Request,res:express.Response){
      console.log('customer payment .. ',req.body);
      const {product,token} = req.body;
      const customer =  stripe.customers.create({
         email : token.email,
         source:token.id
      }).then((customer: { id: any; })=>{
        console.log("customer after verified... ",customer);
        stripe.charges.create({
          amount:product.price*100,
          currency : 'inr',
          customer:customer.id
      });
    });
  }
}



export default new PaymentService();
