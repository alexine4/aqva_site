import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genus } from '../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class GenusService {


  constructor(private http: HttpClient) { }

  fetch(): Observable<Genus[]> {
    return this.http.get<Genus[]>('/api/menu/genus')
  }
  fetchByType(idType: number): Observable<Genus[]> {
    return this.http.get<Genus[]>(`/api/menu/genus/all/${idType}`)
  }

  count(idType: number): Observable<number> {
    return this.http.get<number>(`/api/menu/genu/${idType}`)
  }
  create(genus: Genus): Observable<Boolean> {
    return this.http.post<Boolean>('/api/genus/add', genus)
  }
  update(genus: Genus): Observable<Boolean> {
    return this.http.patch<Boolean>(`/api/menu/genus/${genus.idGenus}`, genus)
  }
  delete(idGenus: Number): Observable<Boolean> {
    return this.http.delete<Boolean>(`/api/menu/genus/${idGenus}`)
  }
}


