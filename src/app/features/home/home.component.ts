import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { HomeCategoriesComponent } from './components/home-categories/home-categories.component';
import { ProductComponent } from './components/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  imports: [
    SliderComponent,
    HomeCategoriesComponent,
    ProductComponent,
    HeaderComponent,
    NewsletterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
