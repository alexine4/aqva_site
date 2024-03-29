import { Injectable } from "@angular/core";
import { User } from "../interfaces";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable({ providedIn: 'root' })
export class AuthService {


  private token = ''
  constructor(private http: HttpClient) {

  }

  // login 
  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  // login 
  checkPassword(user: User): Observable<Boolean> {
    return this.http.post<Boolean>('/api/auth/check-password', user)
  }

  setToken(token: string) {
    this.token = token
  }
  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logOut() {
    this.setToken('')
    localStorage.clear()
  }
  // registration
  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

}