import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [DatePipe, DecimalPipe, ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  productDetails = input.required<any>();

  allReviews = signal<any[]>([]);
  showAllReviews = signal<boolean>(false);
  userRating = signal<number>(1);
  userReview = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.getReviews(this.productDetails().id);
  }

  reviewStats = computed(() => {
    const reviews = this.allReviews();
    const total = reviews.length || 1;

    const getCount = (rating: number) => reviews.filter((r) => r.rating === rating).length;

    const stats: Record<number, { count: number; percent: number }> = {
      5: { count: getCount(5), percent: (getCount(5) / total) * 100 },
      4: { count: getCount(4), percent: (getCount(4) / total) * 100 },
      3: { count: getCount(3), percent: (getCount(3) / total) * 100 },
      2: { count: getCount(2), percent: (getCount(2) / total) * 100 },
      1: { count: getCount(1), percent: (getCount(1) / total) * 100 },
    };

    return stats;
  });

  getReviews(id: string): void {
    this.productsService.getProductReviews(id).subscribe({
      next: (res) => {
        console.log('Reviews loaded:', res.data);
        this.allReviews.set(res.data);
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      },
    });
  }

  sendReview(productId: string): void {
    if (this.userReview.invalid) return;

    const data = {
      review: this.userReview.value!,
      rating: this.userRating(),
    };

    this.productsService.createReview(productId, data).subscribe({
      next: (res) => {
        this.allReviews.update((prev) => [res.data, ...prev]);
        this.userReview.reset();
        this.userRating.set(5);
      },
      error: (err) => console.error(err),
    });
  }

  toggleReviews() {
    this.showAllReviews.update((v) => !v);
  }
}
