import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Calendar} from 'primeng/calendar';
import {InputNumber} from 'primeng/inputnumber';
import {MultiSelect} from 'primeng/multiselect';

@Component({
  selector: 'app-contract-create-page',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    Button,
    TranslatePipe,
    FloatLabel,
    InputText,
    Calendar,
    InputNumber,
    MultiSelect
  ],
  templateUrl: './contract-create-page.component.html',
  styleUrl: './contract-create-page.component.css'
})
export class ContractCreatePageComponent {
  @Input({required:true}) employeddId!:string;
  formGroup :FormGroup<any> = new FormGroup({});
  perks:string[] = ['ticket_restaurant', 'eco-cheques', 'assurance-group', 'frais-forfaitaires', 'teletravail', 'voiture-de-societe', 'carte-carburant', 'ordinateur', 'telephone']

  translateService:TranslateService = inject(TranslateService);

  constructor() {
    this.formGroup = new FormGroup({
      salary : new FormControl('', Validators.required),
      perks : new FormControl('', Validators.required),
      startDate : new FormControl(new Date(), Validators.required),
      endDate : new FormControl('',),
      contratType : new FormControl('', Validators.required),
      weeklySchedule : new FormControl(38, Validators.required),
    });
  }

  create() :void{
    const contract = this.formGroup.value;
    console.log(contract)
  }

  getTranslatedPerks(): { label: string; value: string }[] {
    return this.perks.map(perk => ({
      label: this.translateService.instant(`perks.${perk}`),
      value: perk
    }));
  }

}

