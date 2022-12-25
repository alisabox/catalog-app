import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';
import { FiresbaseService, Product } from 'src/app/services/firestore.service';
import { ReactiveComponent } from 'src/app/shared/components/reactive.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    ReactiveComponent,
  ],
})
export class FavoriteComponent extends ReactiveComponent implements OnInit {
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
    this._bd.getFavorite().pipe(
      takeUntil(this.destroy$),
    ).subscribe((data) => {
      this._products = data;
    });
  }
}
