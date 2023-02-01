import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {



  constructor(private http: HttpClient) { }

  fetch(): Observable<Position[]> {
    return this.http.get<Position[]>('/api/menu/position')
  }
  fetchByGenus(idGenus: number): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/menu/position/all/${idGenus}`)
  }
  count(idGenus: number): Observable<number> {
    return this.http.get<number>(`/api/menu/positions/${idGenus}`)
  }
  getById(idPosition: number): Observable<Position> {
    return this.http.get<Position>(`/api/menu/position/${idPosition}`)
  }

  update(position: Position): Observable<Boolean> {
    return this.http.patch<Boolean>(`/api/menu/position/${position.idPosition}`, position)
  }

  create(position: Position): Observable<Boolean> {
    return this.http.post<Boolean>(`/api/position/add`, position)
  }

  delete(idPosition: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`/api/position/${idPosition}`)
  }

  sort(params: any = {}): Observable<Position[]> {
    return this.http.get<Position[]>('/api/position/sort', {
      params: new HttpParams({ fromObject: params })
    })

  }

  search(params: any = {}): Observable<Position[]> {
    return this.http.get<Position[]>('/api/position/search', {
      params: new HttpParams({ fromObject: params })
    })

  }

  fetchByType(idType: number): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/genus/all-position/${idType}`)
  }
  fetchByCategory(idCategory: number): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/categories/all-position/${idCategory}`)
  }
}
