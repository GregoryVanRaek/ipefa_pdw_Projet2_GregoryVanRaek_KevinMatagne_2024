import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import { InvoiceService } from 'src/app/feature/site/service/invoice.service';
import {Invoice} from '@shared/api/data/model/invoice';
import {Button} from 'primeng/button';
import {ConfirmationService, MessageService, PrimeTemplate} from 'primeng/api';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';
import {AppNode} from '../../../../common';
import {InvoiceType} from '@shared/api/data/enum/invoiceType';


@Component({
  selector: 'app-invoice-overview-page',
  imports: [
    Button,
    PrimeTemplate,
    ProgressSpinner,
    TableModule,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './invoice-overview-page.component.html',
  styleUrl: './invoice-overview-page.component.css'
})
export class InvoiceOverviewPageComponent implements OnInit {
  @Input() siteId!: string;
  isLoading: boolean = true;
  public invoices$:WritableSignal<Invoice[]>=signal([])



  private readonly router: Router = inject(Router);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);
  private readonly messageService :MessageService = inject(MessageService);


  ngOnInit(): void {
    this.getAll();
  }
  private readonly service: InvoiceService=inject(InvoiceService);

  getAll(){
    const invoices=this.service.getAllInvoicesBySiteId(this.siteId).subscribe({
      next:(response)=>{
        this.invoices$.set(response);
        this.isLoading=false;
      },
      error:(error:any)=>{
        console.log(error);
    }
    })
  }

  protected readonly AppNode = AppNode;

  formatAddressToString(invoice:Invoice) {

    if (invoice?.address){
      const {road,nb,cp,town}=invoice.address;
      return `${road} ${nb}, ${cp} ${town}`;
    }
   return ''
  }
  formatToDate(invoice:Invoice) {
    const date = new Date(invoice.date);

    // Extract the day, month, and year
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  protected readonly InvoiceType = InvoiceType;

  deleteInvoice(invoice:Invoice): void {
    this.confirmationService.confirm({
      message: this.translateService.instant('invoice-detail-feature-delete-confirmation'),
      header: this.translateService.instant('invoice-detail-feature-delete-confirmation-header'),
      acceptLabel: this.translateService.instant('btn-confirm'),
      rejectLabel: this.translateService.instant('btn-cancel'),
      icon : "pi pi-exclamation-triangle",
      acceptButtonStyleClass: 'p-button-secondary',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.service.deleteInvoice(invoice.invoiceId).subscribe({
          next: () => {
            const successMessage = this.translateService.instant('invoice-detail-feature-delete-toast-success');
            this.messageService.add({ severity: 'success', summary: successMessage });
            this.invoices$().filter(i =>i.invoiceId==invoice.invoiceId)
          },
          error: (err) => {
            const errorMessage = this.translateService.instant('invoice-detail-feature-delete-toast-error') + err.message;
            this.messageService.add({ severity: 'error', summary: errorMessage });
          }
        });
      },
      reject: () => {
        const rejectMessage = this.translateService.instant('invoice-detail-feature-delete-toast-cancel');
        this.messageService.add({ severity: 'info', summary: rejectMessage });
      }
    })
  }
}
