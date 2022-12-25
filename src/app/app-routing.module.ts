import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: 'catalog', loadComponent: () => import('./components/catalog/catalog.component').then(x => x.CatalogComponent) },
  { path: 'catalog/:id', loadComponent: () => import('./components/product-details/product-details.component').then(x => x.ProductDetailsComponent) },
  { path: 'favorite', loadComponent: () => import('./components/favorite/favorite.component').then(x => x.FavoriteComponent) },
  { path: 'add-product', loadComponent: () => import('./components/product-form/product-form.component').then(x => x.ProductFormComponent) },
  { path: 'add-product', loadComponent: () => import('./components/product-form/product-form.component').then(x => x.ProductFormComponent) },
  { path: '**', redirectTo: 'not-found' },
  { path: 'not-found', loadComponent: () => import('./components/not-found/not-found.component').then(x => x.NotFoundComponent) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
