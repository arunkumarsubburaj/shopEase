import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartCountObs: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private cartCount: number = 0;
  constructor() {}

  setCartCount(value: number) {
    this.cartCount += value;
    this.cartCountObs.next(this.cartCount);
  }

  getCartCount() {
    return this.cartCountObs.asObservable();
  }
}
