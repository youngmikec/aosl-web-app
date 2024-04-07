import { 
    AirtimeOrder, 
    Order, 
    BuyGiftcardOrder, 
    SellGiftcardOrder, 
    BuyCryptoOrder,
    SellCryptoOrder,
} from "../../common";
import { Application } from "../../common/application";
import { Job } from "../../common/job";

export type ApplicationState = {
    value: Application[];
  };
  export type JobState = {
    value: Job[];
  };

export type AirtimeState = {
    value: AirtimeOrder | null
}

export type BuyGiftcardState = {
    value: BuyGiftcardOrder | null
}

export type SellGiftcardState = {
    value: SellGiftcardOrder | null
}

export type BuyCryptoState = {
    value: BuyCryptoOrder | null
}

export type SellCryptoState = {
    value: SellCryptoOrder | null
}

export type OrdersState = {
    value: Order[]
}