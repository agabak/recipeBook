import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeHomeComponent } from './recipes/recipe-home/recipe-home.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/services/recipe.resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch:'full' },
  { path: 'recipes', component: RecipesComponent , children: [
    {path:'' , component: RecipeHomeComponent},
    {path:'new', component:RecipeEditComponent},
    {path:':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    {path:':id/edit', component:RecipeEditComponent, resolve: [RecipeResolverService]},
  ]},
  { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
