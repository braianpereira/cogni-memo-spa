import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IMessage} from "../components/message/message.component";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<IMessage | null>(null);
  message$ = this.messageSubject.asObservable();

  add(m: IMessage) {
    let message: IMessage | null;
    message = m;
    this.messageSubject.next(message);
  }

  clear() {
    this.messageSubject.next(null);
  }
}
