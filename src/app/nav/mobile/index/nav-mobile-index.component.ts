import { Component, Output, EventEmitter, AfterViewInit, AfterContentInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nav-mobile-index',
  templateUrl: './nav-mobile-index.component.html',
  styleUrls: ['./nav-mobile-index.component.css']
})
export class IndexComponent implements AfterContentInit {

  faTimes = faTimes;
  faSignInAlt = faSignInAlt;
  faClipboard = faClipboard;
  faShoppingCart = faShoppingCart;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;

  categories = [
    {
      name: "Hardware",
      children: [
        { name: "Procesador", link: "/categorias/procesador" },
        { name: "Tarjeta Gráfica", link: "/categorias/tarjeta-grafica" },
        { name: "Placa Madre", link: "/categorias/placa-madre" },
        { name: "RAM", link: "/categorias/ram" }
      ]
    },
    {
      name: "Almacenamiento",
      children: [
        { name: "Disco Duro", link: "/categorias/disco-duro" },
        { name: "SSD", link: "/categorias/ssd" },
        { name: "Pen Drive", link: "/categorias/pen-drive" },
      ]
    },
    {
      name: "Periféricos",
      children: [
        { name: "Monitor", link: "/categorias/monitor" },
        { name: "Mouse", link: "/categorias/mouse" },
        { name: "Teclado", link: "/categorias/teclado" },
        { name: "Headset", link: "/categorias/headset" }
      ]
    },
    {
      name: "Otros",
      children: [
        { name: "Cooler", link: "/categorias/cooler" },
        { name: "Gabinete", link: "/categorias/gabinete" },
        { name: "Mousepad", link: "/categorias/mousepad" },
        { name: "Speaker", link: "/categorias/speaker" },
        { name: "Silla", link: "/categorias/silla" },
        { name: "Red", link: "/categorias/red" },
        { name: "Notebook", link: "/categorias/notebook" },
      ]
    }
  ]

  user = {
    first_name: "Kauê"
  }

  public window = window;
  public footer = document.getElementsByTagName("footer")[0]; 

  @Output() closeEvent = new EventEmitter();

  ngAfterContentInit() { }

  collapse(b: boolean, c: HTMLDivElement) {
    if (b) {
      c.style.maxHeight = c.scrollHeight + "px";
    }
    else {
      c.style.maxHeight = null;
    }
  }

  close() {
    this.closeEvent.emit();
  }

}
