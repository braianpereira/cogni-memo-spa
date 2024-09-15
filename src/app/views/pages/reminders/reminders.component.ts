import {Component, inject, OnInit} from '@angular/core';
import {
  AccordionButtonDirective,
  AccordionComponent,
  AccordionItemComponent,
  BgColorDirective,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardTextDirective,
  ColComponent,
  ContainerComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
  GutterDirective, ListGroupDirective, ListGroupItemDirective,
  RowComponent,
  TabDirective, TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TemplateIdDirective,
  TextColorDirective
} from "@coreui/angular";
import { CommonModule } from "@angular/common";
import {RemindersService} from "../../../services/reminders.service";

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [
    CardBodyComponent,
    CardComponent,
    CardTextDirective,
    ColComponent,
    ContainerComponent,
    RowComponent,
    GutterDirective,
    CommonModule,
    AccordionItemComponent,
    AccordionComponent,
    TemplateIdDirective,
    AccordionButtonDirective,
    BgColorDirective,
    TextColorDirective,
    ButtonGroupComponent,
    ButtonDirective,
    TabsComponent,
    TabsListComponent,
    TabDirective,
    TabsContentComponent,
    TabPanelComponent,
    ListGroupDirective,
    ListGroupItemDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective
  ],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss'
})
export class RemindersComponent implements OnInit {
  private remindersService = inject(RemindersService)
  loadBy: string = ''
  skip: number = 0

  reminders: any[] | undefined


  loadItems(loadBy: string, skip: number) {
    console.log(loadBy)
    this.loadBy = loadBy
    this.skip = skip

    this.remindersService.get(this.loadBy, this.skip).subscribe({
      next: (reminders) => {
        console.log(reminders)
        this.reminders = reminders
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // Handle the error here, such as showing a message to the user or logging it for further investigation
      }
    })
  }

  ngOnInit(): void {
    this.loadItems('today', 0)
  }
}
