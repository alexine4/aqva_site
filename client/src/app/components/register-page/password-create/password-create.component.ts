import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialService } from "../../shared/classes/material.service";
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-password-create',
  templateUrl: './password-create.component.html',
  styleUrls: ['./password-create.component.scss']
})
export class PasswordCreateComponent implements OnInit {
  @Input() username: string | any
  @Input('email') email: string | any

  passwordForm!: FormGroup
  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.username, this.email);

    this.passwordForm = new FormGroup({
      'createPassword': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
      'confirmPassword': new FormControl('', [Validators.required]),
    })
  }

  submitLogIn() {
    if (this.passwordForm.value.confirmPassword === this.passwordForm.value.createPassword) {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.passwordForm.value.confirmPassword
      }

      this.passwordForm.disable()

      this.authService.register(newUser).subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        },
        error => {

          this.passwordForm.enable()
        }
      )

    }



  }

}
