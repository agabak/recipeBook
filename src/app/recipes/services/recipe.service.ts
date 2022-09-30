import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Ingredient } from 'src/app/share/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 recipeSelected = new EventEmitter<Recipe>();
 changeRecipeList = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  
  constructor(private shippingListService: ShoppingListService) { }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.changeRecipeList.next(recipes.slice())

  }
  getRecipe(id:number) {
    return this.recipes.slice().find(x => x.id === id)
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredients(ingredients:Ingredient[]) {
    this.shippingListService.addItems(ingredients);
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.changeRecipeList.next(this.recipes.slice());
  }

  updateRecipe(id:number, recipe:Recipe) {
    this.recipes[id] = recipe;
    this.changeRecipeList.next(this.recipes.slice());
  }

  deleteRecipe(id:number) {
    // get the index  value
     const index = this.recipes.findIndex((recipe) => recipe.id === id);
    this.recipes.splice(index,1)
    this.changeRecipeList.next(this.recipes.slice())
  }
}
