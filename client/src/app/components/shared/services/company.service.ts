import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Company[]> {
    return this.http.get<Company[]>(`/api/companies/all-companies`)
  }
  fetchByName(name: string): Observable<Company> {
    return this.http.get<Company>(`/api/companies/company/${name}`)
  }
  fetchById(idCompany: number): Observable<Company> {
    return this.http.get<Company>(`/api/companies/all-companies/${idCompany}`)
  }
  update(company: Company): Observable<boolean> {
    return this.http.patch<boolean>(`/api/companies/all-companies/${company.idCompany}`, company)
  }
  delete(idCompany: number): Observable<boolean> {
    return this.http.delete<boolean>(`/api/companies/all-companies/${idCompany}`)
  }
}
