import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from "../shared/classes/material.service";
import { UserStatus } from '../shared/interfaces';
import { RegistrService } from '../shared/services/registr.service';




@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  email: string | any
  username: string | any
  logInForm!: FormGroup
  nextStep = false
  time = 5000
  emailExists = false
  usernameExists = false
  status: UserStatus | any
  constructor(
    private register: RegistrService
  ) { }

  submitLogIn() {
    this.active()
    this.logInForm.disable()
    this.email = this.logInForm.value.email
    this.username = this.logInForm.value.username

  }

  disactive() {

    document.querySelector(".verification")?.classList.remove("_active")

  }
  active() {
    setTimeout(this.disactive, this.time)
    const disactive = document.querySelector(".login-forms")
    const active = document.querySelector(".verification")
    disactive?.classList.add("_disactive")
    active?.classList.add("_active")
    setTimeout(() => { this.nextStep = true }, this.time)
  }


  ngOnInit(): void {
    this.logInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'username': new FormControl('', [Validators.required]),
    })
  }

  // check email is exist or not
  checkEmail(value: string) {

    if (value === '') {
      this.emailExists = false
    }
    else {
      this.logInForm.disable()
      const newUser = {
        username: '',
        email: value,
        password: ''
      }
      this.register.check(newUser).subscribe(
        userStatus => {
          this.status = userStatus.status
          this.emailExists = this.status

        },
        error => { },
        () => this.logInForm.enable()
      )
    }
  }

  // check username is exist or not
  checkUsername(value: string) {

    if (value === '') {
      this.usernameExists = false
    }
    else {
      this.logInForm.disable()
      const newUser = {
        username: value,
        email: '',
        password: ''
      }
      this.register.check(newUser).subscribe(
        userStatus => {
          this.status = userStatus.status
          this.usernameExists = this.status

        },
        error => {
          MaterialService.toast(error.error.message)
        },
        () => this.logInForm.enable()
      )
    }
  }




}
