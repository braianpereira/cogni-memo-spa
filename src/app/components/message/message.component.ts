import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: string[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.messages$.subscribe((messages: string[]) => {
      this.messages = messages;
    });
  }
}
