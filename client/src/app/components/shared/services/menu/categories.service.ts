import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/menu/categories')
  }

  count(): Observable<number> {
    return this.http.get<number>('/api/menu/category/score')
  }
  create(category: Category): Observable<Boolean> {
    return this.http.post<Boolean>('/api/categories/add', category)
  }
  update(category: Category): Observable<Boolean> {
    return this.http.patch<Boolean>(`/api/categories/${category.idCategories}`, category)
  }
  delete(idCategories: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(`/api/categories/${idCategories}`)
  }



}
