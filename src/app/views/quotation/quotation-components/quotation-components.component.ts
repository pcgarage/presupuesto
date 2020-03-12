import { Component } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { QuotationService } from '../quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-components',
  templateUrl: './quotation-components.component.html',
  styleUrls: ['./quotation-components.component.css']
})
export class QuotationComponentsComponent {

  faTrash = faTrash;

  components: any = []

  categories = [
    "Cooler CPU (Disipador)",
    "Cooler FAN (Ventilador)",
    "Disco Duro (HDD)",
    "Disco Duro Externo (HDD)",
    "Fuente (PSU)",
    "Gabinete",
    "Memoria RAM",
    "Placa Madre (MB)",
    "Procesador (CPU)",
    "SSD",
    "SSD M.2",
    "Tarjeta Gráfica (GPU)"
  ]

  constructor(private service: QuotationService, private router: Router) {

    service.setItem("step", 3);

    if (!service.subjects.contact.getValue()) {
      router.navigate(["/"])
    } else if (!service.subjects.budget.getValue()) {
      router.navigate(["/budget"])
    }

  }

  add() {
    if (this.components.length < 12) {
      this.components.push({
        category: null,
        description: null
      })
    }
  }

  submit() {

    this.service.setItem('components', this.components);

    this.router.navigate(["/submit"])

  }

}
