import { Component } from '@angular/core';
import { ProductComponent } from '../home/components/product/product.component';

@Component({
  selector: 'app-shop',
  imports: [ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}
