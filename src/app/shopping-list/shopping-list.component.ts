import { ShoppingListService } from './services/shopping-list.service';
import { Component, OnDestroy, OnInit, OptionalDecorator } from '@angular/core';
import { Ingredient } from '../share/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = []
  private subscription:Subscription;

  // run with the component run
  constructor(private shoppingListService: ShoppingListService) {}
 
  ngOnInit(): void {
     this.ingredients = this.shoppingListService.getIngredients();
    this.subscription =   this.shoppingListService.ingredientChanged.subscribe(
      (ingredients:Ingredient[]) => this.ingredients = ingredients
     )
  }

  onEditItem(index: number){
    this.shoppingListService.starteEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
