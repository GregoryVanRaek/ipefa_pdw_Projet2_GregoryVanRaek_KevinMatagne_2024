import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {Calendar} from 'primeng/calendar';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Toast} from 'primeng/toast';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CanComponentDeactivate, CustomValidators, FormError} from '@shared/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StaffService} from '../../service';
import {Gender} from '@shared/api/data/enum/gender';
import {Select} from 'primeng/select';
import {Employee} from '@shared/api/data/model/employee';
import {UserRoleEnum} from '@shared/api/data/enum/role';
import {handleFormError} from '@shared/ui';
import {add} from 'lodash';

@Component({
  selector: 'app-staff-create-page',
  standalone: true,
  imports: [
    Button,
    Calendar,
    ConfirmDialog,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    RouterLink,
    Toast,
    TranslatePipe,
    Select
  ],
  templateUrl: './staff-create-page.component.html',
  styleUrl: './staff-create-page.component.css'
})
export class StaffCreatePageComponent implements CanComponentDeactivate, OnInit {
  formGroup :FormGroup<any> = new FormGroup<any>({})
  addressForm :FormGroup<any> = new FormGroup<any>({})
  public errors$: WritableSignal<FormError[]> = signal([]);

  isNavigating :boolean = false;

  public genders: { label: string; value: any }[] = [
    { label: 'Male', value: Gender.Male },
    { label: 'Female', value: Gender.Female },
    { label: 'Other', value: Gender.Other }
  ];
  public roles: { label: string; value: any }[] = [
    { label: 'Admin', value: Gender.Male },
    { label: 'Manager', value: Gender.Female },
    { label: 'Employee', value: Gender.Other }
  ];

  // DI
  private readonly service :StaffService = inject(StaffService);
  private readonly router :Router = inject(Router);
  private readonly translateService :TranslateService = inject(TranslateService);
  private readonly confirmationService :ConfirmationService = inject(ConfirmationService);
  private readonly messageService :MessageService = inject(MessageService);

  constructor() {
    this.formGroup = new FormGroup({
      lastname:new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
      firstname:new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
      birthdate:new FormControl('', [Validators.required, CustomValidators.noFutureDateValidator()]),
      mail:new FormControl('', [Validators.required, Validators.email]),
      phone:new FormControl('', [Validators.required, CustomValidators.onlyNumbersValidator()]),
      iban:new FormControl('', [Validators.required, CustomValidators.ibanValidator()]),
      gender:new FormControl('', Validators.required),
      role:new FormControl('', Validators.required),
      address:new FormGroup({
        road: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        nb: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        cp: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        town: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        country: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        complements: new FormControl('/'),
      })
    })
  }

  ngOnInit(): void {
    this.addressForm = this.formGroup.get('address') as FormGroup
    handleFormError(this.formGroup, this.errors$);
    handleFormError(this.addressForm, this.errors$);
  }

  // implement guard to be sure that the user doesn't quit de page without saving data
  canDeactivate(): boolean | Promise<boolean> {
    if (this.formGroup.dirty && !this.isNavigating) {
      return new Promise((resolve) => {
        this.confirmationService.confirm({
          message: this.translateService.instant('staff-feature-candeactivate-message'),
          header: this.translateService.instant('staff-feature-create-title'),
          acceptLabel: this.translateService.instant('btn-confirm'),
          rejectLabel: this.translateService.instant('btn-cancel'),
          icon : "pi pi-exclamation-triangle",
          acceptButtonStyleClass: 'p-button-secondary',
          rejectButtonStyleClass: 'p-button-danger',
          accept: () => {
            resolve(true);
          },
          reject: () => {
            resolve(false);
          }
        });
      })
    }
    return true;
  }

  create() :void{
    if(this.formGroup.valid){
      const employee :Employee = this.formGroup.value;
      employee.gender = employee.gender.value;
      employee.role = UserRoleEnum[employee.role];

      this.service.createEmployee(employee).subscribe({
        next:(response) => {
          if(response.result){
            const message :string = this.translateService.instant('staff-feature-create-confirmation')
            this.messageService.add({ severity: 'success', summary: message});

            this.isNavigating = true;
            setTimeout(() => {
              this.router.navigate(['/staff']);
            }, 1000);
          }
          else{
            const message :string = this.translateService.instant('staff-feature-create-error') + response.errors;
            this.messageService.add({ severity: 'error', summary: message});
          }
        },
        error : (err) => {
          const message :string = this.translateService.instant('staff-feature-create-error') + err;
          this.messageService.add({ severity: 'error', summary: message});
        }
      })
    }
  }

  getErrorMessages(controlName: string): string[] {
    return this.errors$()
      .filter((error) => error.control === controlName)
      .map((error) => this.formatErrorMessage(error));
  }

  // formater l'erreur en fonction de son type
  private formatErrorMessage(error: FormError): string {
    switch (error.error) {
      case 'required':
        return `${this.translateService.instant('error-field-is-required')}`;
      case 'minlength':
        return `${error.control} must contains at least ${error.value.requiredLength} character`;
      case 'email' :
        return `${this.translateService.instant('error-email')}`;
      case 'nonEmpty' :
        return `${this.translateService.instant('error-field-non-empty')}`;
      case 'onlyNumbers':
        return `${this.translateService.instant('error-only-number')}`;
      case 'iban':
        return `${this.translateService.instant('error-iban')}`;
      case 'noFutureDate':
        return `${this.translateService.instant('error-date-in-futur')}`;
      default:
        return `${error.control} contains an error : ${error.error}`;
    }
  }
}
