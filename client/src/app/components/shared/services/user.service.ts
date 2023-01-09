import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserInfo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  fetchUser(): Observable<User> {
    return this.http.get<User>(`/api/user/`)
  }

  fetchUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`/api/user/user-info`)
  }

  updateUser(user: User): Observable<Boolean> {
    return this.http.patch<Boolean>(`/api/user/`, user)
  }
  updateUserPassword(user: User): Observable<Boolean> {
    return this.http.patch<Boolean>(`/api/user/change-password`, user)
  }

  updateUserInfo(userInfo: UserInfo): Observable<Boolean> {
    return this.http.patch<Boolean>(`/api/user/user-info`, userInfo)
  }
  uploadImage(username: string, image: File): Observable<UserInfo> {
    const imageSRC = new FormData()

    if (image) {
      imageSRC.append('image', image, username)
    }
    return this.http.patch<UserInfo>(`/api/user/user-info/upload-image`, imageSRC)
  }



}
