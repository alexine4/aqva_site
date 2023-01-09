import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-site-layots',
  templateUrl: './site-layots.component.html',
  styleUrls: ['./site-layots.component.scss']
})
export class SiteLayotsComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  logout(event: { preventDefault: () => void }) {
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {
  }



}
