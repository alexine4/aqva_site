import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Type[]> {
    return this.http.get<Type[]>('/api/menu/types')
  }
  fetchByCategory(idCategory: number): Observable<Type[]> {
    return this.http.get<Type[]>(`/api/menu/types/all/${idCategory}`)
  }
  count(idCategory: number): Observable<number> {
    return this.http.get<number>(`/api/menu/type/${idCategory}`)
  }
  create(type: Type): Observable<Boolean> {
    return this.http.post<Boolean>('/api/menu/types/add', type)
  }
  update(type: Type): Observable<Boolean> {
    return this.http.patch<Boolean>(`/api/menu/types/${type.idType}`, type)
  }
  delete(idType: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(`/api/menu/types/${idType}`)
  }
}
