import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/share/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  starteEditing = new Subject<number>();

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
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index:number) {
    return this.ingredients[index];
  }

  updateItem(index: number,item:Ingredient) {
    this.ingredients[index] = item;
    this.ingredientChanged.next(this.ingredients.slice())
  }

  deleteIitem(index: number) {
     this.ingredients.splice(index,1)  
    // splice function delete object, array.splice(x,1)  remove element from position x
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
