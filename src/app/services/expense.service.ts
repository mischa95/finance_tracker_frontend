import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private getUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.getUrl}/expense/all`);
  }
  public getExpenseById(expenseId: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.getUrl}/expense/findexbyid/${expenseId}`);
  }
  public getExpensesByCategory(categoryId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.getUrl}/expense/find/${categoryId}`);
  }
  public addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.getUrl}/expense/add`, expense);
  }
  public updateExpense(categoryId: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.getUrl}/expense/update/${categoryId}`, expense);
  }
  public deleteExpenses(expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.getUrl}/expense/delete/${expenseId}`);
  }
  public sumAllExpenses(): Observable<number> {
    return this.http.get<number>(`${this.getUrl}/expense/sumall`);
  }
  public sumAllByCatgeoryId(categoryId: number): Observable<number> {
    return this.http.get<number>(`${this.getUrl}/expense/sumbycat/${categoryId}`);
  }
}
