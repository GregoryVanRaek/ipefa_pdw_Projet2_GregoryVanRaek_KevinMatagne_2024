import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Employee} from '@shared/api/data/model/employee';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {StaffService} from '../../service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Gender} from '@shared/api/data/enum/gender';
import {UserRoleEnum} from '@shared/api/data/enum/role';
import { TabsModule } from 'primeng/tabs';
import {Button} from 'primeng/button';
import {Toast, ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Calendar} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CanComponentDeactivate, CustomValidators, FormError} from '@shared/core';
import {ContractCreatePageComponent} from '../../../contract';
import {ContractDetailPageComponent} from '../../../contract';
import {Contract} from '@shared/api/data/model/contract';
import {ContractService} from '../../../contract/service';
import {handleFormError} from '@shared/ui';

@Component({
  selector: 'app-staff-detail-page',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    ProgressSpinner,
    TabsModule,
    Button,
    Toast,
    ToastModule,
    Calendar,
    ConfirmDialogModule,
    ContractCreatePageComponent,
    ContractDetailPageComponent,
  ],
  templateUrl: './staff-detail-page.component.html',
  styleUrl: './staff-detail-page.component.css'
})
export class StaffDetailPageComponent implements OnInit, CanComponentDeactivate {
  public staffFormGroup :FormGroup<any>;
  public addressForm :FormGroup<any> = new FormGroup<any>({})

  public errors$: WritableSignal<FormError[]> = signal([]);

  employee$:WritableSignal<Employee | null> = signal(null);
  public employeeId!:string;

  loading:boolean = true;
  isEditMode: boolean = false;
  newContract :boolean = false;
  existingContract$ :WritableSignal<boolean> = signal(false);

  // DI
  private readonly route:ActivatedRoute = inject(ActivatedRoute);
  private readonly router:Router = inject(Router);
  private readonly service:StaffService = inject(StaffService);
  private readonly translateService :TranslateService = inject(TranslateService);
  private readonly messageService :MessageService = inject(MessageService)
  private readonly confirmationService :ConfirmationService = inject(ConfirmationService)
  private readonly contractService :ContractService = inject(ContractService)

  constructor() {
    this.staffFormGroup = new FormGroup({
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
    this.employeeId = String(this.route.snapshot.paramMap.get('id'));
    this.setFormControlStatus();
    this.getOneById(this.employeeId);
    this.checkExistingContract();

    this.addressForm = this.staffFormGroup.get('address') as FormGroup
    handleFormError(this.staffFormGroup, this.errors$);
    handleFormError(this.addressForm, this.errors$);
  }

  getOneById(id:string):void{
    this.service.getEmployeeById(id).subscribe({
      next : (response => {
        const employee = response.data as Employee;
        this.employee$.set(employee);
        this.initFormValue(employee);
        this.loading = false;
      }),
      error : (err :Error) => {
        this.loading = false;
      }
    })
  }

  initFormValue(employee:Employee){
    this.staffFormGroup.patchValue({
      lastname:employee.lastname,
      firstname:employee.firstname,
      birthdate:new Date(employee.birthdate),
      mail:employee.mail,
      phone:employee.phone,
      iban:employee.iban,
      gender:Gender[employee.gender],
      role:UserRoleEnum[employee.role],
      address:{...employee.address},
    })
  }

  onEditClick() {
    this.isEditMode = !this.isEditMode;
    this.setFormControlStatus();
    this.getOneById(this.employeeId);
  }

  setFormControlStatus() {
    Object.keys(this.staffFormGroup.controls).forEach(field => {
      const control = this.staffFormGroup.get(field);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(subField => {
          const subcontrol = control.get(subField);
          !this.isEditMode ? subcontrol?.disable() : subcontrol?.enable() ;
        });
      } else {
        !this.isEditMode ? control?.disable() : control?.enable();
      }
    });
  }

  checkExistingContract():void{
    this.contractService.getAll().subscribe({
      next : (response) => {
        const foundContract = response.data.find((c: Contract) => c.employee.employeeId === this.employeeId);
        if (foundContract) {
          this.existingContract$.set(true);
        }
        else{
          this.existingContract$.set(false);
          this.newContract = false;
        }
      }
    })
  }

  update() :void{
    let message :string;
    const employee :Employee = this.staffFormGroup.value;
    employee.employeeId = this.employeeId;
    employee.gender = Gender[employee.gender];
    employee.role = UserRoleEnum[employee.role];

    if(this.staffFormGroup.valid){
      this.service.updateEmployee(employee).subscribe({
        next : (response) => {
          if(response.result){
            message = this.translateService.instant('staff-detail-feature-update-toast-success')
            this.messageService.add({ severity: 'success', summary: message});
            this.onEditClick();
          }
          else{
            const message :string = this.translateService.instant('staff-detail-feature-update-toast-error') + ": \n" +  response.errors;
            this.messageService.add({ severity: 'error', summary: message});
          }
        },
        error : (err) => {
          message = this.translateService.instant('staff-detail-feature-update-toast-error') + err.message;
          this.messageService.add({ severity: 'error', summary: message });
        },
      })
    }
    else{
      message = this.translateService.instant('form-validation-all-field-must-be-completed')
      this.messageService.add({ severity: 'error', summary: message});
    }
  }

  delete(): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('staff-detail-feature-delete-confirmation'),
      header: this.translateService.instant('staff-detail-feature-delete-confirmation-header'),
      acceptLabel: this.translateService.instant('btn-confirm'),
      rejectLabel: this.translateService.instant('btn-cancel'),
      icon : "pi pi-exclamation-triangle",
      acceptButtonStyleClass: 'p-button-secondary',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.service.deleteEmployee(this.employeeId).subscribe({
          next: () => {
            const successMessage = this.translateService.instant('staff-detail-feature-delete-toast-success');
            this.messageService.add({ severity: 'success', summary: successMessage });
            this.router.navigate(['/staff']);
          },
          error: (err) => {
            const errorMessage = this.translateService.instant('staff-detail-feature-delete-toast-error') + err.message;
            this.messageService.add({ severity: 'error', summary: errorMessage });
          }
        });
      },
      reject: () => {
        const rejectMessage = this.translateService.instant('staff-detail-feature-delete-toast-cancel');
        this.messageService.add({ severity: 'info', summary: rejectMessage });
      }
    });
  }

  canDeactivate(): boolean | Promise<boolean> {
    if (this.staffFormGroup.dirty) {
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

  newContractOnClick(){
    this.newContract = !this.newContract;
  }

  createdContract(){
    this.newContract = false;
    this.checkExistingContract();
  }

  deletedContract(){
    this.newContract = true;
    this.checkExistingContract();
  }

  getErrorMessages(controlName: string): string[] {
    return this.errors$()
      .filter((error) => error.control === controlName)
      .map((error) => this.formatErrorMessage(error));
  }

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
