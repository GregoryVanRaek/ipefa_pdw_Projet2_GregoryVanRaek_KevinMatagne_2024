import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent, handleFormError, InputComponent, LoginCardComponent, SimpleButtonComponent } from '@shared/ui';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, NgForOf } from '@angular/common';
import { LabelWithParamPipe } from '@shared/ui/text/pipe/label-with-param.pipe';
import { SignInPayload } from '@shared/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecurityService } from '../../service';
import { FormError } from '@shared/core';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink,
    TranslateModule,
    NgForOf,
    LabelWithParamPipe,
    LoginCardComponent,
    ReactiveFormsModule,
    InputComponent,
    SimpleButtonComponent,
    NgClass,
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent implements OnInit {
  public formGroup: FormGroup<any> = new FormGroup<any>({});
  public errors$: WritableSignal<FormError[]> = signal([]);
  public invalidCredentials$: WritableSignal<boolean> = signal(false); // signal gérant la tentative de connexion
  public loginSucessfull$: WritableSignal<boolean> = signal(false);

  constructor(public securityService: SecurityService, private router :Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup<any>({
      username: new FormControl('', [Validators.required, Validators.minLength(5)],),
      password: new FormControl('', [Validators.required]),
    });

    handleFormError(this.formGroup, this.errors$);

    console.log(this.errors$())
  }

  signIn(): void {
    const value: SignInPayload = this.formGroup.value;
    if (this.formGroup.valid) {
      this.securityService.signIn(value).subscribe({
        next: (response) => {
          if(response.result) {
            this.invalidCredentials$.set(false);
            this.loginSucessfull$.set(true);
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
          else{
            this.invalidCredentials$.set(true);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.invalidCredentials$.set(true);
        },
      });
      }
    }

  // méthode pour récupéré les msg d'erreurs en fonction du controle
  getErrorMessages(controlName: string): string[] {
    return this.errors$()
      .filter((error) => error.control === controlName)
      .map((error) => this.formatErrorMessage(error));
  }

  // formater l'erreur en fonction de son type
  private formatErrorMessage(error: FormError): string {
    switch (error.error) {
      case 'required':
        return `${error.control} is required`;
      case 'minlength':
        return `${error.control} must contains at least ${error.value.requiredLength} character`;
      default:
        return `${error.control} contains an error : ${error.error}`;
    }
  }
}

