import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Position } from 'src/app/components/shared/interfaces';



@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  form!: FormGroup;
  description?: string;
  newCheker = false

  constructor(
    public dialogRef: MatDialogRef<NewItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position
  ) { }
  ngOnInit(): void {
    if (this.data.name === '') this.newCheker = true



  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
