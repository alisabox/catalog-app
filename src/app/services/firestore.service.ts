import { Injectable } from '@angular/core';
import { EMPTY, from, map, Observable, switchMap, take } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { child, getDatabase, push, ref } from '@angular/fire/database';
import {
  ref as storageRef,
  getDownloadURL,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

export interface Product {
  id: string,
  name: string,
  subtitle: string,
  description: string,
  price: number,
  favorite: boolean,
  image: string,
}

@Injectable({
  providedIn: 'root',
})
export class FiresbaseService {
  constructor(
    private readonly _db: AngularFireDatabase,
    private readonly _storage: Storage,
  ) { }

  public get(): Observable<Product[]> {
    return this._db.list<Product>('products').valueChanges();
  }

  public getById(id: string): Observable<Product | undefined> {
    return this.get().pipe(map((products) => products.find(product => product.id === id)));
  }

  public getFavorite(): Observable<Product[]> {
    return this._db.list<Product>('products', ref => ref.orderByChild('favorite').equalTo(true)).valueChanges();
  }

  public setFavorite(id: string, value: boolean): void {
    this._db.list('products').set(`${id}/favorite`, value);
  }

  public post(product: Partial<Product>, image: File): Observable<string> {
    const db = getDatabase();
    const newProdKey = push(child(ref(db), 'products')).key;

    if (!newProdKey) return EMPTY;

    return this.postImage(image).pipe(
      switchMap((url: string) => {
        return this._db.list('products').set(`${newProdKey}`, {
          ...product,
          image: url,
          favorite: false,
          id: newProdKey,
        });
      }),
      map(() => newProdKey),
    );
  }

  public postImage(image: File): Observable<string> {
    const pathToImage = `catalog/${Math.floor(Date.now() / 1000)}-${image.name}`;
    const ref = storageRef(this._storage, pathToImage);

    return from(uploadBytes(ref, image))
      .pipe(switchMap(() => getDownloadURL(storageRef(this._storage, pathToImage))));
  }

  public nameExists(name: string): Observable<boolean> {
    return this.get().pipe(
      map((products) => {
        return !!products.find(product => product.name.toLocaleLowerCase() === name.toLocaleLowerCase());
      }),
      take(1),
    );
  }
}
