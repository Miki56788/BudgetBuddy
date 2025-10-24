import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  amount: number = 0;
  category: string = '';
  description: string = '';
  date: string = new Date().toISOString().slice(0, 10); 
  type: string = 'expense'; 
  apiUrl: string = 'http://127.0.0.1:8000/api/user/transactions/';

  constructor(private http: HttpClient) {}

  addTransaction() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Not authenticated!');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const transactionData = {
      amount: this.amount,
      category: this.category,
      description: this.description,
      date: this.date,
      type: this.type
    };

    this.http.post(this.apiUrl, transactionData, { headers }).subscribe({
      next: () => {
        alert('Transaction added successfully!');
        this.amount = 0;
        this.category = '';
        this.description = '';
        this.date = new Date().toISOString().slice(0, 10);
        this.type = 'expense';
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Failed to add transaction.');
      }
    });
  }
}
