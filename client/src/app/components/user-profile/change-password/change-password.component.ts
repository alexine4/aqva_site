import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form!: FormGroup
  showPassword1 = true
  showPassword2 = true
  updateSuccess = false

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ])
    })
  }
  onSubmit() {
    this.form.disable()

    const user = {
      password: this.form.value.newPassword
    }
    this.userService.updateUserPassword(user).subscribe(
      result => {
        if (result) {
          this.form.enable()
          this.updateSuccess = true
          setTimeout(() => {
            this.updateSuccess = true
            this.router.navigate(['/user-profile'])
          }, 5000);
        }
      }
    )


  }

  showHidePassword(number: number) {

    if (number === 1) {
      const input = document.getElementById('showPassword1')
      if (input) {
        if (input.getAttribute('type') === 'password') {
          input.removeAttribute('type');
          input.setAttribute('type', 'text');
        } else {
          input.removeAttribute('type');
          input.setAttribute('type', 'password');
        }
      }
    } else if (number === 2) {
      const input = document.getElementById('showPassword2')
      if (input) {
        if (input.getAttribute('type') === 'password') {
          input.removeAttribute('type');
          input.setAttribute('type', 'text');
        } else {
          input.removeAttribute('type');
          input.setAttribute('type', 'password');
        }
      }
    }
  }

}
