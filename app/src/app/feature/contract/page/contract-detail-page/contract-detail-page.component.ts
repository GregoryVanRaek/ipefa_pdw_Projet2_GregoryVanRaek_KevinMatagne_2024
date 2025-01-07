import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {Calendar} from 'primeng/calendar';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputNumber} from 'primeng/inputnumber';
import {MultiSelect} from 'primeng/multiselect';
import {ProgressBar} from 'primeng/progressbar';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {InputText} from 'primeng/inputtext';
import {ContractService} from '../../service';
import {ActivatedRoute} from '@angular/router';
import {Contract} from '@shared/api/data/model/contract';

@Component({
  selector: 'app-contract-detail-page',
  standalone: true,
  imports: [
    Button,
    Calendar,
    ConfirmDialog,
    FloatLabel,
    InputNumber,
    MultiSelect,
    ProgressBar,
    ReactiveFormsModule,
    Select,
    Toast,
    TranslatePipe,
    InputText
  ],
  templateUrl: './contract-detail-page.component.html',
  styleUrl: './contract-detail-page.component.css'
})
export class ContractDetailPageComponent implements OnInit{
  employeeId :string | null;
  formGroup: FormGroup<any> ;
  perks:string[] = [];
  schedulePercentage :number = 0;
  contract$ :WritableSignal<Contract | null> = signal(null);

  // DI
  contractService :ContractService = inject(ContractService)
  translateService :TranslateService = inject(TranslateService)
  route :ActivatedRoute = inject(ActivatedRoute)

  constructor() {
    this.formGroup = new FormGroup({
      salary : new FormControl('', Validators.required),
      perks : new FormControl('', Validators.required),
      startDate : new FormControl('', Validators.required),
      endDate : new FormControl('', Validators.required),
      contractType : new FormControl('', Validators.required),
      weeklySchedule : new FormControl('', Validators.required),
    })

    this.employeeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(){
    this.perks = this.contractService.perks;
    this.getContract();

    this.formGroup.get('weeklySchedule')?.valueChanges.subscribe((value: number) => {
      this.updateSchedulePercentage(value);
    });

    this.updateSchedulePercentage(38)
  }

  getContract() :void{
    this.contractService.getAll().subscribe({
      next : (response) => {
        const foundContract = response.data.find((c: Contract) => c.employee.employeeId === this.employeeId);
        this.contract$.set(foundContract);
        if (foundContract) {
          this.initFormValue(foundContract);
        }
      }
    })
  }

  getTranslatedPerks(): { label: string; value: string }[] {
    return this.perks.map(perk => ({
      label: this.translateService.instant(`perks.${perk}`),
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

  initFormValue(contract :Contract):void{
    this.formGroup.patchValue({
      salary : contract.salary,
      perks : contract.perks.split(','),
      startDate: new Date(contract.startDate),
      endDate: contract.endDate ? new Date(contract.endDate) : null,
      contractType : contract.contractType,
      weeklySchedule : contract.weeklySchedule
    });

    this.formGroup.get('startDate')?.disable();
    this.formGroup.get('contractType')?.disable();

    console.log(contract)
  }

  update() :void{

  }

}
