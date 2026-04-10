import { Component, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-related-products',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  relatedProducts = signal<Product[]>([]);
  productDetails = input.required<Product>();
  @ViewChild('slider') slider!: ElementRef;

  ngOnInit(): void {
    this.getRelatedProducts();
  }

  getRelatedProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        const filtered = res.data.filter(
          (p: Product) =>
            p.category._id === this.productDetails().category._id &&
            p._id !== this.productDetails()._id,
        );
        this.relatedProducts.set(filtered);
      },
    });
  }

  moveSlider(direction: 'next' | 'prev') {
    const el = this.slider.nativeElement;
    const cardWidth = el.offsetWidth / 3;
    el.scrollBy({
      left: direction === 'next' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  }
}
