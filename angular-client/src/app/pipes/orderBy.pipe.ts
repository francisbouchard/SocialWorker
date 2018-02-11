import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, property: string, reverse: boolean): Array<any> {

    if (!array || array.length === 0) {
      return array;
    }

    if (array[0].hasOwnProperty(property)) {
      array.sort((a: any, b: any) => {
        if (a[property] > b[property]) {
          return -1;
        } else if (a[property] < b[property]) {
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
