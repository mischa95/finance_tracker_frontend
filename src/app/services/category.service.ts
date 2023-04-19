import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private getUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.getUrl}/category/all`);
  }
  public getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.getUrl}/category/find/${categoryId}`);
  }
  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.getUrl}/category/add`, category);
  }
  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.getUrl}/category/update`, category);
  }
  public deleteCategories(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.getUrl}/category/delete/${categoryId}`);
  }
}
