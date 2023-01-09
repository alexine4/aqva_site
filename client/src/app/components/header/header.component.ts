import { Component, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { UserInfo } from '../shared/interfaces';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


@Injectable({ providedIn: 'root' })
export class HeaderComponent extends TitleStrategy implements OnInit {
  titl?: string
  userInfo!: UserInfo



  constructor(public readonly title: Title,
    private userService: UserService
  ) {
    super();
  }
  ngOnInit(): void {

    this.userService.fetchUserInfo().subscribe(
      UserInfo => {
        console.log(UserInfo);

        if (UserInfo !== null) {
          this.userInfo = UserInfo
        }



      })

  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState)
    if (title !== undefined) {
      this.title.setTitle(`${title}`)
    }
  }


  activeMenu(): void {
    const menu = document.querySelector('.action-icons__menu')
    const nav = document.querySelector('.main-menu');
    const backdrop = document.querySelector('.backdrop');

    if (menu && backdrop && nav) {
      nav.classList.add('open-menu')
      menu.classList.add('active')

      backdrop.addEventListener('click', () => {
        nav.classList.remove('open-menu')
        menu.classList.remove('active')
      });
    }


  }


}

