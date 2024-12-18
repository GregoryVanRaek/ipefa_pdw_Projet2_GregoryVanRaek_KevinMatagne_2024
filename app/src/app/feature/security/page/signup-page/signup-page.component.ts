import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SecurityService } from '../../service';
import { SignupPayload } from '@shared/api';
import { FormError, handleFormError } from '@shared/ui';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppNode } from '../../../../common';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    NgClass,
    RouterLink,
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  public formGroup: FormGroup<any> = new FormGroup({});
  public errors$: WritableSignal<FormError[]> = signal([]);
  public registerSuccess$ : WritableSignal<boolean> = signal(false)

  constructor(
    private securityService: SecurityService,
    private translate: TranslateService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup<any>(
      {
        username: new FormControl('', [Validators.required, Validators.minLength(5), this.nonEmptyValidator()]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, this.strongPasswordValidator()]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.checkPassword }
    );

    handleFormError(this.formGroup, this.errors$);
  }

  private checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  passwordMismatch(): boolean {
    return this.formGroup.errors?.['passwordMismatch'] && this.formGroup.get('confirmPassword')?.touched;
  }

  register(): void {
    if (this.formGroup.valid) {
      const payload: SignupPayload = this.formGroup.value;
      this.securityService.signUp(payload).subscribe({
        next: () => {
          this.registerSuccess$.set(true);
          setTimeout(() => {
            this.router.navigate([`${AppNode.PUBLIC}/${AppNode.SIGN_IN}`]).then()
          }, 3000)
        },
      });
    }
  }

  getErrorMessages(controlName: string): string[] {
    return this.errors$()
      .filter((error) => error.control === controlName)
      .map((error) => this.formatErrorMessage(error));
  }

  // translate.instant => voir https://angular-translate.github.io/docs/#/api/pascalprecht.translate.$translate#methods_instant
  private formatErrorMessage(error: FormError): string {
    switch (error.error) {
      case 'required':
        return this.translate.instant(`security-feature.sign-up-page.error.${error.control}-required`);
      case 'minlength':
        return this.translate.instant(`security-feature.sign-up-page.error.${error.control}-minlength`, {
          requiredLength: error.value.requiredLength,
        });
      case 'email':
        return this.translate.instant(`security-feature.sign-up-page.error.mail-invalid`);
      case 'passwordMismatch':
        return this.translate.instant('security-feature.sign-up-page.error.password-mismatch');
      case 'nonEmpty':
        return this.translate.instant('security-feature.sign-up-page.error.nonEmpty', { field: error.control });
      case 'strongPassword':
        return this.translate.instant('security-feature.sign-up-page.error.password-weak');
      default:
        return this.translate.instant(`security-feature.sign-up-page.error.generic`, { field: error.control });
    }
  }

  nonEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      return value.trim().length < 3 ? { nonEmpty: true } : null;
    };
  }

  strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // 8 cara + 1 maj + 1min + 1 numero + 1 caract spécial

      return strongPasswordRegex.test(value)
        ? null
        : { strongPassword: true };
    };
  }

}
