import { Component } from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-staff-overview-page',
  standalone: true,
  imports: [
    Dialog,
    UIChart
  ],
  templateUrl: './staff-overview-page.component.html',
  styleUrl: './staff-overview-page.component.css'
})
export class StaffOverviewPageComponent {
  departmentData = {
    labels: ['Développement', 'Design', 'Marketing', 'RH'],
    datasets: [{
      data: [50, 30, 15, 5],
      backgroundColor: ['#4caf50', '#ffeb3b', '#2196f3', '#ff5722']
    }]
  };

  ageData = {
    labels: ['18-25', '26-35', '36-45', '46+'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: '#42A5F5'
    }]
  };

  recentStaff = [
    { name: 'Jane Doe', position: 'Développeur Backend', dateAdded: '10/12/2024' },
    { name: 'John Smith', position: 'Designer UI/UX', dateAdded: '08/12/2024' },
    { name: 'Alice Johnson', position: 'Responsable Marketing', dateAdded: '06/12/2024' }
  ];
}
