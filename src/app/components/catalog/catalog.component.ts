import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { FiresbaseService, Product } from 'src/app/services/firestore.service';
import { ReactiveComponent } from 'src/app/shared/components/reactive.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ReactiveComponent,
  ],
})
export class CatalogComponent extends ReactiveComponent implements OnInit {
  private _products: Product[] = [];

  public get products(): Product[] {
    return this._products;
  }

  constructor(
    private readonly _bd: FiresbaseService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this._bd.get().pipe(
      takeUntil(this.destroy$),
    ).subscribe((data) => {
      this._products = data;
    });
  }
}
