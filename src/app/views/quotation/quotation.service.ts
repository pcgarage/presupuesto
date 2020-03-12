import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class QuotationService {

    public subjects = {
        contact: new BehaviorSubject(null),
        budget: new BehaviorSubject(null),
        components: new BehaviorSubject(null),
        date: new BehaviorSubject(null),
        step: new BehaviorSubject(1),
        loading: new BehaviorSubject(false)
    }

    getItem(key: string) {
        this.subjects[key]
    }

    setItem(key: string, value: any) {
        this.subjects[key].next(value);
    }

    removeItem(key: string) {
        this.subjects[key].next(undefined);
    }

    private API_URL = 'https://erp.pcgaragepy.com/api/';

    constructor(private http: HttpClient) { }

    public insert(contact, budget?, components?, date?) {

        var params = new HttpParams().set("contact", JSON.stringify(contact));

        if (budget) params = params.set("budget", budget);
        if (components) params = params.set("components", JSON.stringify(components));
        if (date) params = params.set("date", JSON.stringify(date));

        return this.http.get(this.API_URL + 'method/erpnext.ecommerce.quotation.quotation.insert', {
            params
        })

    }

    public check(token) {

        var params = new HttpParams();

        params = params
            .set("token", token)

        return this.http.get(this.API_URL + 'method/erpnext.ecommerce.quotation.quotation.check', {
            params
        })

    }

    public confirm(token, code) {

        var params = new HttpParams();

        params = params
            .set("token", token)
            .set("code", code);


        return this.http.get(this.API_URL + 'method/erpnext.ecommerce.quotation.quotation.confirm', {
            params
        })

    }

    public resendEmailVerification(token) {

    }

}
