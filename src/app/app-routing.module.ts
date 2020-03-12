import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotationComponent } from './views/quotation/quotation.component';
import { QuotationContactComponent } from './views/quotation/quotation-contact/quotation-contact.component';
import { QuotationBudgetComponent } from './views/quotation/quotation-budget/quotation-budget.component';
import { QuotationComponentsComponent } from './views/quotation/quotation-components/quotation-components.component';
import { QuotationSubmitComponent } from './views/quotation/quotation-submit/quotation-submit.component';
import { QuotationConfirmationComponent } from './views/quotation/quotation-confirmation/quotation-confirmation.component';


const routes: Routes = [
  { path: '', component: QuotationComponent, children: [
    {path: '', component: QuotationContactComponent, data: {animation: 'contact'}},
    {path: 'contact', component: QuotationContactComponent, data: {animation: 'contact'}},
    {path: 'budget', component: QuotationBudgetComponent, data: {animation: 'budget'}},
    {path: 'components', component: QuotationComponentsComponent, data: {animation: 'components'}},
    {path: 'submit', component: QuotationSubmitComponent, data: {animation: 'submit'}},
    {path: 'confirmation', component: QuotationConfirmationComponent, data: {animation: 'confirmation'}},
    {path: 'confirmation/:token', component: QuotationConfirmationComponent, data: {animation: 'confirmation'}}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
