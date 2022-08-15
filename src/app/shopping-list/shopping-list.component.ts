import { ShoppingListService } from './services/shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../share/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = []

  // run with the component run
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
     this.ingredients = this.shoppingListService.getIngredients();
  }

  onAddItem(event) {
    this.ingredients.push(event);
  }
}
