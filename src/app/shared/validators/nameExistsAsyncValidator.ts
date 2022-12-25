import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map, tap } from "rxjs";
import { FiresbaseService } from "../../services/firestore.service";


export function nameExistsAsyncValidator(firebase: FiresbaseService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return firebase.nameExists(control.value)
      .pipe(
        map(nameExists => nameExists ? { nameExists: true } : null),
        // eslint-disable-next-line no-console
        tap(console.log),
      );
  };
}
