import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImagePositionService {

  constructor(private http: HttpClient) { }

  create(idPosition: string, image?: File, color?: string): Observable<Image> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }


    fd.append('idPosition', idPosition)
    if (color) {
      fd.append('color', color)
    }



    return this.http.post<Image>('/api/position/image/add', fd)
  }


  getByPosition(idPosition: string): Observable<Image[]> {
    return this.http.get<Image[]>(`/api/position/images/${idPosition}`)
  }

}
