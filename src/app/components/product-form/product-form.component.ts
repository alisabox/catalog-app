import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { FiresbaseService } from 'src/app/services/firestore.service';
import { nameExistsAsyncValidator } from 'src/app/shared/nameExistsAsyncValidator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class ProductFormComponent implements OnDestroy {
  private _isSaving: boolean = false;
  private _productImg: string = 'assets/image_placeholder.svg';
  private _productImgSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(this._productImg);
  private _uploadedFile: File | null = null;
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  public productImgChanged$: Observable<string> = this._productImgSubject$.asObservable();

  public productForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required], [nameExistsAsyncValidator(this._db)]),
    subtitle: new FormControl('', [Validators.required, Validators.maxLength(35)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  public get name(): AbstractControl | null {
    return this.productForm.get('name');
  }

  public get subtitle(): AbstractControl | null {
    return this.productForm.get('subtitle');
  }

  public get description(): AbstractControl | null {
    return this.productForm.get('description');
  }

  public get price(): AbstractControl | null {
    return this.productForm.get('price');
  }

  public get uploadedFile(): File | null {
    return this._uploadedFile;
  }

  public get isSaving(): boolean {
    return this._isSaving;
  }

  constructor(
    private readonly _db: FiresbaseService,
    private readonly _router: Router,
  ) { }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public upload(uploadEvent: Event): void {
    const files = (uploadEvent.target as HTMLInputElement).files;

    if (!files || !files.length) return;

    const file = files[0];

    const fileName = file.name.toLowerCase();
    const matches = ['gif', 'jpg', 'jpeg', 'png'].some((it) => fileName.endsWith(it));
    if (matches) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          this._productImgSubject$.next(reader.result.toString());
        }
      };

      reader.readAsDataURL(file);
      this._uploadedFile = file;
    }
  }

  public onSubmit(): void {
    this._isSaving = true;

    const { name, subtitle, price, description } = this.productForm.value;

    if (!this._uploadedFile || !name || !subtitle || !price || !description) {
      this._isSaving = false;

      return;
    }

    this._db.post({ name, subtitle, price: parseFloat(price), description }, this._uploadedFile)
      .pipe(
        takeUntil(this._destroy$),
        finalize(() => this._isSaving = false),
      ).subscribe((id: string) => {
        this._router.navigate(['catalog', id]);
      });
  }
}
