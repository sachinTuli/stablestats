import { PLANTYPE } from './../constants/PlanType';
import { HTTP_STATUS } from './../constants/ErrorStatus';
import express from 'express';
import HttpException from '../exceptions/HttpException';
import { User } from '../interface/user.interface';
import UserService from './UserService';
import { ERROR_MESSAGE } from '../constants/ErrorMessage';
import PaymentModel from '../models/payment';
import { PAYMENT_STATUS } from '../constants/Payment';
import CryptoService from '../utils/crypto';
const stripe = require("stripe")('sk_test_iAMtyoKyEuPJeePz8KhVcTO100AvnSjX72');

class PaymentService {

  /**
   * 
   * @param req 
   * @returns 
   */
  public async newCustomer(req: express.Request): Promise<any> {
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
    return {
      customerId: customer.id,
      customerEmail: customer.email,
    }
  }

  /**
   * 
   * @param req 
   * @returns 
   */
  public async addNewCard(req: express.Request): Promise<any> {
    console.log('card add.. ', req.body);
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
      throw new HttpException(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGE.INCORRECT_CARD_DETAILS);
    }
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

    return { card: card.id }

  }

  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  public async payment1(req: express.Request, res: express.Response): Promise<any> {
    console.log('customer payment .. ', req.body);
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

  /**
   * 
   * @param req 
   * @returns 
   */
  public async payment(req: express.Request): Promise<User> {
    console.log('customer payment .. ', req.body);
    const { packages, token } = req.body; // change product -> package
    if (packages.planType == PLANTYPE.FREE || packages.planType == PLANTYPE.PRO) {
      const user: User = await UserService.setPackage(req);
      return user;
    }
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    //.then((customer: { id: any; }) => {
    console.log("customer after verified... ", customer);
    const stripePaymentData = await stripe.charges.create({
      amount: packages.amount * 100, // change price -> amount
      currency: 'inr',
      customer: customer.id
    })
    const user: User = await UserService.setPackage(req);
    const payment = new PaymentModel({
      name: user.name,
      email: user.email,
      amount: packages.amount,
      planType: user.planType,
      status: PAYMENT_STATUS.SUCCESS,
      stripeData: CryptoService.encrypt(stripePaymentData)
    })
    await payment.save();
    return user;
    //.then(async res => {
    //   console.log("result ...", res);
    //   const user: User = await UserService.setPackage(req);
    //   return user;
    // });
    // });
  }
}

export default new PaymentService();

