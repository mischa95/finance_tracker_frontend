import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  public getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`/categories`);
  }
  public getCategoryById(categoryId: number): Observable<CategoryDTO> {
    return this.http.get<CategoryDTO>(`/categories/${categoryId}`);
  }
  public addCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(`/categories/`, category);
  }
  public updateCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(`/categories/`, category);
  }
  public deleteCategories(categoryId: number): Observable<void> {
    return this.http.delete<void>(`/categories/${categoryId}`);
  }
}
