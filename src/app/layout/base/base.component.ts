import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {LoadingComponent} from "../../components/loading/loading.component";
import {MessageComponent} from "../../components/message/message.component";
import {NgIf} from "@angular/common";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingComponent,
    MessageComponent,
    NgIf
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent implements OnInit{
  loadingService = inject(LoadingService);
  isLoading: boolean = false;

  ngOnInit() {
    // this.primengConfig.ripple = true;
    // this.translateService.setDefaultLang('pt-br');

    this.loadingService.isLoading$.subscribe((isLoading) => {
      setTimeout(() => {
        this.isLoading = isLoading;
      });
    });

    // this.primengConfig.setTranslation(ptBr);
  }

}
