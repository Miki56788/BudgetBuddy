import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, AddTransactionComponent, FormsModule, FilterPipe]
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];
  showModal: boolean = false;
  chart: any = null;

  constructor(
    private transactionService: TransactionService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        if (isPlatformBrowser(this.platformId)) {
          this.renderChart();
        }
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      }
    });
  }

  renderChart(): void {
    const canvas = document.getElementById('spendChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const amounts = this.transactions.map(tx => +tx.amount);
    const labels = this.transactions.map(tx => tx.category);

    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Expenses',
          data: amounts,
          backgroundColor: [
            '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
            '#4bc0c0', '#9966ff', '#ff9f40'
          ]
        }]
      },
      options: {
        responsive: false,
        cutout: '50%'
      }
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  onTransactionAdded(): void {
    this.toggleModal();
    this.fetchTransactions();
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  deleteTransaction(id: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => this.fetchTransactions(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }  

  filterType: string = '';
  filterCategory: string = '';
  filterDate: string = '';

}
