import { Pipe, PipeTransform } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';

@Pipe({
    name: 'calculatePrice',
    pure: true
  })

  export class CalculatePricePipe implements PipeTransform {

    constructor(private api: ApiService){}

    transform(value: object, args?: any): any {
      return this.calculatePrice(value);
    }

    calculatePrice(item: object): Object{
      console.log('calculate price pipe')
      // this function will recieve an instance of an item with 
      // options and modifiers and will apply them to get a final price
      // not including tax?
      let priceModifiers = [];
      let total = 0;

      for(let property in item){
        console.log('property in the fork', property, item[property], item)

        switch(property){
          case 'modifiers':
          case 'options':
            item[property].map((c)=>{
              console.log('big', c, c.name);
              priceModifiers.push({db : property.slice(0, -1), name: c})
            });
          break;
          case 'taxes':
            item[property].map((c)=>{
              console.log('small', c, c.name)
              priceModifiers.push({db:property.slice(0, -2), name: c})
            });
          break;
        }
      }
      console.log('priceModifiers', priceModifiers);

      let source = of(priceModifiers);
      
      let observables = source.pipe(
        mergeMap( q =>  forkJoin( ...q.map((c) => this.api.getByName(c.db, c.name) ) ) )
      )
      
      observables.subscribe((value)=>{
        console.log('big loaf of cheese', value)
      });

      return {total:1, subtotal:1, tax:1};
  }


}