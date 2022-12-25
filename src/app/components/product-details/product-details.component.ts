import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FiresbaseService, Product } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
})
export class ProductDetailsComponent implements OnInit {
  private _product: Product | null = null;

  public get product(): Product | null {
    return this._product;
  }

  constructor(
    private readonly _bd: FiresbaseService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  public ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params['id'];

    this._bd.getById(id).subscribe((product) => {
      if (!product) {
        this._router.navigate(['not-found']);
      } else {
        this._product = product;
      }
    });
  }

  public setFavorite(): void {
    if (!this._product) return;

    this._bd.setFavorite(this.product!.id, !this._product.favorite);
  }
}
