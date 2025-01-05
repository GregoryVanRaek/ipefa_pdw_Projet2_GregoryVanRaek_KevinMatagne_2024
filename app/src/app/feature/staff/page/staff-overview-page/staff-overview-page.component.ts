import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from 'primeng/button';
import {StaffService} from '../../service';
import {Employee} from '@shared/api/data/model/employee';
import {FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {RouterLink} from '@angular/router';
import { AppRoutes} from '../../../../common';
import {UserRoleEnum} from '@shared/api/data/enum/role';

@Component({
  selector: 'app-staff-overview-page',
  standalone: true,
  imports: [
    TranslatePipe,
    FormsModule,
    ProgressSpinner,
    TableModule,
    RouterLink,
    Button
  ],
  templateUrl: './staff-overview-page.component.html',
  styleUrl: './staff-overview-page.component.css'
})
export class StaffOverviewPageComponent implements OnInit{
  protected readonly AppRoutes = AppRoutes;
  service :StaffService = inject(StaffService);

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

  protected readonly UserRoleEnum = UserRoleEnum;
}
