import { Component, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';


import * as $ from 'jquery'
import { QuotationService } from '../quotation.service';

@Component({
  selector: 'app-quotation-confirmation',
  templateUrl: './quotation-confirmation.component.html',
  styleUrls: ['./quotation-confirmation.component.css']
})
export class QuotationConfirmationComponent {

  token;
  code;

  success: boolean = false;

  error_text: string;

  @ViewChild('code_digits', { static: false })
  code_digits: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private service: QuotationService) {

    service.setItem("step", 0);

    this.token = this.activatedRoute.snapshot.paramMap.get('token');

    if (this.token) {

      service.check(this.token).subscribe((res: any) => {

        if (!res.message.error) {

          this.activatedRoute.queryParams.subscribe(params => {

            this.code = params['code'];

            if (this.code) {
              let digits = this.code.split('');
              $(this.code_digits.nativeElement).find('input').each((i, e) => {
                e.value = digits[i] || "";
              })
              this.submit();
            }

          });

        } else {

          switch (res.message.error.code) {

            case '3':
              this.success = true;
              break;

            default:
              return

          }

        }

      })

    }
    
  }

  submit() {

    this.code = "";

    this.error_text = null;

    let submit: boolean = true;

    this.service.setItem("loading", true);

    $(this.code_digits.nativeElement).find('input').each((i, e) => {
      if (!e.value) {
        this.error_text = "Favor insertar todo el código!";
        $(e).addClass("required");
        submit = false;
      } else if (submit) {
        this.code += e.value;
      }
    })

    if (!submit) {
      this.service.setItem("loading", false);
      return
    }

    this.service.confirm(this.token, this.code).subscribe((res: any) => {

      if (!res.message.error) {

        this.success = true;

      } else {

        switch (res.message.error_code) {

          default:
            this.error_text = res.message.message;

        }

      }

    }, (error) => {
      this.error_text = error;
      return false;
    },

      () => this.service.setItem("loading", false))

  }

  resendEmail() {
    /*
        this.service.resendEmailVerification(this.id).subscribe((res: any) => {
    
          if (!res.message.error) {
    
          } else {
    
            switch (res.message.error_code) {
              default:
                return
            }
    
          }
    
        })
    */
  }

  onInput(e) {

    var key = Number(e.data),
      sib = $(e.srcElement.nextElementSibling);

    if (isNaN(key) || e.data === null) {
      e.preventDefault();
      $(e.target).val(null);
      return
    }

    if (!sib || !sib.length) {
      sib = $(this.code_digits.nativeElement).find('input').eq(0);
    }

    $(e.target).val(e.data);
    $(e.target).removeClass("required");
    sib.select().focus();
    e.preventDefault();
    return true;

  }

  onKeyDown(e) {

    var sib = $(e.srcElement.nextElementSibling);

    if (e.which == 9) {
      sib.select().focus();
      e.preventDefault();
      return true;
    }

    if (e.shiftKey) {
      e.preventDefault();
      return false;
    }

    return false;

  }

  onFocus(e) {
    $(e.target).select();
  }

}
