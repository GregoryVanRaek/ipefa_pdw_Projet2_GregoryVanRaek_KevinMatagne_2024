import { ChangeDetectorRef, Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Invoice } from '@shared/api/data/model/invoice';
import { InvoiceType } from '@shared/api/data/enum/invoiceType';
import { InvoiceStatus } from '@shared/api/data/enum/InvoiceStatus';
import { CustomValidators, FormError } from '@shared/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { handleFormError } from '@shared/ui';
import { InvoiceService } from '../../../site/service/invoice.service';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Calendar } from 'primeng/calendar';
import { Select } from 'primeng/select';
import {InputText} from 'primeng/inputtext';
import {AppNode} from '../../../../common';

@Component({
  selector: 'app-invoice-detail-page',
  templateUrl: './invoice-detail-page.component.html',
  imports: [

    ReactiveFormsModule,
    Button,
    InputNumber,
    TranslatePipe,
    TableModule,
    NgForOf,
    Calendar,
    Select,
    NgClass,
    CommonModule,
    InputText,
    RouterLink,
    FloatLabel
  ]
})
export class InvoiceDetailPageComponent implements OnInit {
  public invoiceType: { label: string; value: any }[] = [
    { label: "Proforma", value: InvoiceType.Proforma },
    { label: "Invoice", value: InvoiceType.Invoice },
    { label: "Price offer", value: InvoiceType.PriceOffer },
  ];

  public invoiceStatus: { label: string; value: any }[] = [
    { label: "Paid", value: InvoiceStatus.Paid },
    { label: "Pending", value: InvoiceStatus.Pending },
    { label: "Canceled", value: InvoiceStatus.Canceled }
  ];

  @Input() siteId!: string;
  isNavigating: boolean = false;
  public errors$: WritableSignal<FormError[]> = signal([]);
  formGroup: FormGroup;
  addressForm: FormGroup<any> = new FormGroup<any>({});

  totals: WritableSignal<{ totalWithoutVat: number, totalVat: number, totalWithVat: number }> = signal({
    totalWithoutVat: 0,
    totalVat: 0,
    totalWithVat: 0
  });

