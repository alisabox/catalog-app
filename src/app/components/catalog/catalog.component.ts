import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FiresbaseService, Product } from 'src/app/services/firestore.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
  ],
})
export class CatalogComponent implements OnInit {
  private _products: Product[] = [];

  public get products(): Product[] {
    return this._products;
  }

  constructor(
    private readonly _bd: FiresbaseService,
  ) { }

  public ngOnInit(): void {
    this._bd.get().subscribe((data) => {
      this._products = data;
    });
  }
}
