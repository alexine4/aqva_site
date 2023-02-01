import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { of, switchMap } from 'rxjs';
import { Company } from '../../shared/interfaces';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {


  signInForm!: FormGroup
  company!: Company
  updateStatus = false
  updateMessage = false
  deleteMessage = false
  loading = false
  idCompany!: number
  timeout = 5000


  constructor(private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({

      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      pickUpAddress: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[+0-9]{12,13}$/)])
    })
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['idCompany']) {

            return this.idCompany = params['idCompany']
          }
          return of(null)
        }
        )
      ).subscribe(
        () => {
          this.companyService.fetchById(this.idCompany).subscribe(
            companyResult => {
              this.company = companyResult
              this.signInForm.setValue({ name: companyResult.name, description: companyResult.description, pickUpAddress: companyResult.pickUpAddress, email: companyResult.email, phone: companyResult.phone })
              setTimeout(() => {
                this.loading = true
              }, 1000)
            }
          )
        }
      )


  }

  submitSignIn() {
    const newCompany = {
      idCompany: this.idCompany,
      name: this.signInForm.value.name,
      description: this.signInForm.value.description,
      pickUpAddress: this.signInForm.value.pickUpAddress,
      email: this.signInForm.value.email,
      phone: this.signInForm.value.phone,
    }


    this.companyService.update(newCompany).subscribe(
      result => {
        if (result) {
          this.company = newCompany
        }
        this.updateStatus = result
        this.updateMessage = true
        setTimeout(() => {
          this.updateMessage = false
        }, this.timeout);
      }
    )

  }

  deleteCompany() {
    this.companyService.delete(this.idCompany).subscribe(
      result => {
        if (result) {
          this.deleteMessage = true
          setTimeout(() => {
            this.deleteMessage = false
            this.router.navigate(['/companies'])
          }, this.timeout);
        }
      }
    )
  }


}
