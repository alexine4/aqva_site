import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { universalAdder } from 'src/app/components/shared/interfaces';


@Component({
  selector: 'app-add-to-order',
  templateUrl: './add-to-order.component.html',
  styleUrls: ['./add-to-order.component.scss']
})
export class AddToOrderComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddToOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: universalAdder) { }

  error = false

  ngOnInit(): void {


  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  totalCost() {
    if (this.data.quantity && this.data.coastPerOne && this.data.amount) {
      if (this.data.quantity < this.data.amount + 1) {
        this.data.totalCoast = this.data.quantity * this.data.coastPerOne
        this.error = false
      } else {
        this.error = true
      }

    }
  }
}
