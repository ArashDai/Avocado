import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
  })   

export class PriceFormatterService {

    constructor(){}

    formatPriceToCents(price: number){
        //formats a price into cents
        let priceStr = price.toString();
        let decimalIndex = priceStr.indexOf('.');
    
        if(!price || price === 0){
            return price;
    
        } else if( decimalIndex === -1 || decimalIndex === priceStr.length-2 ){
            return price * 100;
    
        } else {
            return Number(priceStr.replace('.',''));
        }   
    }
    
    formatPriceToBills(price: number){
        //formats price into bills
        if(!price || price === 0){
            return price;
        } else {
            return (price/100).toFixed(2);
        }
    }
    
}