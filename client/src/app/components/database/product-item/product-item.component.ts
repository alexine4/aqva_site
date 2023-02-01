import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Clipboard } from '@angular/cdk/clipboard'

import { Position, Image, UserInfo } from '../../shared/interfaces';
import { PositionsService } from '../../shared/services/menu/positions.service';
import { MatDialog } from '@angular/material/dialog';
import { NewItemComponent } from './new-item/new-item.component';
import { SelectImageComponent } from './select-image/select-image.component';
import { ImagePositionService } from '../../shared/services/image-position.service';
import { AddToOrderComponent } from './add-to-order/add-to-order.component';
import { OrderService } from '../../shared/services/order.service';
import { UserService } from '../../shared/services/user.service';






@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {


  selectedIndex = 0

  loading = true
  form!: FormGroup

  position!: Position

  images$!: Observable<Image[]>
  imagesArr!: Image[]
  UserInfo!: UserInfo[]

  copyLink = false
  activeSettings = false
  updateMessage = false
  deleteMessage = false
  deleteSuccess = false
  createMessage = false
  addToOrderMessage = false
  addToOrderResult = false
  timeout = 5000


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private positionService: PositionsService,
    private imageService: ImagePositionService,
    private orderService: OrderService,
    private userService: UserService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
  ) { }

  ngOnInit(): void {
    // get positions
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['idPosition']) {
            this.images$ = this.imageService.getByPosition(params['idPosition'])
            this.images$.subscribe(
              images => {
                this.imagesArr = images

              }

            )

            return this.positionService.getById(params['idPosition'])
          }
          return of(null)
        }
        )
      ).subscribe(
        position => {
          this.takeImageUsers()
          if (position) {
            this.position = {
              idPosition: position.idPosition,
              name: position.name,
              description: position.description,
              coast: position.coast,
              amount: position.amount,
              idGenus: position.idGenus,
              company: position.company
            }
          }

          this.loading = false
        }
      )
  }

  takeImageUsers() {
    this.UserInfo = [{
      idUser: 0
    }]

    for (let index = 0; index < this.imagesArr.length; index++) {
      this.userService.fetchUserInfoById(this.imagesArr[index].idUser).subscribe(
        userInfo => {

          if (index === 0) {
            this.UserInfo[0] = userInfo
          } else {
            this.UserInfo.push(userInfo)
          }

        }
      )
    }
  }

  updatePosition(position: Position) {


    const dialogRef = this.dialog.open(NewItemComponent, {

      data: { name: position.name, description: position.description, coast: position.coast, amount: position.amount, company: position.company },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newPosition = {
          idPosition: this.position.idPosition,
          name: result.name,
          description: result.description,
          amount: result.amount,
          coast: result.coast,
          company: result.company
        }
        this.positionService.update(newPosition)
          .subscribe(
            result => {
              if (result === true) {
                this.position = {
                  idPosition: this.position.idPosition,
                  name: newPosition.name,
                  description: newPosition.description,
                  coast: newPosition.coast,
                  amount: newPosition.amount,
                  company: newPosition.company
                }
                dialogRef.close()
                this.updateMessage = true

                setTimeout(() => {
                  this.updateMessage = false

                }, this.timeout);

              }
            }




          )


      }


    });

  }


  createPosition() {


    const dialogRef = this.dialog.open(NewItemComponent, {

      data: { name: '', description: '', amount: 0, coast: 0, company: '', companyAddress: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newPosition = {

          name: result.name,
          description: result.description,
          idGenus: this.position.idGenus,
          coast: result.coast,
          amount: result.amount,
          company: result.company,
          companyAddress: result.companyAddress
        }
        this.positionService.create(newPosition)
          .subscribe(
            result => {
              if (result === true) {

                dialogRef.close()
                this.createMessage = true

                setTimeout(() => {

                  this.createMessage = false
                  this.router.navigate(['/database'])
                }, this.timeout);
              }
            }
          )


      }


    });

  }

  deletePosition(position: Position) {
    const dialogRef = this.dialog.open(NewItemComponent, {

      data: { name: position.name, description: position.description, delete: true },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined && position.idPosition) this.positionService.delete(position.idPosition)
        .subscribe(
          result => {
            dialogRef.close()
            this.deleteMessage = true
            if (result === true) {

              this.deleteSuccess = true

              setTimeout(() => {

                this.deleteMessage = false
                this.deleteSuccess = false
                this.router.navigate(['/database'])
              }, this.timeout);
            } else {


              setTimeout(() => {

                this.deleteMessage = false

              }, this.timeout);
            }
          }
        )

    });
  }

  //open ulpoad image window
  uploadPositionImage(position: Position) {
    const dialogRef = this.dialog.open(SelectImageComponent, {

      data: {
        idPosition: position.idPosition,
        name: position.name
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      let position = this.position.idPosition
      if (position !== undefined) {
        this.images$ = this.imageService.getByPosition(position)
      }

    }
    )
  }

  //------------------------------------------------------
  //slider function
  selectImage(index: number) {
    const prevElem = document.querySelectorAll('.slide')

    let numberElements = prevElem.length - 1

    if (index > 0) {
      if (index <= numberElements) {
        this.selectedIndex = index
      } else {
        this.selectedIndex = 0
      }

    } else if (index === 0) {
      this.selectedIndex = 0
    }
    else if (index < 0) {
      this.selectedIndex = numberElements
    }

    const width = document.querySelector('.slider')?.clientWidth


    if (width && width >= 450) {
      let offset = 470
      this.moveSlide(this.selectedIndex, offset)

    } else if (width && width >= 360 && width < 450) {
      let offset = 380
      this.moveSlide(this.selectedIndex, offset)
    }

  }

  moveSlide(index: number, offset: number) {
    const slides = document.querySelectorAll('.slide')
    for (let i = 0; i < slides.length; i++) {
      let id = i.toString()

      if (id === index.toString() && index >= 0) {
        const element = document.getElementById(id)

        if (element) { element.style.left = `${-offset * index}px` }
      }
      if (id < index.toString() && index >= 0) {
        const element = document.getElementById(id)
        if (element) { element.style.left = `${-offset * index}px` }
      }

      if (id > index.toString() && index >= 0) {
        const element = document.getElementById(id)
        if (element) { element.style.left = `${-offset * index}px` }
      }
    }
  }
  //--------------------------------------------------------


  // copy link
  shareLink() {
    this.clipboard.copy(window.location.href);
    this.copyLink = true
    setTimeout(() => {
      this.copyLink = false
    }, this.timeout / 2);
  }

  // dowmload image
  downloadActiveImage() {
    let a = document.createElement("a");
    a.href = "http://localhost:4200/" + this.imagesArr[this.selectedIndex].imageSRC;
    a.download = this.position.name + "_image_" + this.selectedIndex;
    a.click();
  }

  //add to order
  addToOrder() {
    const dialogRef = this.dialog.open(AddToOrderComponent, {

      data: { name: this.position.name, coastPerOne: this.position.coast, quantity: 0, amount: this.position.amount, totalCoast: 0 },
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (this.position.idPosition && this.position.coast) {
          const newOrder = {
            idPosition: this.position.idPosition,
            amount: result.quantity,
            coastPerOne: this.position.coast,
            totalCoast: result.totalCoast,
            company: this.position.company
          }

          this.orderService.addToOrder(newOrder).subscribe(
            result => {
              if (result) {
                this.addToOrderMessage = true
                this.addToOrderResult = true
                setTimeout(() => {
                  this.addToOrderMessage = false
                  this.addToOrderResult = false
                }, this.timeout);
              }
              else {
                this.addToOrderMessage = true
                setTimeout(() => {
                  this.addToOrderMessage = false
                }, this.timeout);
              }
            }
          )
        }





      }
    )
  }


}
