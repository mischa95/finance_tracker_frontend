import { Component, OnInit} from '@angular/core';
import { CategoryDTO } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  categories: CategoryDTO[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }
}
