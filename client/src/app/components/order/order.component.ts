import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderList } from '../shared/interfaces';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  loading = false
  orders$!: Observable<OrderList[]>
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {

    this.orders$ = this.orderService.fetch()
    this.orders$.subscribe(() => {
      setTimeout(() => {
        this.loading = true
      }, 1000)
    })


  }


}
