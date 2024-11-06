import {Component, inject, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import {MessageComponent} from "../../components/message/message.component";
import {LoadingComponent} from "../../components/loading/loading.component";
import {LoadingService} from "../../services/loading.service";
import {NgIf, NgStyle} from "@angular/common";

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    MessageComponent,
    LoadingComponent,
    NgIf,
    NgStyle
  ]
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;

  // primeConfig = inject(PrimeNGConfig)
  sidebarNavStyles = {
    '--cui-sidebar-nav-link-icon-font-size': '0.75rem',
    '--cui-sidebar-nav-link-icon-width': '0.75rem',
    '--cui-sidebar-nav-link-icon-height': '0.75rem',
    '--cui-nav-link-font-size': '0.75rem',
  };

  ngOnInit() {
    // this.primengConfig.ripple = true;
    // this.translateService.setDefaultLang('pt-br');

    // this.primengConfig.setTranslation(ptBr);
  }


  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
