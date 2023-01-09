import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Clipboard } from '@angular/cdk/clipboard'

import { Position, Image } from '../../shared/interfaces';
import { PositionsService } from '../../shared/services/menu/positions.service';
import { MatDialog } from '@angular/material/dialog';
import { NewItemComponent } from './new-item/new-item.component';
import { SelectImageComponent } from './select-image/select-image.component';
import { ImagePositionService } from '../../shared/services/image-position.service';






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

  copyLink = false
  activeSettings = false
  updateMessage = false
  deleteMessage = false
  deleteSuccess = false
  createMessage = false
  timeout = 5000


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private positionService: PositionsService,
    public dialog: MatDialog,
    private imageService: ImagePositionService,
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
          if (position) {
            this.position = {
              idPosition: position.idPosition,
              name: position.name,
              description: position.description,
              idGenus: position.idGenus
            }
          }

          this.loading = false
        }
      )


  }

  updatePosition(position: Position) {


    const dialogRef = this.dialog.open(NewItemComponent, {

      data: { name: position.name, description: position.description },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newPosition = {
          idPosition: this.position.idPosition,
          name: result.name,
          description: result.description
        }
        this.positionService.update(newPosition)
          .subscribe(
            result => {
              if (result === true) {
                this.position = {
                  idPosition: this.position.idPosition,
                  name: newPosition.name,
                  description: newPosition.description
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

      data: { name: '', description: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newPosition = {

          name: result.name,
          description: result.description,
          idGenus: this.position.idGenus
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
      let position = this.position.idPosition?.toString()
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



  shareLink() {
    this.clipboard.copy(window.location.href);
    this.copyLink = true
    setTimeout(() => {
      this.copyLink = false
    }, this.timeout / 2);
  }
  downloadActiveImage() {
    let a = document.createElement("a");
    a.href = "http://localhost:4200/" + this.imagesArr[this.selectedIndex].imageSRC;
    a.download = this.position.name + "_image_" + this.selectedIndex;
    a.click();
  }


}
