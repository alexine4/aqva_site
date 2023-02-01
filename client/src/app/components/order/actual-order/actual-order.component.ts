
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Company, Image, Order, Position } from '../../shared/interfaces';
import { CompanyService } from '../../shared/services/company.service';
import { ImagePositionService } from '../../shared/services/image-position.service';
import { PositionsService } from '../../shared/services/menu/positions.service';
import { OrderService } from '../../shared/services/order.service';
import { OrderCompliteComponent } from '../order-complite/order-complite.component';

@Component({
  selector: 'app-actual-order',
  templateUrl: './actual-order.component.html',
  styleUrls: ['./actual-order.component.scss']
})
export class ActualOrderComponent implements OnInit {
  loading = false
  idOrder!: number

  orders!: Order[]
  companies!: Company[]
  positions!: Position[]
  images!: Image[]
  changed = false
  total!: number
  disabled!: boolean
  message = false
  updateMessageStatus = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private orderService: OrderService,
    private positionService: PositionsService,
    private imageService: ImagePositionService,
    public dialog: MatDialog
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

  updateInput(idPosition: number, amount: number) {
    for (let index = 0; index < this.orders.length; index++) {
      if (this.orders[index].idPosition === idPosition) {
        this.orders[index].amount = amount
        this.orders[index].totalCoast = this.orders[index].coastPerOne * this.orders[index].amount
        this.totalCost(this.orders)
        this.changed = true
        for (let step = 0; step < this.positions.length; step++) {
          if (this.positions[step].idPosition === this.orders[index].idPosition) {
            if (this.orders[index].amount > this.positions[step].amount) {
              this.disabled = true
            } else if (this.orders[index].amount < 0) {
              this.disabled = true
            } else {
              this.disabled = false
            }
          }
        }

      }
    }
  }

  applyOrder() {
    const dialogRef = this.dialog.open(OrderCompliteComponent, {
      data: {
        idOrder: this.idOrder,
        total: this.total
      }
    })

    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          const orderList = {
            idOrder: this.idOrder,
            orderStatus: true,
            total: this.total
          }
          this.orderService.updateOrderList(orderList).subscribe(
            statusResult => {
              this.message = true
              if (statusResult) {
                this.updateMessageStatus = statusResult

              }
              setTimeout(() => {
                this.message = false
                this.updateMessageStatus = false
                this.router.navigate([`/orders/order-detail/${this.idOrder}`])
              }, 5000);
            }
          )

        }
      }
    )
    if (this.changed) {
      this.orderService.updateOrder(this.orders).subscribe(
        result => {
          if (result) {
            this.changed = false
          }
        }
      )
    }


  }

}
