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
    const controlErrors: ValidationErrors | null = form.get(key)!.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          control: key,
          error: keyError,
          value: controlErrors[keyError]
        });
      });
    }
  });
  return result;
}
