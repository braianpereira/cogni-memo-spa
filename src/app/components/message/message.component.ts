import {Component, inject, OnInit, ViewChild} from '@angular/core';

import { ButtonDirective, ToasterComponent, ToasterPlacement } from '@coreui/angular';
import {AppToastComponent} from "../toastee/toast.component";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
  imports: [ToasterComponent, ButtonDirective]
})
export class MessageComponent implements OnInit {
  messageService = inject(MessageService);

  placement = ToasterPlacement.TopEnd;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor() { }

  ngOnInit() {
    this.messageService.message$.subscribe({
      next: m => {
        if (m)
          this.addToast(m)
      }
    });
  }

  addToast(message: IMessage) {
    const options = {
      title: message.summary,
      delay: 5000,
      placement: this.placement,
      color: message.severity,
      autohide: true,
      detail: message.detail,
    };
    const componentRef = this.toaster.addToast(AppToastComponent, { ...options });
  }
}

export interface IMessage {
  severity: 'info'|'danger'|'warning'|'secondary'|'success'|'primary',
  summary?: string,
  detail: string
}
