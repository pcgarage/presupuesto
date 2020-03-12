import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import * as noUiSlider from 'nouislider';
import { QuotationService } from '../quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation-budget',
  templateUrl: './quotation-budget.component.html',
  styleUrls: ['./quotation-budget.component.css']
})
export class QuotationBudgetComponent implements AfterViewInit {

  @ViewChild("slider") sliderRef: ElementRef;

  slider;

  amount = 1000000;

  game = "APEX";

  constructor(private service: QuotationService, private router: Router) {

    service.setItem("step", 2);

    if (!service.subjects.contact.getValue()) {

      router.navigate(["/"]);

    }

  }

  init(c) { }

  tooltips;

  checkIcon = (values, handle, unencoded, tap, positions) => {
    if (positions[0] > 0) {
      for (var i = 0; i < this.tooltips.length; i++) {
        this.tooltips[i].style.backgroundImage = "url('/assets/img/tiers/" + this.game + "/tier-" + Math.ceil(positions[0] / (100 / 6)) + ".png')";
        this.tooltips[i].style.height = ((((Math.round(values[handle]) - 1000000) / 50000) * (24 / 380)) + 48) + "px";
        this.tooltips[i].style.width = ((((Math.round(values[handle]) - 1000000) / 50000) * (24 / 380)) + 48) + "px";
      }
    }

    this.amount = Math.round(values[handle]);

  }

  ngAfterViewInit() {

    this.slider = this.sliderRef.nativeElement;

    noUiSlider.create(this.slider, {
      start: [1000000],
      connect: 'lower',
      tooltips: true,
      step: 50000,
      range: {
        'min': 1000000,
        'max': 20000000
      },
    });

    this.tooltips = this.slider.getElementsByClassName("noUi-tooltip") as HTMLCollectionOf<HTMLElement>;

    for (var i = 0; i < this.tooltips.length; i++) {

      this.tooltips[i].style.background = "none";
      this.tooltips[i].style.color = "transparent";
      this.tooltips[i].style.border = "none";
      this.tooltips[i].style.backgroundImage = "url('/assets/img/tiers/" + this.game + "/tier-1.png')";
      this.tooltips[i].style.backgroundRepeat = "no-repeat";
      this.tooltips[i].style.backgroundPosition = "center";
      this.tooltips[i].style.backgroundSize = "cover";
      this.tooltips[i].style.height = "48px";
      this.tooltips[i].style.width = "48px";
      this.tooltips[i].style.outline = "none";

    }

    this.slider.noUiSlider.on('slide', this.checkIcon);
    this.slider.noUiSlider.on('update', this.checkIcon);

  }

  labelFocus(event) {
    event.target.style.display = 'none';
    event.target.previousElementSibling.style.visibility = 'visible';
  }

  inputFocusOut(event) {
    event.target.nextElementSibling.style.display = 'block';
    event.target.style.visibility = 'hidden';
  }

  amountChange(amount) {
    this.amount = amount.replace(/\D/g, '');
    this.slider.noUiSlider.set(amount);
  }

  submit() {

    this.service.setItem('budget', this.amount);

    this.router.navigate(["/components"]);

  }

  changeIcon() {
    let value = this.slider.noUiSlider.get();
    this.slider.noUiSlider.set(1050000);
    this.slider.noUiSlider.set(value);
  }

}
