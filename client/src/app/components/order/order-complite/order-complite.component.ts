import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderList } from '../../shared/interfaces';

@Component({
  selector: 'app-order-complite',
  templateUrl: './order-complite.component.html',
  styleUrls: ['./order-complite.component.scss']
})
export class OrderCompliteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderCompliteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderList
  ) { }

  ngOnInit(): void {

  }


}
