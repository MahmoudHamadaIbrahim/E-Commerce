import { Component, inject, signal } from '@angular/core';
import { Brand } from '../cart/models/cart.interface';
import { BrandsService } from '../../core/services/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private brandsService = inject(BrandsService);
  brandsList = signal<Brand[]>([]);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList.set(res.data);
      },
    });
  }
}
