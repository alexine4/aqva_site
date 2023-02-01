
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../shared/interfaces';
import { CompanyService } from '../shared/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies$!: Observable<Company[]>
  loading = false
  lenght!: number
  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companies$ = this.companyService.fetch()
    this.companies$.subscribe(company => {
      this.lenght = company.length


      setTimeout(() => {
        this.loading = true
      }, 1000);
    })
  }

}
