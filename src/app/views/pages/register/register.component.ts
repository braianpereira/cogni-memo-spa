import {Component, inject} from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormSelectDirective
} from '@coreui/angular';
import {AuthService} from "../../../auth/auth.service";
import {MessageService} from "../../../services/message.service";
import {Router, RouterLink} from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageComponent} from "../../../components/message/message.component";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, ReactiveFormsModule, FormsModule, NgIf, NgClass, FormSelectDirective, RouterLink, MessageComponent]
})
export class RegisterComponent {

  authService = inject(AuthService);
  messageService = inject(MessageService)
  router = inject(Router);
  fb = inject(FormBuilder)

  constructor() { }

  form = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$')
    ]),
    password_confirmation: new FormControl('', [Validators.required, this.matchPasswordValidator()] ),
    user_type: new FormControl('user', [
      Validators.required,
    ]),
  })

  matchPasswordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.form?.get('password')?.value as string;
      const confirmPassword = control.value;

      return (password?.length < 8 || confirmPassword.length < 8) || (password === confirmPassword) ? null : { passwordMismatch: true };
    };
  }

  submit() {
    this.form.markAllAsTouched()

    if (this.form.valid) {
      this.authService.getCsrfToken().subscribe({
        next: () => {
          this.authService.register(this.form?.value)
            .subscribe({
              next: () => {
                if(this.authService.isLoggedIn()){
                  this.router.navigate(['/dashboard']);
                }
              },
              error: error => {
                if (error instanceof HttpErrorResponse) {
                  if (error.status === 422) {
                    const serverErrors = error.error.errors;

                    this.messageService.add({
                      severity: 'danger',
                      detail: error.error.message,
                      summary: 'Falha ao gravar',
                    })

                    this.handleServerErrors(serverErrors);
                  }

                  if (error.error.error) {
                    this.messageService.add({
                      severity: 'danger',
                      summary: 'Falha ao gravar',
                      detail: error.error.error
                    });
                  }
                } else {
                  console.log('An error occurred:', error);
                  this.messageService.add({
                    severity: 'danger',
                    summary: 'Falha ao gravar',
                    detail: 'Ocorreu um erro ao processar a solicitação.'
                  });
                }
              }
            });
        },

      });
    } else {
      console.log('Formulário inválido');
      console.log(this.form)
    }
  }

  handleServerErrors(errors: any): void {

    for (const controlName in errors) {
      if (errors.hasOwnProperty(controlName)) {
        const control = this.form.get(controlName);
        if (control) {
          control.setErrors({ serverError: errors[controlName] });
        }
      }
    }
  }

  tt() {
    console.log(this.form)
  }
}
