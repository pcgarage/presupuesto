import { Component, ViewChild, ElementRef, } from '@angular/core';
import { QuotationService } from './quotation.service';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';


export const slideInAnimation =
  trigger('routeAnimations', [
    transition('contact => budget', slideTo('right')),
    transition('contact => components', slideTo('right')),
    transition('contact => submit', slideTo('right')),
    transition('contact => confirmation', slideTo('right')),

    transition('budget => contact', slideTo('left')),
    transition('budget => components', slideTo('right')),
    transition('budget => submit', slideTo('right')),
    transition('budget => confirmation', slideTo('right')),

    transition('components => contact', slideTo('left')),
    transition('components => budget', slideTo('left')),
    transition('components => submit', slideTo('right')),
    transition('components => confirmation', slideTo('right')),

    transition('submit => contact', slideTo('left')),
    transition('submit => budget', slideTo('left')),
    transition('submit => components', slideTo('left')),
    transition('submit => confirmation', slideTo('right'))
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
        height: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%' })
    ], optional),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%' }))
      ], optional)
    ]),
  ];
}

@Component({
  providers: [QuotationService],
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css'],
  animations: [slideInAnimation]
})
export class QuotationComponent {

  loading: boolean;

  currentStep;

  constructor(service: QuotationService) {
  
    service.subjects.loading.subscribe(loading => {
      this.loading = loading;
    })

    service.subjects.step.subscribe(step => {
      this.currentStep = step;
    })

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
