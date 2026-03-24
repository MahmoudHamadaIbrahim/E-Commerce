import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/models/category.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-categories',
  imports: [RouterLink],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.css',
})
export class HomeCategoriesComponent implements OnInit {
  private readonly ctegoriesService = inject(CategoriesService);
  categoriesList = signal<Category[]>([]);

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.ctegoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
