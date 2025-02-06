import {Component, inject, signal, WritableSignal} from '@angular/core';
import {SiteService} from '../../service';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FloatLabel} from 'primeng/floatlabel';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {CustomValidators, FormError} from '@shared/core';
import {handleFormError} from '@shared/ui';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Site} from '@shared/api';

@Component({
  selector: 'app-site-create-page',
  imports: [
    Button,
    RouterLink,
    TranslatePipe,
    FloatLabel,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    ConfirmDialog,
    Toast
  ],
  templateUrl: './site-create-page.component.html',
  styleUrl: './site-create-page.component.css'
})
export class SiteCreatePageComponent {
  formGroup: FormGroup<any> = new FormGroup<any>({})
  addressForm: FormGroup<any> = new FormGroup<any>({})
  public errors$: WritableSignal<FormError[]> = signal([]);

  isNavigating: boolean = false;

  private readonly siteService: SiteService = inject(SiteService);
  private readonly router: Router = inject(Router);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);
  private readonly messageService :MessageService = inject(MessageService);


  constructor() {
    this.formGroup = new FormGroup({
      siteName: new FormControl('', [Validators.required, CustomValidators.nonEmptyValidator()]),
      comment:new FormControl(''),
      address: new FormGroup({
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
    this.addressForm = this.formGroup.get('address') as FormGroup
    handleFormError(this.formGroup, this.errors$);
    handleFormError(this.addressForm, this.errors$);
  }

  canDeactivate(): boolean | Promise<boolean> {
    if (this.formGroup.dirty && !this.isNavigating) {
      return new Promise((resolve) => {
        this.confirmationService.confirm({
          message: this.translateService.instant('site-feature-candeactivate-message'),
          header: this.translateService.instant('site-feature-create-title'),
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

  create():void {
    if (this.formGroup.valid) {
      console.log("ici")
      const headquarter:Site=this.formGroup.value;
      this.siteService.createSite(headquarter).subscribe(
        {
          next:(response)=>{
            if (response.result){
              const  message:string = this.translateService.instant('site-feature-create-confirmation');
              this.messageService.add({ severity: 'success', summary: message});

              this.isNavigating = true;
              setTimeout(() => {
                this.router.navigate(['/site']);
              }, 1000);
            }
            else{
              const message :string = this.translateService.instant('staff-feature-create-error') + response.errors;
              this.messageService.add({ severity: 'error', summary: message});
            }
          },
          error : (err) => {
            const message :string = this.translateService.instant('site-feature-create-error') + err;
            this.messageService.add({ severity: 'error', summary: message});
          }
        }
      )
    }
  }

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
        return `${this.translateService.instant('error-only-number')}`;
      case 'iban':
        return `${this.translateService.instant('error-iban')}`;
      case 'noFutureDate':
        return `${this.translateService.instant('error-date-in-futur')}`;
      default:
        return `${error.control} contains an error : ${error.error}`;
    }
  }
}
