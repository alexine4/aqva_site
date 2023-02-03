import { Component, Injectable, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { OrderList, UserInfo } from '../shared/interfaces';
import { OrderService } from '../shared/services/order.service';
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
  orderList!: OrderList



  constructor(public readonly title: Title,
    private userService: UserService,
    private orderService: OrderService
  ) {
    super();
  }
  ngOnInit(): void {

    this.userService.fetchUserInfo().subscribe(
      UserInfo => {
        if (UserInfo !== null) {
          this.userInfo = UserInfo
          this.orderService.fetchActual().subscribe(
            order => {
              this.orderList = order
              console.log(order);

            }
          )
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

  closeMenu() {
    document.querySelector('.main-menu')?.classList.remove('open-menu')
    document.querySelector('.action-icons__menu')?.classList.remove('active')
  }

}

