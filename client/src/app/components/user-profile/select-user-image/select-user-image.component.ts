import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from 'src/app/components/shared/interfaces';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-select-user-image',
  templateUrl: './select-user-image.component.html',
  styleUrls: ['./select-user-image.component.scss']
})
export class SelectUserImageComponent implements OnInit {

  @ViewChild('input') inputRef?: ElementRef

  image!: File
  imagePreview: string | any
  disabled = true


  constructor(
    public dialogRef: MatDialogRef<SelectUserImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService
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


  uploadImage() {
    let img$



    if (this.image && this.data.username) {
      img$ = this.userService.uploadImage(this.data.username + '.jpg', this.image)
    }

    img$?.subscribe(
      resault => {
        this.disabled = true
        this.dialogRef.close(true);


      },
      error => console.log(error.error.message)
    )

  }



}
