import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, property: string, reverse: boolean): Array<any> {

    if (!array || array.length === 0) {
      return array;
    }

    if (array[0].hasOwnProperty(property)) {
      array.sort((a: any, b: any) => {
        let aProperty = a[property];
        let bProperty = b[property];
        // to make strings of different case comparable
        if (typeof a[property] === 'string' || a[property] instanceof String) {
          aProperty = a[property].toLowerCase();
          bProperty = b[property].toLowerCase();
        }
        if (aProperty > bProperty) {
          return -1;
        } else if (aProperty < bProperty) {
          return 1;
        } else {
          return 0;
        }
      });
      return reverse ? array.reverse() : array;
    } else {
      return [];
    }
  }
}
