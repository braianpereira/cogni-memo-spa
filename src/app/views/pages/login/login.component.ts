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
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, FormsModule, RouterLink, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, NgIf, NgClass]
})
export class LoginComponent implements OnInit{

  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder)

  protected loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(true)
  })

  validation: unknown;

  ngOnInit() {

  }

  email(){
    return this.loginForm !== undefined ? this.loginForm.get('email') : null;
  }

  onSubmit(){
    this.loginForm.markAllAsTouched()
    if(this.loginForm?.valid){
      this.authService.getCsrfToken().subscribe({
        next: () => {
            this.authService.login(this.loginForm?.value)
              .subscribe({
                next: (data: any) => {
                  if(this.authService.isLoggedIn()){
                    this.router.navigate(['/dashboard']);
                  }
                },
                error: error => {
                  console.log(error.status)
                  if (error instanceof HttpErrorResponse) {
                    if (error.status === 422) {
                      const serverErrors = error.error.errors;
                      this.handleServerErrors(serverErrors);
                      // this.messageService.add({
                      //   severity: 'error',
                      //   summary: 'Falha ao gravar',
                      //   detail: error.error.message
                      // });
                    }

                    if (error.error.error) {
                      // this.messageService.add({
                      //   severity: 'error',
                      //   summary: 'Falha ao gravar',
                      //   detail: error.error.error
                      // });
                    }
                  } else {
                    console.log('An error occurred:', error);
                    // this.messageService.add({
                    //   severity: 'error',
                    //   summary: 'Falha ao gravar',
                    //   detail: 'Ocorreu um erro ao processar a solicitação.'
                    // });
                  }
                }
              });
        },

      });
    }
  }

  handleServerErrors(errors: any): void {
    // this.formFieldsS = formFields

    for (const controlName in errors) {
      if (errors.hasOwnProperty(controlName)) {
        const control = this.loginForm.get(controlName);
        console.log(errors, errors[controlName])
        if (control) {
          control.setErrors({ serverError: errors[controlName] });
        }
      }
    }

    //this.focusOnFirstError();
  }

  // focusOnFirstError(): void {
  //   for (const element of this.formFieldsS) {
  //     const errors = this.formulario.get(element.nativeElement.id)?.errors;
  //     if (errors) {
  //       if (
  //         this.formulario.get(element.nativeElement.id)?.enabled &&
  //         element.nativeElement.offsetParent !== null &&
  //         !element.nativeElement.disabled
  //       ) {
  //         this.renderer2.selectRootElement(element.nativeElement).focus();
  //         break;
  //       }
  //     }
  //   }
  // }

}
