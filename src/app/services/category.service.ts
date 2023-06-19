import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`/category/all`);
  }
  public getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`/category/find/${categoryId}`);
  }
  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`/category/add`, category);
  }
  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`/category/update`, category);
  }
  public deleteCategories(categoryId: number): Observable<void> {
    return this.http.delete<void>(`/category/delete/${categoryId}`);
  }
}
