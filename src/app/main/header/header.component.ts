import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public faBars = faBars;
  public faUser = faUser;
  public faShoppingCart = faShoppingCart;

  public show_nav_mobile = false;

  public user: any = {
    first_name: "Kauê"
  }

  public cart: any = {
    qty: "10"
  }

  constructor(
    public router: Router
  ) { }

  showNavMobile() {
    this.show_nav_mobile = true;
  }

  hideNavMobile() {
    this.show_nav_mobile = false;
  }

}
