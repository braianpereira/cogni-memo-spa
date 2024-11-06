import {Component, inject, OnInit, Output} from '@angular/core';
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
  GutterDirective, ListGroupDirective, ListGroupItemDirective, ModalComponent, ModalService,
  RowComponent,
  TabDirective, TableDirective, TabPanelComponent,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TemplateIdDirective,
  TextColorDirective
} from "@coreui/angular";
import { CommonModule } from "@angular/common";
import {RemindersService} from "../../../services/reminders.service";
import {LoadingService} from "../../../services/loading.service";
import {IconDirective} from "@coreui/icons-angular";
import {CreateComponent} from "./components/create/create.component";
import {FormsModule} from "@angular/forms";
// import {MessageService} from "../../../services/message.service";

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
    FormCheckLabelDirective,
    TableDirective,
    IconDirective,
    CreateComponent,
    FormsModule
  ],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss'
})
export class RemindersComponent implements OnInit {
  private remindersService = inject(RemindersService)
  loadingService = inject(LoadingService)
  // private messageService = inject(MessageService)

  loadBy: string = ''
  skip: number = 0

  @Output() saved: boolean = false

  reminders: IReminders = {
    today: {label: '', data: []},
    week: {label: '', data: []},
    month: {label: '', data: []}
  }

  remindersIndex = {
    today: 0,
    week: 0,
    month: 0
  }
  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  month: string = this.months[(new Date()).getMonth()-1];
  week: string = '';
  day: string = '';


  reset(section: string) {
    this.remindersIndex[section as keyof typeof this.remindersIndex] = 0

    this.loadItems()
  }

  plusIndex(section: string) {
    this.remindersIndex[section as keyof typeof this.remindersIndex] = this.remindersIndex[section as keyof typeof this.remindersIndex] + 1

    this.loadItems()
  }

  minusIndex(section: string) {
    this.remindersIndex[section as keyof typeof this.remindersIndex] = this.remindersIndex[section as keyof typeof this.remindersIndex] - 1

    this.loadItems()
  }

  loadItems() {
    this.loadingService.show()

    this.remindersService.get(this.remindersIndex).subscribe({
      next: (reminders) => {
        this.reminders = reminders
        this.loadingService.hide()
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // Handle the error here, such as showing a message to the user or logging it for further investigation
        this.loadingService.hide()
      }
    })
  }

  ngOnInit(): void {
    this.loadItems()
  }

  toggleReminder(reminder: IReminder) {
    console.log(reminder)

    this.loadingService.show()
    this.remindersService.put({...reminder, status: !reminder.status}).subscribe({
      next: (data) => {
        reminder.status = data.status
        this.loadingService.hide()
      }
    })
  }
}

export interface IReminder {
  id: number;
  user_id: number;
  reminder_type_id: number;
  title: string;
  body: string;
  reminder_date: string;
  status: boolean;
  repeat: boolean;
  starts_at: string;
  ends_at: string;
  reference: string;
  created_at: string;
  updated_at: string;
}

export interface IReminders {
  today: {label: string; data: IReminder[]};
  week: {label: string; data: IReminder[]};
  month: {label: string; data: IReminder[]};
}
