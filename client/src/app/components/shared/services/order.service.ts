import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderList } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<OrderList[]> {
    return this.http.get<OrderList[]>(`/api/order/order-list`)
  }
  fetchActual(): Observable<OrderList> {
    return this.http.get<OrderList>(`/api/order/actual-order`)
  }

  fetchAllOrder(idOrder: number): Observable<Order[]> {
    return this.http.get<Order[]>(`/api/order/all-orders/${idOrder}`)
  }

  addToOrder(order: Order): Observable<Boolean> {
    return this.http.post<Boolean>(`/api/order/add-to-order`, order)
  }
  updateOrder(order: Order[]): Observable<boolean> {
    return this.http.patch<boolean>(`/api/order/update-order`, order)
  }
  updateOrderList(orderList: OrderList): Observable<boolean> {
    return this.http.patch<boolean>(`/api/order/update-order-list`, orderList)
  }
}
