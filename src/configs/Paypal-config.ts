import { INVOICE_CURRENCY } from "../common";

export interface IPaypalConfig {
  "client-id": string | any;
  "clientId": string | any;
  "currency": INVOICE_CURRENCY;
  "intent": string;
}

export const PayPal_CONFIG_OPTIONS: IPaypalConfig = {
  "clientId": "AQX5hpK1_9M090AvryRxZbvJ_EzXu8U3oNSsEB_vEJU6i5QXhRijRgSMj5oFLEPcLO81iX9fNKh16JL1",
  "client-id": "AQX5hpK1_9M090AvryRxZbvJ_EzXu8U3oNSsEB_vEJU6i5QXhRijRgSMj5oFLEPcLO81iX9fNKh16JL1",
  "currency": INVOICE_CURRENCY.GBP,
  "intent": "capture",
}