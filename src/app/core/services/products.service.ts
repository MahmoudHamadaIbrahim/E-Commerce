import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(pageNum: number = 1): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products?page=${pageNum}&limit=40`);
  }

  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${productId}`);
  }

  getProductReviews(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}/reviews`);
  }

  createReview(productId: string, reviewData: { review: string; rating: number }): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/products/${productId}/reviews`,
      reviewData,
    );
  }
}
