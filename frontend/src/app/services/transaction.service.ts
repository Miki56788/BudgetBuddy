import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://127.0.0.1:8000/api/user/transactions/';

  constructor(private http: HttpClient) {}


  deleteTransaction(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/user/transactions/${id}/`);
  }  
  
  getTransactions(page: number = 1) {
    return this.http.get<any>(`http://127.0.0.1:8000/api/user/transactions/?page=${page}`);
  }
    
}
