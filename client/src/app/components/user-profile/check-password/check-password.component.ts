import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-check-password',
  templateUrl: './check-password.component.html',
  styleUrls: ['./check-password.component.scss']
})
export class CheckPasswordComponent implements OnInit {



  form!: FormGroup;
  description?: string;
  newCheker = false



  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<CheckPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }
  ngOnInit(): void {
    if (this.data.username === '') this.newCheker = true
    this.data.password = ''


  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  confirmPassword(username: string | any, password: string) {


    const user = {
      username: username,
      password
    }

    this.auth.checkPassword(user).subscribe(
      status => {
        this.dialogRef.close(status);

      }
    )

  }

}
