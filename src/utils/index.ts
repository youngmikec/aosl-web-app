import { User } from "../common";

export const getItem = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
   
export const setItem = (key: string, value: any) => {
    const data: string = JSON.stringify(value);
    localStorage.setItem(key, data);
}

export const getFullName = (user: User | undefined ): string => {
    return user ? `${user?.firstName} ${user?.lastName}` : '' ;
}

export const sortArray = (unsortedArray: any[], field: string): Array<any> => {
    const items = [...unsortedArray];
    let sortedArray: Array<any> = [];
    if(field === 'createdAt'){
        sortedArray = items.sort((a, b) => {
            const d1: any = new Date(a[field]);
            const d2: any = new Date(b[field]);
            return d1 - d2;
        });   
    }else {
        sortedArray = items.sort((a, b) => {
            return a[field] < b[field] ? -1 : 1;
        });
    }
    return sortedArray;
}

export const formatCurrency = (amount: number | undefined, currency: string | undefined, locale: string = 'en-US'): string => {
    if(amount && currency){
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
          }).format(amount);
    }else {
        // return new Intl.NumberFormat(locale, {
        //     style: 'currency',
        //     currency: currency,
        //   }).format(0);
        return '0'
    }
};