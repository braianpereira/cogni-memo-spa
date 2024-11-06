import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";
import {FormControl, ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {IReminder} from "../views/pages/reminders/reminders.component";

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  baseUrl = GlobalConstants.appURL + '/api';

  constructor(private httpClient: HttpClient) { }

  post(reminder: {}): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/reminders`, reminder, { withCredentials: true })
  }

  put(reminder:IReminder): Observable<any> {
    return this.httpClient
      .put(`${this.baseUrl}/reminders/${reminder.id}`, reminder, { withCredentials: true })
  }

  get(indexes: {today:number, week: number, month: number }): Observable<any> {
    const params = new HttpParams().set('today', indexes.today).set('week', indexes.week).set('month', indexes.month);
    return this.httpClient.get(`${this.baseUrl}/reminders`, { params });
  }
}
