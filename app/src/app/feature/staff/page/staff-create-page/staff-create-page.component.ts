import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {Calendar} from 'primeng/calendar';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Toast} from 'primeng/toast';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CanComponentDeactivate} from '@shared/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StaffService} from '../../service';
import {Gender} from '@shared/api/data/enum/gender';
import {Select} from 'primeng/select';
import {Employee} from '@shared/api/data/model/employee';

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
export class StaffCreatePageComponent implements CanComponentDeactivate {
  formGroup :FormGroup<any> = new FormGroup<any>({})

  isNavigating :boolean = false;

  public genders: { label: string; value: any }[] = [
    { label: 'Male', value: Gender.Male },
    { label: 'Female', value: Gender.Female },
    { label: 'Other', value: Gender.Other }
  ];

  // DI
  private readonly service :StaffService = inject(StaffService);
  private readonly router :Router = inject(Router);
  private readonly translateService :TranslateService = inject(TranslateService);
  private readonly confirmationService :ConfirmationService = inject(ConfirmationService);
  private readonly messageService :MessageService = inject(MessageService);

  constructor() {
    this.formGroup = new FormGroup({
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

      this.service.createEmployee(employee).subscribe({
        next:(employee) => {
          this.messageService.add(this.translateService.instant('staff-feature-create-confirmation'))
          this.isNavigating = true;
          this.router.navigate(['/employee']);
        },
        error : (err) => {
          this.messageService.add(this.translateService.instant('staff-feature-create-error') + err);
        }
      })
    }
  }

}
