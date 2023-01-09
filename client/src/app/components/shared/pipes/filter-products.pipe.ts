import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../interfaces';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Position[], search: string): Position[] {
    if (search.length === 0) return products
    return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }
}
