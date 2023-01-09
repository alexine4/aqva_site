import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  signInForm!: FormGroup
  aSub!: Subscription
  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
  //login: admin; email: 
  ngOnInit(): void {
    this.signInForm = new FormGroup({
      login: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // You can sign-in in system
      } else if (params['accessDenied']) {
        // You must need authorizated

      }
    })
  }
  submitSignIn() {
    this.signInForm.disable()

    this.aSub = this.auth.login(this.signInForm.value).subscribe(
      () => { this.router.navigate(['/database']) },
      error => {
        console.warn(error)
        this.signInForm.enable()
      }
    )
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }

  }

}
