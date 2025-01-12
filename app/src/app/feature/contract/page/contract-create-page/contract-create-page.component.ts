import {Component, EventEmitter, inject, Input, Output, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FloatLabel} from 'primeng/floatlabel';
import {Calendar} from 'primeng/calendar';
import {InputNumber} from 'primeng/inputnumber';
import {MultiSelect} from 'primeng/multiselect';
import {Select} from 'primeng/select';
import {ProgressBar} from 'primeng/progressbar';
import {ContractService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {StaffService} from '../../../staff/service';
import {FormError} from '@shared/core';
import {handleFormError} from '@shared/ui';


@Component({
  selector: 'app-contract-create-page',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    Button,
    TranslatePipe,
    FloatLabel,
    Calendar,
    InputNumber,
    MultiSelect,
    Select,
    ProgressBar,
    ConfirmDialog,
    Toast,

  ],
  templateUrl: './contract-create-page.component.html',
  styleUrl: './contract-create-page.component.css'
})
export class ContractCreatePageComponent {
  @Input({required:true}) employeeId!:string;
  @Output() contractCreated :EventEmitter<boolean> = new EventEmitter<boolean>();
  public errors$: WritableSignal<FormError[]> = signal([]);
  formGroup :FormGroup<any> = new FormGroup({});
  perks:string[] = [];
  contracts:string[] = [];
  schedulePercentage :number = 0;

  // DI
  private readonly translateService:TranslateService = inject(TranslateService);
  private readonly contractService :ContractService = inject(ContractService);
  private readonly messageService :MessageService = inject(MessageService);
  private readonly staffService :StaffService = inject(StaffService);
  private readonly router :Router = inject(Router);

  constructor() {
    this.formGroup = new FormGroup({
      salary : new FormControl('', [Validators.required, Validators.min(0)]),
      perks : new FormControl(null),
      startDate : new FormControl(new Date(), Validators.required),
      endDate : new FormControl(null),
      contractType : new FormControl('', Validators.required),
      weeklySchedule : new FormControl(38, Validators.required),
    });

    this.perks = this.contractService.perks;
    this.contracts = this.contractService.contracts;

    this.formGroup.get('weeklySchedule')?.valueChanges.subscribe((value: number) => {
      this.updateSchedulePercentage(value);
    });
    this.updateSchedulePercentage(this.formGroup.get('weeklySchedule')?.value || 38);
    handleFormError(this.formGroup, this.errors$);
  }

  create() :void{
    const contract = this.formGroup.value;
    let message:string;

    if(contract.perks !== null){
     contract.perks =  contract.perks.map((perk: { label: string; value: string }) => perk.value).join(',');
    }

    contract.contractType = contract.contractType.value;

    contract.employee = this.staffService.getEmployeeById(this.employeeId).subscribe({
      next : (employee) => {
        contract.employee = employee.data
        this.contractService.create(contract).subscribe({
          next : () => {
            message = this.translateService.instant('contract-create-feature-success')
            this.messageService.add({ severity: 'success', summary: message});
            this.contractCreated.emit(true);
          },
          error : (err) => {
            message = this.translateService.instant('contract-create-feature-error') + err;
            this.messageService.add({ severity: 'error', summary: message});
          }
        })
      },
      error : (err) => {
        message = this.translateService.instant('contract-create-feature-error') + err;
        this.messageService.add({severity : 'error', summary : message})
      }
    });
  }

  getTranslatedPerks(): { label: string; value: string }[] {
    return this.perks.map(perk => ({
      label: this.translateService.instant(`perks.${perk}`),
      value: perk
    }));
  }

  getTranslatedContracts(): { label: string; value: string }[] {
    return this.contracts.map(perk => ({
      label: this.translateService.instant(`contract.${perk}`),
      value: perk
    }));
  }

  updateSchedulePercentage(value: number): void {
    if(value == 38){
      this.schedulePercentage = 100;
    }
    else{
      this.schedulePercentage = Math.round((value / 38) * 100);
    }
  }

  getProgressBarColor(): string {
    const weeklySchedule = this.formGroup.get('weeklySchedule')?.value || 0;
    if (weeklySchedule < 38) {
      return 'gray';
    } else if (weeklySchedule === 38) {
      return 'green';
    } else if (weeklySchedule === 39) {
      return 'orange';
    } else{
      return 'red';
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
      default:
        return `${error.control} contains an error : ${error.error}`;
    }
  }

}
