import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/share/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();

 private ingredients: Ingredient[] = [
    new Ingredient('Suguar', 10),
    new Ingredient('Tomato', 11),
    new Ingredient('Apple', 5),
  ];
  constructor() { }

  addItem(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
