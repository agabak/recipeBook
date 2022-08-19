import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/share/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(1,'A test Recipe one', 
    'This is a test recipe', 
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/27/0/0155221_Grilled-shrimp-on-skewers_s4x3.jpg.rend.hgtvcom.476.357.suffix/1397166029692.jpeg',
    [
       new Ingredient('Meat', 1),
       new Ingredient('Fries', 29)
    ]),
    new Recipe(2,'A test Recipe two',
    'This is a test recipe Nuber two', 
    'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/27/0/0155221_Grilled-shrimp-on-skewers_s4x3.jpg.rend.hgtvcom.476.357.suffix/1397166029692.jpeg',
    [
      new Ingredient('Burn', 2),
      new Ingredient('Meat', 1)
   ])
  ];
  
  constructor(private shippingListService: ShoppingListService) { }

  getRecipe(id:number) {
    return this.recipes.slice().find(x => x.id === id)
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredients(ingredients:Ingredient[]) {
    this.shippingListService.addItems(ingredients);
  }
}
