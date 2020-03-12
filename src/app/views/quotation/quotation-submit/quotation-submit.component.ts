import { Component, ElementRef, ViewChild } from '@angular/core';

import { QuotationService } from '../quotation.service';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quotation-submit',
  templateUrl: './quotation-submit.component.html',
  styleUrls: ['./quotation-submit.component.css']
})
export class QuotationSubmitComponent {

  @ViewChild("buttonGroup", { static: false }) buttonGroup: MatButtonToggle;

  date: Date;

  startAt = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000);

  datepickerFilter = (d: Date | null): boolean => {

    let minDate: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const day = (d || new Date()).getDay();

    return day !== 0 && d >= minDate;

  }

  constructor(public service: QuotationService, private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog) {

    service.setItem("step", 4);

    /*
    if (!service.subjects.contact.getValue()) {

      router.navigate(["/"])

    } else if (!service.subjects.budget.getValue()) {

      router.navigate(["/budget"])

    }
    */

  }

  resetDate(e: any) {

    this.date = null;

    e.value = null;

    this._snackBar.open("Elegí la urgencia O una fecha.", "Ok", { duration: 1200 });

  }

  resetUrgency(e: any) {

    e.value = null;

    this._snackBar.open("Elegí la urgencia O una fecha.", "Ok", { duration: 1200 });

  }

  submit() {

    if (this.date || this.buttonGroup.value) {

      this.service.setItem("loading", true);

      this.service.setItem("date",
        {
          "date": (this.buttonGroup.value) ? null : moment(this.date).format("YYYY-MM-DD HH-mm-ss.SSSSSS"),
          "urgency": (this.date) ? null : this.buttonGroup.value || null
        }
      );

      this.service.subjects.date.subscribe((date: any) => {
        if (date) {
          this.service.insert(
            this.service.subjects.contact.getValue(),
            this.service.subjects.budget.getValue(),
            this.service.subjects.components.getValue(),
            this.service.subjects.date.getValue()
          ).subscribe((res: any) => {
            this.router.navigate(['/confirmation/' + res.message.token]);
          }, (error: any) => this.service.setItem("loading", false),
            () => this.service.setItem("loading", false))
        }
      })

    } else {

      let dialogRef = this.dialog.open(QuotationSubmitDialog);

    }

  }

}

@Component({ templateUrl: 'quotation-submit.dialog.html' })
export class QuotationSubmitDialog { }

