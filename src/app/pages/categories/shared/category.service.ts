import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, nome: 'Lazer', descricao: 'Cinema, parque, praia' },
    { id: 2, nome: 'Estudos', descricao: 'Faculdade, cursos' }
  ];

  getAll(): Observable<Category[]> {
    return of(this.categories);
  }

  getById(id: number): Observable<Category> {
    return of(this.categories.find(c => c.id === id));
  }

  create(category: Category): Observable<Category> {
  const maxId = this.categories.length > 0
    ? Math.max(...this.categories.map(c => c.id))
    : 0;

  category.id = maxId + 1;
  this.categories.push(category);

  return of(category);
}


  update(category: Category): Observable<Category> {
    const index = this.categories.findIndex(c => c.id === category.id);
    this.categories[index] = category;
    return of(category);
  }

  delete(id: number): Observable<any> {
    this.categories = this.categories.filter(c => c.id !== id);
    return of(null);
  }
}
