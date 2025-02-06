import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {FloatLabel} from 'primeng/floatlabel';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ProgressSpinner} from 'primeng/progressspinner';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Toast} from 'primeng/toast';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CustomValidators, FormError} from '@shared/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {handleFormError} from '@shared/ui';
import {Site} from '@shared/api';
import {SiteService} from '../../service';
import {InvoiceCreatePageComponent} from '../../../invoice/page/invoice-create-page/invoice-create-page.component';
import {
  InvoiceOverviewPageComponent
} from '../../../invoice/page/invoice-overview-page/invoice-overview-page.component';

@Component({
  selector: 'app-site-detail-page',
  imports: [
    Button,
    ConfirmDialog,
    FloatLabel,
    FormsModule,
    InputText,
    ProgressSpinner,
    ReactiveFormsModule,
    RouterLink,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Toast,
    TranslatePipe,
    InvoiceCreatePageComponent,
    InvoiceOverviewPageComponent
  ],
  templateUrl: './site-detail-page.component.html',
  styleUrl: './site-detail-page.component.css'
})
export class SiteDetailPageComponent implements OnInit {

  public siteFormGroup :FormGroup<any>;
  public addressForm :FormGroup<any> = new FormGroup<any>({})

  public errors$: WritableSignal<FormError[]> = signal([]);

  site$:WritableSignal<Site | null> = signal(null);
  public siteId!:string;

  isLoading:boolean = true;
  isEditMode: boolean = false;
  newInvoice :boolean = false;
  existingInvoice$ :WritableSignal<boolean> = signal(false);

  // DI
  private readonly route:ActivatedRoute = inject(ActivatedRoute);
  private readonly router:Router = inject(Router);
  private readonly service:SiteService = inject(SiteService);
  private readonly translateService :TranslateService = inject(TranslateService);
  private readonly messageService :MessageService = inject(MessageService)
  private readonly confirmationService :ConfirmationService = inject(ConfirmationService)

  constructor() {
    this.siteFormGroup = new FormGroup({
      siteName:new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
      comment:new FormControl(''),
      address:new FormGroup({
        road: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        nb: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        cp: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        town: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        country: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
        complements: new FormControl('/'),
      })
    })

  }

  ngOnInit(): void {
    console.log("ici")
    this.siteId = String(this.route.snapshot.paramMap.get('id'));
    this.setFormControlStatus();
    this.getOneById(this.siteId);

    this.addressForm = this.siteFormGroup.get('address') as FormGroup
    handleFormError(this.siteFormGroup, this.errors$);
    handleFormError(this.addressForm, this.errors$);

  }

  getOneById(id:string):void{
    console.log("ici")
    this.service.getSiteById(id).subscribe({
      next :(response)=>{
        console.log(response)
        const site:Site = response.data as Site;
        this.site$.set(site);
        this.initFormValue(site);
        this.isLoading=false;
      },error:()=>{
        this.isLoading=false;
      }
      }
    )
  }

  initFormValue(site:Site){
    this.siteFormGroup.patchValue({
      siteName:site.siteName,
      address:{...site.address},
    })
  }

  onEditClick() {
    this.isEditMode = !this.isEditMode;
    this.setFormControlStatus();
    this.getOneById(this.siteId);
  }

  setFormControlStatus() {
    Object.keys(this.siteFormGroup.controls).forEach(field => {
      const control = this.siteFormGroup.get(field);
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
    let message :string;
    const site :Site = this.siteFormGroup.value;
    site.siteId = this.siteId;
    if(this.siteFormGroup.valid){
      this.service.updateSite(site).subscribe({
        next : (response) => {
          if(response.result){
            message = this.translateService.instant('site-detail-feature-update-toast-success')
            this.messageService.add({ severity: 'success', summary: message});
            this.onEditClick();
          }
          else{
            const message :string = this.translateService.instant('site-detail-feature-update-toast-error') + ": \n" +  response.errors;
            this.messageService.add({ severity: 'error', summary: message});
          }
        },
        error : (err) => {
          message = this.translateService.instant('site-detail-feature-update-toast-error') + err.message;
          this.messageService.add({ severity: 'error', summary: message });
        },
      })
    }
    else{
      message = this.translateService.instant('form-validation-all-field-must-be-completed')
      this.messageService.add({ severity: 'error', summary: message});
    }
  }

  delete(): void {
  this.confirmationService.confirm({
      message: this.translateService.instant('site-detail-feature-delete-confirmation'),
      header: this.translateService.instant('site-detail-feature-delete-confirmation-header'),
      acceptLabel: this.translateService.instant('btn-confirm'),
      rejectLabel: this.translateService.instant('btn-cancel'),
      icon : "pi pi-exclamation-triangle",
      acceptButtonStyleClass: 'p-button-secondary',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.service.deleteSite(this.siteId).subscribe({
          next: () => {
            const successMessage = this.translateService.instant('staff-detail-feature-delete-toast-success');
            this.messageService.add({ severity: 'success', summary: successMessage });
            this.router.navigate(['/staff']);
          },
          error: (err) => {
            const errorMessage = this.translateService.instant('staff-detail-feature-delete-toast-error') + err.message;
            this.messageService.add({ severity: 'error', summary: errorMessage });
          }
        });
      },
      reject: () => {
        const rejectMessage = this.translateService.instant('staff-detail-feature-delete-toast-cancel');
        this.messageService.add({ severity: 'info', summary: rejectMessage });
      }
    })
  }

  canDeactivate(): boolean | Promise<boolean> {
    if (this.siteFormGroup.dirty) {
      return new Promise((resolve) => {
        this.confirmationService.confirm({
          message: this.translateService.instant('site-feature-candeactivate-message'),
          header: this.translateService.instant('site-feature-create-title'),
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

  getErrorMessages(controlName: string): string[] {
    return this.errors$()
      .filter((error) => error.control === controlName)
      .map((error) => this.formatErrorMessage(error));
  }

  private formatErrorMessage(error: FormError): string {
    switch (error.error) {
      case 'required':
        return `${this.translateService.instant('error-field-is-required')}`;
      case 'minlength':
        return `${error.control} must contains at least ${error.value.requiredLength} character`;
      case 'nonEmpty' :
        return `${this.translateService.instant('error-field-non-empty')}`;
      case 'onlyNumbers':
        return `${this.translateService.instant('error-only-number')}`;
      case 'noFutureDate':
        return `${this.translateService.instant('error-date-in-futur')}`;
      default:
        return `${error.control} contains an error : ${error.error}`;
    }
  }

  newInvoiceOnClick() {
    if (this.newInvoice){
      this.ngOnInit()
    }
      this.newInvoice = !this.newInvoice;
  }
}
