import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Company, Image, Order, Position } from '../../shared/interfaces';
import { CompanyService } from '../../shared/services/company.service';
import { ImagePositionService } from '../../shared/services/image-position.service';
import { PositionsService } from '../../shared/services/menu/positions.service';
import { OrderService } from '../../shared/services/order.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  loading = false
  idOrder!: number

  orders!: Order[]
  companies!: Company[]
  positions!: Position[]
  images!: Image[]
  changed = false
  total!: number
  disabled!: boolean

  constructor(private route: ActivatedRoute,
    private companyService: CompanyService,
    private orderService: OrderService,
    private positionService: PositionsService,
    private imageService: ImagePositionService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['idOrder']) {

            return this.idOrder = params['idOrder']
          }
          return of(null)
        }
        )
      ).subscribe(
        () => {
          this.orderService.fetchAllOrder(this.idOrder).subscribe(
            order => {
              this.orders = order
              this.takeCompanyByName(order)
              this.takePositionById(order)
              this.takeImageByPosition(order)
              this.totalCost(order)
            }
          )
          setTimeout(() => {
            this.loading = true
          }, 1000);
        }
      )

  }

  totalCost(order: Order[]) {
    this.total = 0
    for (let index = 0; index < order.length; index++) {
      this.total += order[index].totalCoast
    }
  }

  takeCompanyByName(order: Order[]) {
    this.companies = [{
      idCompany: 0,
      name: '',
      description: '',
      pickUpAddress: '',
      phone: '',
      email: ''
    }]
    for (let index = 0; index < order.length; index++) {

      this.companyService.fetchByName(order[index].company).subscribe(
        comp => {
          if (index === 0) {
            this.companies[0] = comp
          } else {
            this.companies.push(comp)
            let status = true
            for (let step = 0; step < this.companies.length; step++) {
              if (comp.name === this.companies[step].name) {
                if (status) {
                  status = false
                } else {
                  status = true
                  this.companies.splice(step, 1)
                }
              }
            }


          }

        }
      )

    }

  }

  takePositionById(order: Order[]) {
    this.positions = [{
      idPosition: 0,
      name: '',
      description: '',
      idGenus: 0,
      count: 0,
      amount: 0,
      coast: 0,
      company: ''
    }]
    for (let index = 0; index < order.length; index++) {
      this.positionService.getById(order[index].idPosition).subscribe(
        positionRes => {
          if (index === 0) {
            this.positions[0] = positionRes
          } else {
            this.positions.push(positionRes)
          }
        }
      )

    }
  }


  takeImageByPosition(order: Order[]) {
    this.images = [{
      idPosition: 0,
      imageSRC: ' ',
      idUser: 0
    }]
    for (let index = 0; index < order.length; index++) {
      this.imageService.getOneByPosition(order[index].idPosition).subscribe(
        image => {
          if (index === 0) {
            this.images[0] = image
          } else {
            this.images.push(image)
          }
        }
      )

    }
  }
}
