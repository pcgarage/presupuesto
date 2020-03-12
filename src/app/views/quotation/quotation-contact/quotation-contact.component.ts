import { Component, ViewChild, ElementRef, Inject } from '@angular/core';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { QuotationService } from '../quotation.service';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-contact',
  templateUrl: './quotation-contact.component.html',
  styleUrls: ['./quotation-contact.component.css']
})
export class QuotationContactComponent {

  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;

  faTimes = faTimes;
  faCheck = faCheck;

  @ViewChild("name") name: ElementRef;
  @ViewChild("tel") tel: ElementRef;
  @ViewChild("email") email: ElementRef;

  constructor(public service: QuotationService, public dialog: MatDialog, public router: Router) {
    service.setItem("step", 1);
  }

  checkName(name: string) {
    return name.length > 2
  }

  checkTel(tel: string) {
    return /^[\s\W]*(?:[\s\W]*5[\s\W]*9[\s\W]*5)?[\s\W]*0?[\s\W]*9?[\s\W]*[6789][\s\W]*[1-9][\s\W]*(?:[0-9][\s\W]*){6}$/.test(tel);
  }

  checkEmail(email: string) {
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email.toLowerCase());
  }

  submit() {

    if (this.checkName(this.name.nativeElement.value) && this.checkTel(this.tel.nativeElement.value) && this.checkEmail(this.email.nativeElement.value)) {

      let tel = this.tel.nativeElement.value;

      tel = tel.replace(/[\s\W]]*/g, "");

      if (tel.startsWith("595")) tel = tel.substr(3);

      if (tel.charAt(0) == "0") tel = tel.substr(1);

      switch (tel.length) {
        case 8:
          tel = tel.substr(0, 2) + " " + tel.substr(2, 3) + " " + tel.substr(5, 3);
          break;
        case 9:
          tel = tel.substr(1, 2) + " " + tel.substr(3, 3) + " " + tel.substr(6, 3)
          break;
      }

      this.service.setItem('contact',
        {
          name: this.name.nativeElement.value,
          tel: "5959" + tel.replace(/\s/g, ''),
          email: this.email.nativeElement.value
        }
      )

      this.router.navigate(["/budget"])

    } else {
      let dialogRef = this.dialog.open(QuotationContactDialog);
    }
  }

}

@Component({ templateUrl: 'quotation-contact.dialog.html' })
export class QuotationContactDialog { }
