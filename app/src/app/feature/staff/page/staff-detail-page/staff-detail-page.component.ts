import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {Employee} from '@shared/api/data/model/employee';
import {ActivatedRoute} from '@angular/router';
import {StaffService} from '../../service';

@Component({
  selector: 'app-staff-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './staff-detail-page.component.html',
  styleUrl: './staff-detail-page.component.css'
})
export class StaffDetailPageComponent implements OnInit {
  employee$:WritableSignal<Employee | null> = signal(null);
  employeeId:string = "";

  constructor(private route:ActivatedRoute, private service:StaffService) {
  }

  ngOnInit(): void {
    this.employeeId = String(this.route.snapshot.paramMap.get('id'));
    this.getOneById(this.employeeId);
  }

  getOneById(id:string):void{
    this.service.getEmployeeById(id).subscribe({
      next : (response => {
        this.employee$.set(response.data as Employee);
      }),
      error : (err :Error) => {
        console.log(err);
      }
    })
  }

}
