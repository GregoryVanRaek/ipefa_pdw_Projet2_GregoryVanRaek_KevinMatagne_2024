import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {Employee} from '@shared/api/data/model/employee';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {StaffService} from '../../service';
import {TranslatePipe} from '@ngx-translate/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Gender} from '@shared/api/data/enum/gender';
import {UserRoleEnum} from '@shared/api/data/enum/role';
import {Address} from '@shared/api/data/model/address';
import {Contract} from '@shared/api/data/model/contract';
import {DatePicker} from 'primeng/datepicker';
import { TabsModule } from 'primeng/tabs';

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
    TabsModule
  ],
  templateUrl: './staff-detail-page.component.html',
  styleUrl: './staff-detail-page.component.css'
})
export class StaffDetailPageComponent implements OnInit {
  employee$:WritableSignal<Employee | null> = signal(null);
  employeeId:string = "";
  public formGroup :FormGroup<any> = new FormGroup<any>({});
  loading:boolean = true;

  constructor(private route:ActivatedRoute, private service:StaffService) {
    this.formGroup = new FormGroup({
      lastname:new FormControl('', Validators.required),
      firstname:new FormControl('', Validators.required),
      birthdate:new FormControl('', Validators.required),
      mail:new FormControl('', Validators.required),
      phone:new FormControl('', Validators.required),
      iban:new FormControl('', Validators.required),
      gender:new FormControl('', Validators.required),
      role:new FormControl('', Validators.required),
      address:new FormControl('', Validators.required),
      contract:new FormControl('', Validators.required),
    })

  }

  ngOnInit(): void {
    this.employeeId = String(this.route.snapshot.paramMap.get('id'));
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
        console.log(err);
        this.loading = false;
      }
    })
  }

  initFormValue(employee:Employee){
    this.formGroup.patchValue({
      lastname:employee.lastname,
      firstname:employee.firstname,
      birthdate:new Date(employee.birthdate),
      mail:employee.mail,
      phone:employee.phone,
      iban:employee.iban,
      gender:Gender[employee.gender],
      role:UserRoleEnum[employee.role],
      address:employee.address,
      contract:employee.contract,
    })
  }

}
