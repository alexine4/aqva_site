import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { universalAdder } from 'src/app/components/shared/interfaces';
import { CheckPasswordComponent } from 'src/app/components/user-profile/check-password/check-password.component';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CheckPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: universalAdder
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
