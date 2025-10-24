import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(transactions: Transaction[], criteria: any): Transaction[] {
    return transactions.filter(tx => {
      const typeMatch = criteria.type ? tx.type === criteria.type : true;
      const categoryMatch = criteria.category ? tx.category === criteria.category : true;
      const dateMatch = criteria.date ? tx.date === criteria.date : true;
      return typeMatch && categoryMatch && dateMatch;
    });
  }
} 
