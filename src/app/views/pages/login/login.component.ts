import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective
} from '@coreui/angular';
import {AuthService} from "../../../auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageComponent} from "../../../components/message/message.component";
import {MessageService} from "../../../services/message.service";
import {LoadingService} from "../../../services/loading.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, FormsModule, RouterLink, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, NgIf, NgClass, MessageComponent]
})
export class LoginComponent implements OnInit{

  authService = inject(AuthService);
  messageService = inject(MessageService)
  loadingService = inject(LoadingService)
  router = inject(Router);
  fb = inject(FormBuilder)

  protected loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(true)
  })

  validation: unknown;

  ngOnInit() {
    this.loadingService.hide()
  }

  email(){
    return this.loginForm !== undefined ? this.loginForm.get('email') : null;
  }

  onSubmit(){
    this.loadingService.show()

    this.loginForm.markAllAsTouched()

    if(this.loginForm?.valid){
      this.authService.getCsrfToken().subscribe({
        next: () => {
          this.authService.login(this.loginForm?.value)
            .subscribe({
              next: () => {
                if(this.authService.isLoggedIn()){
                  this.loadingService.hide()
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

                this.loadingService.hide()
              }
            });
        },
      });
    }
  }

  handleServerErrors(errors: any): void {

    for (const controlName in errors) {
      if (errors.hasOwnProperty(controlName)) {
        const control = this.loginForm.get(controlName);
        if (control) {
          control.setErrors({ serverError: errors[controlName] });
        }
      }
    }
  }
}
