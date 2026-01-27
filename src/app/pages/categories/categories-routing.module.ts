import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent}, //apenas listagem, por isso é list
  { path: 'new', component: CategoryFormComponent}, /*nos próximos dois vai criar ou editar, logo será preciso
                                                    adicionar o form*/
  { path: ':id/edit', component: CategoryFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
