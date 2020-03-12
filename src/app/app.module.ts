import localePy from '@angular/common/locales/es-PY'
import { registerLocaleData } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { NgModule, LOCALE_ID } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IndexComponent } from './nav/mobile/index/nav-mobile-index.component';
import { FooterComponent } from './main/footer/footer.component';
import { QuotationComponent } from './views/quotation/quotation.component';
import { QuotationContactComponent } from './views/quotation/quotation-contact/quotation-contact.component';
import { QuotationBudgetComponent } from './views/quotation/quotation-budget/quotation-budget.component';
import { QuotationComponentsComponent } from './views/quotation/quotation-components/quotation-components.component';
import { QuotationSubmitComponent } from './views/quotation/quotation-submit/quotation-submit.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { QuotationConfirmationComponent } from './views/quotation/quotation-confirmation/quotation-confirmation.component';



registerLocaleData(localePy);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    QuotationComponent,
    QuotationContactComponent,
    QuotationBudgetComponent,
    QuotationComponentsComponent,
    QuotationSubmitComponent,
    QuotationConfirmationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSnackBarModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PY' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
