import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista')
    )
  }

   // função para exclusão
  excluir(category: Category) {
  const mustDelete = confirm("Deseja realmente excluir?");

  if (mustDelete) {
    this.categoryService.delete(category.id).subscribe(
      () => {
        this.categories = this.categories.filter(
          c => c.id !== category.id
        );
      },
      () => alert("Erro ao excluir")
    );
  }
}

trackById(index: number, category: Category) {
  return category.id;
}



}
