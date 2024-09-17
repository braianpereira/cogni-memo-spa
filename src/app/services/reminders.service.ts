import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
  baseUrl = GlobalConstants.appURL + '/api';

  constructor(private httpClient: HttpClient) { }


  get(loadBy: string, skip: number): Observable<any> {
    const params = new HttpParams().set('loadBy', loadBy).set('skip', skip);
    return this.httpClient.get(`${this.baseUrl}/reminders`, { params });
  }
}
