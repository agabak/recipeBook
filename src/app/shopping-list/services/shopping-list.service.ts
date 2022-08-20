import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/share/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Suguar', 10),
    new Ingredient('Tomato', 11),
    new Ingredient('Apple', 5),
  ];
  constructor() { }

  addItem(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items)
    this.ingredientChanged.next(this.ingredients.slice())
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
