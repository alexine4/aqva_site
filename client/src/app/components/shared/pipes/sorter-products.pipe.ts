import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../interfaces';

@Pipe({
  name: 'sorterProducts'
})
export class SorterProductsPipe implements PipeTransform {

  transform(products: Position[], sort: string): Position[] {


    if (sort === 'A-Z') {
      return products.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
    }
    else if (sort === 'Z-A') {

      return products.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      }).reverse()
    }
    else return products
  }

}
