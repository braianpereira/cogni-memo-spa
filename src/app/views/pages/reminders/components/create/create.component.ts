import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  ButtonCloseDirective,
  ButtonDirective, ColComponent, ColDirective,
  FormControlDirective, FormDirective,
  FormFloatingDirective,
  FormLabelDirective,
  FormSelectDirective,
  InputGroupComponent, InputGroupTextDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective, RowComponent
} from "@coreui/angular";
import {cilPlus} from "@coreui/icons";
import {IconDirective} from "@coreui/icons-angular";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RemindersService} from "../../../../../services/reminders.service";
import {LoadingService} from "../../../../../services/loading.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AuthService} from "../../../../../auth/auth.service";
import {ReminderTypesService} from "../../../../../services/reminder_types.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {getUTC3Date} from '@utils/dateUtils'

@Component({
  selector: 'app-create-reminder',
  standalone: true,
  imports: [
    ButtonDirective,
    IconDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalToggleDirective,
    FormFloatingDirective,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    InputGroupComponent,
    FormSelectDirective,
    InputGroupTextDirective,
    NgForOf,
    FormDirective,
    NgIf,
    NgClass,
    RowComponent,
    ColDirective,
    ColComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  reminderService = inject(RemindersService)
  reminderTypesService = inject(ReminderTypesService)
  loadingService = inject(LoadingService)
  authService = inject(AuthService)

  @Output() tarefaCriada = new EventEmitter<void>();

  visible: boolean = false

  types: IReminderType[] | undefined

  today = getUTC3Date().toISOString().split('T')[0]

  fb = inject(FormBuilder)

  protected form = this.fb.group({
    title: new FormControl('', [Validators.required]),
    reminder_date: new FormControl(this.today, [Validators.required]),
    reminder_type_id: new FormControl(1, [Validators.required]),
    body: new FormControl('', []),
    repeat: new FormControl(false)
  })

  openModal() {
    this.visible = true
  }

  closeModal() {
    this.visible = false
  }

  init() {
  this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      reminder_date: new FormControl(this.today, [Validators.required]),
      reminder_type_id: new FormControl(1, [Validators.required]),
      body: new FormControl('', []),
      repeat: new FormControl(false)
    })
  }

  ngOnInit() {
    this.loadingService.show()

    this.init()

    this.reminderTypesService.get().subscribe({
      next: data => {
        this.types = data
        this.loadingService.hide()
      }
    })
  }

  onSubmit() {
    // this.loadingService.show()

    this.form?.markAllAsTouched()

    if (this.form?.valid) {
      let reminder = this.form.value;
      this.authService.getCsrfToken().subscribe({
        next: () => {
          this.reminderService.post(reminder).subscribe({
            next: (data) => {
              console.log(data)
              this.loadingService.hide()
              this.tarefaCriada.emit();
              this.closeModal()
            },
            error: error => {
              console.log(error)
            }
          })
        }
      })
    }
  }

  handleModalChange($event: boolean) {
    if (!$event) {
      this.init()
    }
  }
}

export interface IReminderType {
  id: number;
  user_id: number;
  name: string;
}
