import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FiresbaseService, Product } from 'src/app/services/firestore.service';
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
  ],
})
export class FavoriteComponent implements OnInit {
  private _products: Product[] = [];

  public get products(): Product[] {
    return this._products;
  }

  constructor(
    private readonly _bd: FiresbaseService,
  ) { }

  public ngOnInit(): void {
    this._bd.getFavorite().subscribe((data) => {
      this._products = data;
    });
  }
}
