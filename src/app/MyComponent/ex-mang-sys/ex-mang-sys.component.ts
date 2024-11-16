
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ex-mang-sys',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './ex-mang-sys.component.html',
  styleUrl: './ex-mang-sys.component.css'
})
export class ExMangSysComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  
  OnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Now safe to use localStorage
      const value = localStorage.getItem('someKey');
      console.log(value);
    } else {
      console.log('This is not a browser environment.');
    }
  }

  expenses: any[] = []; // Array to hold all expenses
  total: number = 0; // Total amount (Income - Expenses)
  filteredExpenses: any[] = []; // Array to hold filtered expenses based on selected month
  selectedMonth: string = ''; // Variable to hold selected month

  expense = {
    name: '',
    amount: 0,
    type: '',
    date: '',
    confirmed: false,
  };

  ngOnInit() {
    // Load expenses from localStorage when the component initializes
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      this.expenses = JSON.parse(savedExpenses);
      this.filteredExpenses = this.expenses; // Initially, show all expenses
      this.calculateTotal(); // Recalculate the total
    }
  }

  addExpense() {
    if (this.expense.name && this.expense.amount && this.expense.type && this.expense.date) {
      this.expenses.push({ ...this.expense });
      this.updateTotal(this.expense.amount, this.expense.type);
      this.sortExpenses(); // Sort the expenses
      this.saveToLocalStorage(); // Save the updated list to localStorage
      this.filterExpenses(); // Apply the current month filter after adding the expense
      this.clearForm();
    }
  }

  updateTotal(amount: number, type: string) {
    if (type === 'Income') {
      this.total += amount;
    } else if (type === 'Expense') {
      this.total -= amount;
    }
  }

  calculateTotal() {
    // Recalculate the total from the saved expenses
    this.total = this.filteredExpenses.reduce((acc, exp) => {
      return exp.type === 'Income' ? acc + exp.amount : acc - exp.amount;
    }, 0);
  }

  sortExpenses() {
    this.expenses.sort((a, b) => {
      if (a.type === b.type) {
        return 0; // Maintain order if same type
      }
      return a.type === 'Income' ? -1 : 1; // Place income above expenses
    });
  }

  clearForm() {
    this.expense = {
      name: '',
      amount: 0,
      type: '',
      date: '',
      confirmed: false,
    };
  }

  deleteExpense(index: number) {
    const exp = this.filteredExpenses[index];
    if (exp.type === 'Income') {
      this.total -= exp.amount;
    } else if (exp.type === 'Expense') {
      this.total += exp.amount;
    }
    this.filteredExpenses.splice(index, 1);
    this.saveToLocalStorage(); // Save the updated list to localStorage
  }

  confirmExpense(index: number) {
    this.filteredExpenses[index].confirmed = true;
    this.saveToLocalStorage(); // Save the updated list to localStorage
  }

  saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  // Function to filter expenses based on selected month
  filterExpenses() {
    if (!this.selectedMonth) {
      this.filteredExpenses = this.expenses;
    } else {
      this.filteredExpenses = this.expenses.filter((exp) => {
        const expenseMonth = new Date(exp.date).toLocaleString('default', { month: 'short' });
        return expenseMonth === this.selectedMonth;
      });
    }
    this.calculateTotal(); // Recalculate total after filtering
  }
}