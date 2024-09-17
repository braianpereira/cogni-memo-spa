import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messageSubject.asObservable();

  add(message: string) {
    const messages = this.messageSubject.value;
    messages.push(message);
    this.messageSubject.next(messages);
  }

  clear() {
    this.messageSubject.next([]);
  }
}
