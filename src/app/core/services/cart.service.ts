import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  cartCount = signal<number>(0);
  cartProductIds = signal<Set<string>>(new Set());

  addProuctToCart(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v2/cart`, { productId: productId });
  }

  getCartItems(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v2/cart`);
  }

  removeProductFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart/${productId}`);
  }

  updateCartItem(productId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v2/cart/${productId}`, {
      count: count,
    });
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart`);
  }

  createCashOrder(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${cartId}`, data);
  }

  createVisaOrder(cartId: string, data: object): Observable<any> {
    const currentUrl = window.location.origin;
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${currentUrl}`,
      data,
    );
  }
}
