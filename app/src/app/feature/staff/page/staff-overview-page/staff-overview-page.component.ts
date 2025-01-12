import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Button} from 'primeng/button';
import {StaffService} from '../../service';
import {Employee} from '@shared/api/data/model/employee';
import {FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import {AppNode} from '../../../../common';
import {UserRoleEnum} from '@shared/api/data/enum/role';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-staff-overview-page',
  standalone: true,
  imports: [
    TranslatePipe,
    FormsModule,
    ProgressSpinner,
    TableModule,
    RouterLink,
    Button,
    ConfirmDialog,
    Toast
  ],
  templateUrl: './staff-overview-page.component.html',
  styleUrl: './staff-overview-page.component.css'
})
export class StaffOverviewPageComponent implements OnInit{
  protected readonly UserRoleEnum = UserRoleEnum;
  protected readonly AppNode = AppNode;
  service :StaffService = inject(StaffService);
  private readonly messageService :MessageService = inject(MessageService)
  private readonly confirmationService :ConfirmationService = inject(ConfirmationService)
  private readonly translateService :TranslateService = inject(TranslateService);

  employees$ :WritableSignal<Employee[]> = signal([]);
  loading:boolean = true;

  ngOnInit(): void {
      this.getAll();
  }

  getAll() :void{
    this.service.getAllEmployees().subscribe({
      next:(employees) => {
        this.employees$.set(employees);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  delete(id :string): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('staff-detail-feature-delete-confirmation'),
      header: this.translateService.instant('staff-detail-feature-delete-confirmation-header'),
      acceptLabel: this.translateService.instant('btn-confirm'),
      rejectLabel: this.translateService.instant('btn-cancel'),
      icon : "pi pi-exclamation-triangle",
      acceptButtonStyleClass: 'p-button-secondary',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.service.deleteEmployee(id).subscribe({
          next: () => {
            const updatedEmployees = this.employees$().filter(employee => employee.employeeId !== id);
            this.employees$.set(updatedEmployees);

            const successMessage = this.translateService.instant('staff-detail-feature-delete-toast-success');
            this.messageService.add({ severity: 'success', summary: successMessage });
          },
          error: (err) => {
            console.log(err)
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

}
