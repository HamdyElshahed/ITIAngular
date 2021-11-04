import { Injectable } from '@angular/core';
import { PaymentMethod } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class PaymentmethodService {

  constructor() { }
  paymentmethod : PaymentMethod[] =[
    {id: 1 , name :  "Direct Bank Transfare"},
    {id: 1 , name :  "Cheque Payment"},
    {id: 1 , name :  "Paypal"},
    {id: 1 , name :  "Visa"},
    {id: 1 , name :  "Mastercard"},
    {id: 1 , name :  "On Dilivery"}
  ]


  getAllCategory() :PaymentMethod[]  {
    return [...this.paymentmethod]
  }

  getCategotyById(id: number) :PaymentMethod | undefined {
    return this.paymentmethod.find((pm)=> pm.id === id);
  }
}
