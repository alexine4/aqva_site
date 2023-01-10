import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User, UserInfo } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

import { UserService } from '../shared/services/user.service';
import { CheckPasswordComponent } from './check-password/check-password.component';
import { SelectUserImageComponent } from './select-user-image/select-user-image.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user!: User
  userInfo!: UserInfo
  form!: FormGroup
  focus = false
  timeout = 5000
  updateSuccess = false
  passwordUncorrect = false
  userDataUncorrect = false

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[+0-9]{12,13}$/)])
    })

    // this.form.disable()
    this.userService.fetchUser().subscribe(
      User => {
        this.user = User


        this.userService.fetchUserInfo().subscribe(
          UserInfo => {


            this.userInfo = UserInfo
            this.form.setValue({ username: this.user.username, email: this.user.email, country: this.userInfo.country, address: this.userInfo.address, city: this.userInfo.city, phone: this.userInfo.phone })
          })
      })
  }

  onSubmit() {
    if (this.user.username !== this.form.value.username || this.user.email !== this.form.value.email) {
      this.checkPassword('update user data')
    } else {
      this.updateUserInfo()
    }

  }

  // update email and username
  updateEmailAndUsername() {

    if (this.user.username !== this.form.value.username || this.user.email !== this.form.value.email) {
      this.form.disable()
      this.user.email = this.form.value.email
      this.user.username = this.form.value.username

      this.userService.updateUser(this.user).subscribe(
        update => {
          this.updateMessage(update)
          this.form.enable()
          this.updateUserInfo()


        }
      )

    }

  }

  // udpdate users info
  updateUserInfo() {
    // update other user info 
    if (this.form.value.country !== this.userInfo.country || this.form.value.city !== this.userInfo.city ||
      this.form.value.address !== this.userInfo.address || this.form.value.phone !== this.userInfo.phone) {
      this.form.disable()
      this.userInfo = {
        idUser: this.userInfo.idUser,
        country: this.form.value.country,
        address: this.form.value.address,
        imageSRC: this.userInfo.imageSRC,
        city: this.form.value.city,
        phone: this.form.value.phone
      }
      this.userService.updateUserInfo(this.userInfo).subscribe(
        () => {
          this.form.enable()
          if (!this.updateSuccess) {
            this.updateMessage(true)
          }
        }
      )
    }

  }

  // update message function
  updateMessage(status: Boolean) {
    if (status) {
      this.updateSuccess = true
      setTimeout(() => {
        this.updateSuccess = false
      }, this.timeout);
    } else {
      this.userDataUncorrect = true
      setTimeout(() => {
        this.userDataUncorrect = false
      }, this.timeout);
    }

  }

  //open upload image
  uploadUserImage() {
    const dialogRef = this.dialog.open(SelectUserImageComponent, {

      data: {

        username: this.user.username
      }
    })

    dialogRef.afterClosed().subscribe(
      result => {

        if (result) {
          this.updateMessage(result)
          setTimeout(() => {
            window.location.reload()
          }, this.timeout + 50);
        }

      }
    )
  }


  // focus list
  focusCheck() {
    this.focus = true
    const selectList = document.querySelector('.select-list')
    if (selectList) {
      selectList.addEventListener('focusout', (event) => {
        this.focus = false
      })
    }
  }


  // check user on required password

  checkPassword(changedParam: string) {
    const dialogRef = this.dialog.open(CheckPasswordComponent, {

      data: {

        username: this.user.username
      }
    })

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          if (changedParam === 'update user data') {
            this.updateEmailAndUsername()
          } else if (changedParam === 'password change') {
            this.changePassword()
          }

        } else {
          this.passwordUncorrect = true
          setTimeout(() => {
            this.passwordUncorrect = false
          }, this.timeout);
        }
      }
    )
  }

  changePassword() {
    this.router.navigate(['/user-profile/change-password'])

  }

  // log out
  logout(event: { preventDefault: () => void }) {
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/login'])
  }
}
