import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserStatus } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegistrService {
  //public user
  constructor(private http: HttpClient) {

  }
  check(user: User): Observable<UserStatus> {
    return this.http.post<UserStatus>('/api/auth/check', user)
  }

}