  private readonly service: InvoiceService = inject(InvoiceService);
  private readonly router: Router = inject(Router);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);
  private readonly messageService: MessageService = inject(MessageService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);  // Inject ActivatedRoute to access route params

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.formGroup = new FormGroup({
      invoiceId: new FormControl(""),
      type: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      address: new FormGroup({
        road: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        nb: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        cp: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        town: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        country: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        complement: new FormControl('/'),
      }),
      invoiceLines: new FormArray([])
    });

    this.invoiceLines.valueChanges.subscribe(() => {

      this.updateTotalAmount();
    });
  }

  ngOnInit(): void {
    this.addressForm = this.formGroup.get('address') as FormGroup;
    handleFormError(this.formGroup, this.errors$);
    handleFormError(this.addressForm, this.errors$);

    // Get the invoiceId from the URL and fetch invoice details
    this.activatedRoute.paramMap.subscribe(params => {
      const invoiceId = params.get('invoiceId');
      if (invoiceId) {
        this.getInvoiceDetails(invoiceId);
      }
    });
  }

  getInvoiceDetails(invoiceId: string): void {
    this.service.getInvoiceById(invoiceId).subscribe(invoiceData => {
      this.populateForm(invoiceData.data);
    });
  }

  populateForm(invoiceData: any): void {
    this.formGroup.patchValue({
      invoiceId:invoiceData.invoiceId,
      type: this.invoiceType[invoiceData.type],
      status: this.invoiceStatus[invoiceData.status],
      date: new Date(invoiceData.date),
    });

    // Populate address subform
    const addressGroup = this.formGroup.get('address') as FormGroup;
    console.log(invoiceData)
    addressGroup.patchValue({
      road: invoiceData.address.road,
      nb: invoiceData.address.nb,
      cp: invoiceData.address.cp,
      town: invoiceData.address.town,
      country: invoiceData.address.country,
      complement: invoiceData.address.complement,
    });

    // Populate invoice lines if available
    const invoiceLinesArray = this.formGroup.get('invoiceLines') as FormArray;
    invoiceData.invoiceLines.forEach((line: any) => {
      invoiceLinesArray.push(new FormGroup({
        itemName: new FormControl(line.itemName, [Validators.required, CustomValidators.nonEmptyValidator()]),
        quantity: new FormControl(line.quantity,[Validators.required, Validators.min(1)]),
        price: new FormControl(line.price,[Validators.required, Validators.min(0.01)]),
        vatRate: new FormControl(line.vatRate,[Validators.min(0), Validators.max(100)]),
      }));
    });
  }

  canDeactivate(): boolean | Promise<boolean> {
    if (this.formGroup.dirty && !this.isNavigating) {
      return new Promise((resolve) => {
        this.confirmationService.confirm({
          message: this.translateService.instant('invoice-feature-candeactivate-message'),
          header: this.translateService.instant('invoice-feature-create-title'),
          acceptLabel: this.translateService.instant('btn-confirm'),
          rejectLabel: this.translateService.instant('btn-cancel'),
          icon: "pi pi-exclamation-triangle",
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

  createInvoiceLine(): FormGroup {
    return this.fb.group({
      itemName: ['', [Validators.required, CustomValidators.nonEmptyValidator()]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      vatRate: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  get invoiceLines(): FormArray {
    return this.formGroup.get('invoiceLines') as FormArray;
  }

  addInvoiceLine() {
    this.invoiceLines.push(this.createInvoiceLine());
  }

  removeInvoiceLine(index: number) {
    this.invoiceLines.removeAt(index);
  }

  updateTotalAmount() {
    let totalWithoutVat = 0;
    let totalVat = 0;
    let totalWithVat = 0;

    // Loop through each invoice line to calculate the totals
    const lines = this.invoiceLines.controls;
    lines.forEach((line) => {
      const quantity = line.get('quantity')?.value;
      const price = line.get('price')?.value;
      const vatRate = line.get('vatRate')?.value;

      if (quantity !== undefined && price !== undefined && vatRate !== undefined) {
        const lineTotal = quantity * price;
        totalWithoutVat += lineTotal;
        const lineVat = (lineTotal * vatRate) / 100;
        totalVat += lineVat;
        totalWithVat += lineTotal + lineVat;
      }
    });

    // Round the totals to two decimal places
    totalWithoutVat = parseFloat(totalWithoutVat.toFixed(2));
    totalVat = parseFloat(totalVat.toFixed(2));
    totalWithVat = parseFloat(totalWithVat.toFixed(2));

    // Update the totals signal with the new calculated values
    this.totals.set({ totalWithoutVat, totalVat, totalWithVat });
    this.cd.detectChanges(); // Manually trigger change detection
  }

  getTotalAmount() {
    return this.totals();
  }


  getAllInvoiceErrors(): string[] {

    const errorSet: Set<string> = new Set();

    this.invoiceLines.controls.forEach((line: AbstractControl) => {
      const lineErrors = this.getInvoiceLineErrors(line as FormGroup);
      console.log(lineErrors);
      lineErrors.forEach((error) => errorSet.add(error));
    });

    return Array.from(errorSet);
  }

  getInvoiceLineErrors(line: FormGroup): string[] {
    const errors: string[] = [];

    const quantityControl = line.get('quantity');
    if (quantityControl?.invalid && (quantityControl?.touched || quantityControl?.dirty)) {
      if (quantityControl.errors?.['required']) {
        errors.push('error.invoice.quantity.required');
      }
      if (quantityControl.errors?.['min']) {
        errors.push('error.invoice.quantity.min');
      }
    }

    const priceControl = line.get('price');
    if (priceControl?.invalid && (priceControl?.touched || priceControl?.dirty)) {
      if (priceControl.errors?.['required']) {
        errors.push('error.invoice.price.required');
      }
      if (priceControl.errors?.['min']) {
        errors.push('error.invoice.price.min');
      }
    }

    const vatRateControl = line.get('vatRate');
    if (vatRateControl?.invalid && (vatRateControl?.touched || vatRateControl?.dirty)) {
      if (vatRateControl.errors?.['required']) {
        errors.push('error.invoice.vatRate.required');
      }
      if (vatRateControl.errors?.['min']) {
        errors.push('error.invoice.vatRate.min');
      }
      if (vatRateControl.errors?.['max']) {
        errors.push('error.invoice.vatRate.max');
      }
    }

    return errors;
  }

  //ADDRESS SECTION
  getErrorMessages(controlName: string): string[] {
    return this.errors$()
      .filter((error) => error.control === controlName)
      .map((error) => this.formatErrorMessage(error));
  }

  // formater l'erreur en fonction de son type
  private formatErrorMessage(error: FormError): string {
    switch (error.error) {
      case 'required':
        return `${this.translateService.instant('error-field-is-required')}`;
      case 'minlength':
        return `${error.control} must contains at least ${error.value.requiredLength} character`;
      case 'email' :
        return `${this.translateService.instant('error-email')}`;
      case 'nonEmpty' :
        return `${this.translateService.instant('error-field-non-empty')}`;
      case 'onlyNumbers':
        return `${this.translateService.instant('error-only-numbers')}`;
      default:
        return error.error;
    }
  }

  submitInvoice() {
    if (this.formGroup.valid) {
      const invoice: Invoice = { ...this.formGroup.value };
      invoice.status = invoice.status.value;
      invoice.type = invoice.type.value;
      invoice.address=this.addressForm.value;
      console.log("submit",invoice);
      this.service.updateInvoice( invoice).subscribe({
        next: (response) => {
          if (response.result) {
            const message: string = this.translateService.instant('invoice-feature-create-confirmation');
            this.messageService.add({ severity: "success", summary: message });

            this.isNavigating = true;
            setTimeout(() => {
              this.router.navigate(['/site']);
            }, 1000);
          } else {
            console.log("else:", response);
            const message: string = this.translateService.instant('invoice-feature-create-error') + response.errors;
            this.messageService.add({ severity: 'error', summary: message });
          }
        },
        error: (err) => {
          const message: string = this.translateService.instant('invoice-feature-create-error') + err;
          this.messageService.add({ severity: 'error', summary: message });
        }
      });
    }
  }

  protected readonly AppNode = AppNode;
}
