import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Position } from 'src/app/components/shared/interfaces';
import { ImagePositionService } from 'src/app/components/shared/services/image-position.service';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {

  @ViewChild('input') inputRef?: ElementRef
  @ViewChild('inputColor') inputColor?: ElementRef

  image!: File
  imagePreview: string | any
  disabled = true
  description?: string;
  color = '#000000'

  constructor(
    public dialogRef: MatDialogRef<SelectImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position,
    private imageService: ImagePositionService
  ) { }
  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
      this.disabled = false
    }

    reader.readAsDataURL(file)
  }

  uploadClick() {
    this.inputRef?.nativeElement.click()
  }
  colorClick() {
    this.inputColor?.nativeElement.click()
  }

  uploadImage() {
    let img$

    if (this.data.idPosition !== undefined && this.image) {

      const idPosition = this.data.idPosition.toString()
      img$ = this.imageService.create(idPosition, this.image, this.color)
    }

    img$?.subscribe(
      resault => {
        this.disabled = true
        this.dialogRef.close();


      },
      error => console.log(error.error.message)
    )

  }

  changeColor(color: string) {
    const colorElem = document.getElementById('color')
    if (colorElem && color !== undefined) {
      colorElem.style.background = color
    }

  }

}
