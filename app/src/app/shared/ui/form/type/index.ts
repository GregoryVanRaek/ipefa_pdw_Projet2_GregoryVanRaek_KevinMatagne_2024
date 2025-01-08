import { FormGroup, ValidationErrors } from '@angular/forms';
import {WritableSignal} from '@angular/core';
import { map, tap } from 'rxjs';
export interface FormError {
  control: string;
  value: any;
  error: string;
}
export type HandleValueChangeFn = (form:FormGroup, signal$:WritableSignal<FormError[]>)=> void;
export type GetAllFormErrorsFn = (form: FormGroup) => FormError[];

// ecoute le form pour capter et transmettre les erreurs au signal lors d'un changement de valeur
export const handleFormError: HandleValueChangeFn = (form: FormGroup, signal$: WritableSignal<FormError[]>): void => {
  form.valueChanges
    .pipe(
// transform the value to FormError array
      map(() => getFormValidationErrors(form)),
// send signal with new errors
      tap((errors: FormError[]) => signal$.set(errors)))
    .subscribe();
}

// extrait toutes les erreurs du formulaire
export const getFormValidationErrors: GetAllFormErrorsFn = (form: FormGroup): FormError[] => {
  const result: FormError[] = [];

  Object.keys(form.controls).forEach(key => {
    const control = form.get(key);

    if (control instanceof FormGroup) {
      result.push(...getFormValidationErrors(control));
    } else if (control && control.errors) {
      Object.keys(control.errors).forEach(keyError => {
        result.push({
          control: key,
          error: keyError,
          value: control.errors,
        });
      });
    }
  });

  return result;
};

