import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Employee} from '@shared/api/data/model/employee';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {StaffService} from '../../service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Gender} from '@shared/api/data/enum/gender';
import {UserRoleEnum} from '@shared/api/data/enum/role';
import {DatePicker} from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';
import {Button} from 'primeng/button';
import {ToastService} from '@shared/services';
import {Toast, ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

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
    DatePicker,
    TabsModule,
    Button,
    Toast,
    ToastModule
  ],
  templateUrl: './staff-detail-page.component.html',
  styleUrl: './staff-detail-page.component.css'
})
export class StaffDetailPageComponent implements OnInit {
  employee$:WritableSignal<Employee | null> = signal(null);
  employeeId!:string;
  public staffFormGroup :FormGroup<any> = new FormGroup<any>({});
  loading:boolean = true;
  isEditMode: boolean = false;

  constructor(private route:ActivatedRoute, private service:StaffService, private readonly messageService :MessageService, private translateService :TranslateService) {
    this.staffFormGroup = new FormGroup({
      lastname:new FormControl('', Validators.required),
      firstname:new FormControl('', Validators.required),
      birthdate:new FormControl('', Validators.required),
      mail:new FormControl('', Validators.required),
      phone:new FormControl('', Validators.required),
      iban:new FormControl('', Validators.required),
      gender:new FormControl('', Validators.required),
      role:new FormControl('', Validators.required),
      address:new FormGroup({
        road: new FormControl('', Validators.required),
        nb: new FormControl('', Validators.required),
        cp: new FormControl('', Validators.required),
        town: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        complements: new FormControl('/'),
      })
    })

  }

  ngOnInit(): void {
    this.employeeId = String(this.route.snapshot.paramMap.get('id'));
    this.setFormControlStatus();
    this.getOneById(this.employeeId);
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

  update() :void{
    const employee :Employee = this.staffFormGroup.value;
    employee.employeeId = this.employeeId;

    employee.gender = Gender[employee.gender];
    employee.role = UserRoleEnum[employee.role];

    this.service.updateEmployee(employee).subscribe({
      next : () => {
        const message :string = this.translateService.instant('staff-detail-feature-update-toast-success')
        this.messageService.add({ severity: 'success', summary: message});
      },
      error : (err) => {
        const message :string = this.translateService.instant('staff-detail-feature-update-toast-error') + err.message;
        this.messageService.add({ severity: 'error', summary: message });
      }
    })
  }

}
