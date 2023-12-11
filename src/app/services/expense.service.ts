import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseDTO } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  public getExpensesByAccountId(): Observable<ExpenseDTO[]> {
    return this.http.get<ExpenseDTO[]>(`/expenses`);
  }
  public getExpenseById(expenseId: number): Observable<ExpenseDTO> {
    return this.http.get<ExpenseDTO>(`/expenses/${expenseId}`);
  }
  public getExpensesForCurrentUser(): Observable<ExpenseDTO[]> {
    return this.http.get<ExpenseDTO[]>(`/expenses/me`);
  }
  public getExpensesByCategory(categoryId: number): Observable<ExpenseDTO[]> {
    return this.http.get<ExpenseDTO[]>(`/expenses/${categoryId}`);
  }
  public addExpense(expense: ExpenseDTO): Observable<ExpenseDTO> {
    return this.http.post<ExpenseDTO>(`/expenses`, expense);
  }
  public updateExpense(categoryId: number, expense: ExpenseDTO): Observable<ExpenseDTO> {
    return this.http.put<ExpenseDTO>(`/expenses/${categoryId}`, expense);
  }
  public deleteExpenses(expenseId: number): Observable<void> {
    return this.http.delete<void>(`/expenses/${expenseId}`);
  }
  public getCategoryPercentage(categoryId: number): Observable<number>{
    return this.http.get<number>(`/expenses/me/categories/${categoryId}/calculate-percentage`);
  }
  public sumAllExpenses(): Observable<number> {
    return this.http.get<number>(`/expenses/sum`);
  }
  public sumAllByCatgeoryId(categoryId: number): Observable<number> {
    return this.http.get<number>(`/expense/sum/by-category/${categoryId}`);
  }
}
