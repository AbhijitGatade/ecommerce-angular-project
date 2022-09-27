import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProductCount = new BehaviorSubject(0);
  currentProductCount = this.cartProductCount.asObservable();

  constructor() {

  }
  updateCartCount(count: number) {
    this.cartProductCount.next(count)
  }
}
