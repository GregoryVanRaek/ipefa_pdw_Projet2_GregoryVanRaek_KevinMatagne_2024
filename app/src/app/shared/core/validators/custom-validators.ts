import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {StaffService} from '../../../feature/staff/service';
import {catchError, debounceTime, map, of} from 'rxjs';
import {inject} from '@angular/core';

export class CustomValidators {
  static nonEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      return value.trim().length < 1 ? { nonEmpty: true } : null;
    };
  }

  static strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // 8 cara + 1 maj + 1min + 1 numero + 1 caract spécial

      return strongPasswordRegex.test(value)
        ? null
        : { strongPassword: true };
    };
  }

  static onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isOnlyNumbers = /^\d+$/.test(value);
      return isOnlyNumbers ? null : { onlyNumbers: true };
    };
  }

  static ibanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      const normalizedValue = value.replace(/\s+/g, '');
      const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;

      const isValidIban = ibanRegex.test(normalizedValue) && this.validateIbanChecksum(normalizedValue);

      return isValidIban ? null : { iban: true };
    };
  }

  private static validateIbanChecksum(iban: string): boolean {
    const rearrangedIban = iban.slice(4) + iban.slice(0, 4);

    const numericIban = rearrangedIban
      .split('')
      .map((char) =>
        char.match(/[A-Z]/)
          ? char.charCodeAt(0) - 55
          : char
      )
      .join('');

    const ibanBigInt = BigInt(numericIban);
    return ibanBigInt % 97n === 1n;
  }

  static noFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const inputDate = new Date(value);
      const currentDate = new Date();

      return inputDate > currentDate ? { noFutureDate: true } : null;
    };
  }

}
