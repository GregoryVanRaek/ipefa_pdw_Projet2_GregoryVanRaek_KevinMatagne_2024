import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Site} from '@shared/api';
import {SiteService} from '../../service';
import {AppNode} from '../../../../common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TableModule} from 'primeng/table';
import {Address} from '@shared/api/data/model/address';
import {ProgressSpinner} from 'primeng/progressspinner';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';


@Component({
  selector: 'app-site-overview-page',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    TranslatePipe,
    TableModule,
    ProgressSpinner, ConfirmDialog, Toast,
  ],
  templateUrl: './site-overview-page.component.html',
  styleUrl: './site-overview-page.component.css'
})
export class SiteOverviewPageComponent implements OnInit {
  sites$:WritableSignal<Site[]>=signal([])

  isLoading: boolean=true;

  private readonly service:SiteService=inject(SiteService);
  private readonly messageService :MessageService = inject(MessageService)
  private readonly confirmationService :ConfirmationService = inject(ConfirmationService)
  private readonly translateService :TranslateService = inject(TranslateService);


  ngOnInit():void {
   this.getAll();
  }
  getAll():void {
    this.service.getAllSites().subscribe({
      next:(sites) => {
        this.sites$.set(sites);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  formatToAddress(address:Address):string{
    const {road,nb,cp,town}=address;
    return `${road} ${nb}, ${cp} ${town}`;
  }


  protected readonly AppNode = AppNode;


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
        this.service.deleteSite(id).subscribe({
          next: () => {
            const updatedSites = this.sites$().filter(site => site.siteId !== id);
            this.sites$.set(updatedSites);

            const successMessage = this.translateService.instant('site-detail-feature-delete-toast-success');
            this.messageService.add({ severity: 'success', summary: successMessage });
          },
          error: (err) => {
            console.log(err)
            const errorMessage = this.translateService.instant('site-detail-feature-delete-toast-error') + err.message;
            this.messageService.add({ severity: 'error', summary: errorMessage });
          }
        });
      },
      reject: () => {
        const rejectMessage = this.translateService.instant('site-detail-feature-delete-toast-cancel');
        this.messageService.add({ severity: 'info', summary: rejectMessage });
      }
    });
  }

}
