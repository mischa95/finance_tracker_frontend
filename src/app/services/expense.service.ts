import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  public getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`/expense/all`);
  }
  public getExpenseById(expenseId: number): Observable<Expense> {
    return this.http.get<Expense>(`/expense/findexbyid/${expenseId}`);
  }
  public getExpensesByCategory(categoryId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`/expense/find/${categoryId}`);
  }
  public addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`/expense/add`, expense);
  }
  public updateExpense(categoryId: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`/expense/update/${categoryId}`, expense);
  }
  public deleteExpenses(expenseId: number): Observable<void> {
    return this.http.delete<void>(`/expense/delete/${expenseId}`);
  }
  public sumAllExpenses(): Observable<number> {
    return this.http.get<number>(`/expense/sumall`);
  }
  public sumAllByCatgeoryId(categoryId: number): Observable<number> {
    return this.http.get<number>(`/expense/sumbycat/${categoryId}`);
  }
}
