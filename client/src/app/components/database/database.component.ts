import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { Category, Color, Genus, Image, Position, Type } from '../shared/interfaces';
import { ImagePositionService } from '../shared/services/image-position.service';
import { CategoriesService } from '../shared/services/menu/categories.service';
import { GenusService } from '../shared/services/menu/genus.service';
import { PositionsService } from '../shared/services/menu/positions.service';
import { TypesService } from '../shared/services/menu/types.service';
import { AddNewCategoryComponent } from './menu/add-new-category/add-new-category.component';
import { NewItemComponent } from './product-item/new-item/new-item.component';


@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  @ViewChild('input') inputRef?: ElementRef

  categories$!: Observable<Category[]>
  types$!: Observable<Type[]>
  genusies$!: Observable<Genus[]>
  positions$!: Observable<Position[]>

  viewPositions$!: Observable<Position[]>
  images!: Image[]
  color!: Color[]


  score!: number
  firstLayer = true
  secondLayer = false
  thirdLayer = false
  forsLayer = false
  menuTitle?: string = ''
  error?: string
  idGenus?: number
  idType?: number
  idCategory?: number

  activeCategory!: Category
  activeType!: Type
  activeGenus!: Genus
  find = ''
  sortParam = ''
  activeAz = false
  activeZa = false


  constructor(
    private categoriesServices: CategoriesService,
    private typesService: TypesService,
    private genusService: GenusService,
    private positionService: PositionsService,
    private imagePosService: ImagePositionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // get menu
    this.categories$ = this.categoriesServices.fetch()
    this.categoriesServices.count().subscribe(
      score => {
        this.score = score
        this.activeCategory = {
          name: ' ',
          count: score
        }
      })

    // get positiion
    this.getPosition()


  }

  //-----------------------------------------------------------------------  
  //menu

  menuActive() {

    document.querySelector('.categories-list')?.classList.toggle('hide')
    document.querySelector('.category-menu')?.classList.toggle('active-menu')
    this.relativeHieghtMenu()


  }

  relativeHieghtMenu() {


    const menu = document.getElementById('menu')
    const checkActive = document.querySelector('.hide')
    const list = document.getElementById('list')
    const buttonAdd = document.getElementById('addNew')

    const quantityElements = document.querySelectorAll('.category')
    const firstLayer = document.querySelector('.first-layer')
    const secondLayer = document.querySelector('.second-layer')
    const thirdLayer = document.querySelector('.third-layer')
    const forsLayer = document.querySelector('.fors-layer')


    var size = 45

    if (firstLayer) {
      if (quantityElements.length === 0) {
        var size = 175

      } else {
        var size = 42 * quantityElements.length + 135 + 80
      }
    } else if (secondLayer || thirdLayer || forsLayer) {
      if (quantityElements.length === 0) {
        var size = 154 + 50
      } else {
        var size = 50 * quantityElements.length + 136 + 60
      }
    }

    if (menu && checkActive && list) {
      menu.style.maxHeight = `45px`
      menu.style.top = `0px`




    } else if (menu && !checkActive && list) {

      if (quantityElements.length > 10) {
        menu.style.maxHeight = `600px`
        menu.style.top = `0px`
        list.style.overflowY = `scroll`
        list.style.overflowX = `hidden`
        if (buttonAdd) {
          buttonAdd.style.width = `${quantityElements[1].clientWidth}px`;
        }


      } else {
        menu.style.top = `${0}px`
        menu.style.maxHeight = `${size}px`
        list.style.overflowY = `hidden`
      }

    }


  }


  secondLevel(idCategory: number | undefined, name: string | undefined) {
    this.find = ''
    if (name !== undefined) {
      this.activeCategory.name = name
      this.activeCategory.idCategories = idCategory
    }



    if (idCategory !== undefined) {
      this.activeCategory.idCategories = idCategory
      this.viewPositions$ = this.positionService.fetchByCategory(idCategory)
      this.types$ = this.typesService.fetchByCategory(idCategory)
      this.types$.subscribe(
        () => {
          setTimeout(() => { this.relativeHieghtMenu() }, 500)
        },
        error => {
          this.error = error, setTimeout(() => { this.relativeHieghtMenu() }, 500)
        },
      )
      this.typesService.count(idCategory).subscribe(
        score => {
          this.score = score
          this.activeType = {
            name: ' ',
            idCategory: idCategory,
            count: score
          }
        }
      )
    }
    this.firstLayer = false
    this.secondLayer = true
    this.menuTitle = name
  }

  thirdLevel(idType: number | undefined, name: string | undefined) {
    this.find = ''
    if (name !== undefined) {
      this.activeType.name = name
      this.activeType.idType = idType
    }

    if (idType !== undefined) {
      this.genusies$ = this.genusService.fetchByType(idType)
      this.viewPositions$ = this.positionService.fetchByType(idType)
      this.genusies$.subscribe(
        () => {
          setTimeout(() => { this.relativeHieghtMenu() }, 500)
        },
        error => {
          this.error = error, setTimeout(() => { this.relativeHieghtMenu() }, 500)
        })
      this.genusService.count(idType).subscribe(
        score => {
          this.score = score
          this.activeGenus = {
            name: ' ',
            idType: idType,
            count: score
          }
        }
      )
    }
    this.secondLayer = false
    this.thirdLayer = true
    this.menuTitle = name
  }
  forsLevel(idGenus: number | undefined, name: string | undefined) {
    this.find = ''
    if (name !== undefined) {
      this.activeGenus.idGenus = idGenus
      this.activeGenus.name = name
    }
    if (idGenus !== undefined) {
      this.positions$ = this.positionService.fetchByGenus(idGenus)
      this.viewPositions$ = this.positions$
      this.positions$.subscribe(
        () => {
          setTimeout(() => { this.relativeHieghtMenu() }, 500)
        },
        error => {
          this.error = error, setTimeout(() => { this.relativeHieghtMenu() }, 500)
        })
      this.positionService.count(idGenus).subscribe(
        score => {
          this.activeGenus.count = score
        }
      )
    }
    this.thirdLayer = false
    this.forsLayer = true
    this.menuTitle = name
  }


  back() {
    this.find = ''
    if (this.secondLayer && !this.thirdLayer && !this.forsLayer) {
      this.firstLayer = true
      this.secondLayer = false
      this.viewPositions$ = this.positionService.fetch()
      if (this.activeCategory.count) {

        this.score = this.activeCategory.count
        this.menuTitle = ''
      }
      setTimeout(() => { this.relativeHieghtMenu() }, 500)

    } else if (!this.secondLayer && this.thirdLayer && !this.forsLayer) {
      this.secondLayer = true
      this.thirdLayer = false
      if (this.activeCategory.idCategories) {

        const idCategory = this.activeCategory.idCategories
        this.viewPositions$ = this.positionService.fetchByCategory(idCategory)
      }
      if (this.activeType.count) {
        this.score = this.activeType.count
        this.menuTitle = this.activeCategory.name
      }
      setTimeout(() => { this.relativeHieghtMenu() }, 500)

    } else if (!this.secondLayer && !this.thirdLayer && this.forsLayer) {
      this.thirdLayer = true
      this.forsLayer = false
      if (this.activeType.idType) {
        this.viewPositions$ = this.positionService.fetchByType(this.activeType.idType)
      }
      if (this.activeGenus.count) {
        this.score = this.activeGenus.count
        this.menuTitle = this.activeType.name
      }
      setTimeout(() => { this.relativeHieghtMenu() }, 500)

    }
  }
  // add new category in menu
  addNewCategory() {
    const dialogRef = this.dialog.open(AddNewCategoryComponent, {

      data: {
        action: 'new',
        type: 'Category',
        name: ''
      }
    })

    dialogRef.afterClosed().subscribe(
      result => {
        const category = {
          name: result.name
        }
        this.categoriesServices.create(category).subscribe(
          status => {
            if (status) {
              this.categories$ = this.categoriesServices.fetch()
            }
          }
        )
      }
    )
  }
  // add new type in menu
  addNewType() {
    const dialogRef = this.dialog.open(AddNewCategoryComponent, {

      data: {
        action: 'new',
        type: 'Type',
        name: ''
      }
    })

    dialogRef.afterClosed().subscribe(
      result => {

        if (this.activeCategory.idCategories !== undefined) {
          const type = {
            idCategory: this.activeCategory.idCategories,
            name: result.name
          }
          this.typesService.create(type).subscribe(
            status => {
              if (status) {
                this.types$ = this.typesService.fetchByCategory(type.idCategory)
              }
            }
          )

        }


      }
    )
  }
  // add new genus in menu
  addNewGenus() {
    const dialogRef = this.dialog.open(AddNewCategoryComponent, {

      data: {
        action: 'new',
        type: 'Genus',
        name: ''
      }
    })

    dialogRef.afterClosed().subscribe(
      result => {

        if (this.activeType.idType) {
          const genus = {
            idType: this.activeType.idType,
            name: result.name
          }
          this.genusService.create(genus).subscribe(
            status => {
              if (status) {
                this.genusies$ = this.genusService.fetchByType(genus.idType)
              }
            }
          )

        }


      }
    )
  }
  // add new genus in menu
  addNewPosition() {
    const dialogRef = this.dialog.open(AddNewCategoryComponent, {

      data: {
        action: 'new',
        type: 'Position',
        name: '',
        description: ''
      }
    })

    dialogRef.afterClosed().subscribe(
      result => {
        if (this.activeGenus.idGenus) {
          const position = {
            idGenus: this.activeGenus.idGenus,
            name: result.name,
            description: result.description,
            amount: 0,
            company: ''
          }
          this.positionService.create(position).subscribe(
            status => {
              if (status) {
                this.positions$ = this.positionService.fetchByGenus(position.idGenus)
              }
            }
          )

        }


      }
    )
  }


  //-----------------------------------------------------------------------------------
  // database page
  getPosition() {
    this.images = [{
      idPosition: 0,
      imageSRC: ' ',
      idUser: 0
    }]

    this.viewPositions$ = this.positionService.fetch()

    this.viewPositions$.subscribe(
      positions => {



        for (let index = 0; index < positions.length; index++) {
          let id = positions[index].idPosition
          if (id !== undefined) {
            this.imagePosService.getByPosition(id).subscribe(
              images => {


                if (images[0]) {
                  this.images = this.images.concat(images)
                  images[0].active = true

                } else {
                  this.images.push({
                    idPosition: 0,
                    imageSRC: ' ',
                    idUser: 0
                  })
                }
              }
            )
          }
        }
      }
    )
  }

  changeImageForColor(idPosition: number, color: string | undefined, event: Event) {
    event.stopPropagation()
    for (let index = 0; index < this.images.length; index++) {
      if (this.images[index].idPosition === idPosition) {
        this.images[index].active = false
        if (this.images[index].color === color) {
          this.images[index].active = true
        }
      }
    }
  }



  search(searchParam: string) {
    const params = Object.assign({
      searchParam
    })
    this.viewPositions$ = this.positionService.search(params)

  }

  reductItem(event: Event, idItem: number | undefined, name: string | undefined, description: string | undefined, item: string) {
    event.stopPropagation()

    // reduct category
    if (item === 'Category') {
      const dialogRef = this.dialog.open(AddNewCategoryComponent, {
        data: {
          action: 'update',
          type: 'Category',
          name
        }
      })

      dialogRef.afterClosed().subscribe(
        result => {
          if (idItem !== undefined) {
            const category = {
              idCategories: idItem,
              name: result.name
            }
            this.categoriesServices.update(category).subscribe(
              status => {
                if (status) {
                  this.categories$ = this.categoriesServices.fetch()
                }
              }
            )
          }
        }
      )

    }
    //reduct type
    else if (item === 'Type') {
      const dialogRef = this.dialog.open(AddNewCategoryComponent, {

        data: {
          action: 'update',
          type: 'Type',
          name: name
        }
      })

      dialogRef.afterClosed().subscribe(
        result => {
          if (idItem !== undefined && this.activeCategory.idCategories) {
            const type = {
              idCategory: this.activeCategory.idCategories,
              idType: idItem,
              name: result.name
            }
            this.typesService.update(type).subscribe(
              status => {
                if (status) {
                  this.types$ = this.typesService.fetchByCategory(type.idCategory)
                }
              }
            )
          }
        }
      )
    }
    // reduct genus
    else if (item === 'Genus') {
      const dialogRef = this.dialog.open(AddNewCategoryComponent, {

        data: {
          action: 'update',
          type: 'Genus',
          name: name
        }
      })

      dialogRef.afterClosed().subscribe(
        result => {
          if (idItem !== undefined && this.activeType.idType) {
            const genus = {
              idType: this.activeType.idType,
              idGenus: idItem,
              name: result.name
            }
            this.genusService.update(genus).subscribe(
              status => {
                if (status) {
                  this.genusies$ = this.genusService.fetchByType(genus.idType)
                }
              }
            )
          }
        }
      )
    }
    // reduct position
    else if (item === 'Position') {
      const dialogRef = this.dialog.open(AddNewCategoryComponent, {

        data: {
          action: 'update',
          type: 'Position',
          name: name,
          description
        }
      })

      dialogRef.afterClosed().subscribe(
        result => {
          if (idItem !== undefined && this.activeGenus.idGenus) {
            const positiion = {
              idPosition: idItem,
              idGenus: this.activeGenus.idGenus,
              name: result.name,
              description: result.description,
              amount: 0,
              company: ''
            }
            this.positionService.update(positiion).subscribe(
              status => {
                if (status) {
                  this.positions$ = this.positionService.fetchByGenus(positiion.idGenus)
                }
              }
            )
          }
        }
      )
    }

  }

  deleteItem(event: Event, idItem: number | undefined, name: string | undefined, item: string) {
    event.stopPropagation()

    // delete category
    if (item === 'Category') {
      const dialogRef = this.dialog.open(NewItemComponent, {

        data: {
          delete: true,
          type: 'Category',
          name: name
        }
      })
      dialogRef.afterClosed().subscribe(
        result => {
          if (result !== undefined && idItem) {
            this.categoriesServices.delete(idItem).subscribe(
              deleteStatus => {
                if (deleteStatus) {
                  this.categories$ = this.categoriesServices.fetch()
                }
              }
            )
          }

        })
    }
    // delete type
    else if (item === 'Type') {
      const dialogRef = this.dialog.open(NewItemComponent, {

        data: {
          delete: true,
          type: 'Type',
          name: name
        }
      })
      dialogRef.afterClosed().subscribe(
        result => {
          if (result !== undefined && idItem) {
            this.typesService.delete(idItem).subscribe(
              deleteStatus => {
                if (deleteStatus && this.activeCategory.idCategories) {
                  this.types$ = this.typesService.fetchByCategory(this.activeCategory.idCategories)
                }
              }
            )
          }

        })
    }
    // delete genus
    else if (item === 'Genus') {
      const dialogRef = this.dialog.open(NewItemComponent, {

        data: {
          delete: true,
          type: 'Genus',
          name: name
        }
      })
      dialogRef.afterClosed().subscribe(
        result => {
          if (result !== undefined && idItem) {
            this.genusService.delete(idItem).subscribe(
              deleteStatus => {
                if (deleteStatus && this.activeType.idType) {
                  this.genusies$ = this.genusService.fetchByType(this.activeType.idType)
                }
              }
            )
          }

        })
    }
    // delete position

    else if (item === 'Position') {
      const dialogRef = this.dialog.open(NewItemComponent, {

        data: {
          delete: true,
          type: 'Position',
          name: name
        }
      })
      dialogRef.afterClosed().subscribe(
        result => {
          if (result !== undefined && idItem) {
            this.positionService.delete(idItem).subscribe(
              deleteStatus => {
                if (deleteStatus && this.activeGenus.idGenus) {
                  this.positions$ = this.positionService.fetchByGenus(this.activeGenus.idGenus)
                }
              }
            )
          }

        })
    }
  }



}

