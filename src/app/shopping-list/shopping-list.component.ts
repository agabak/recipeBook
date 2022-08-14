import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../share/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Suguar', 10),
    new Ingredient('Tomato', 11),
    new Ingredient('Apple', 5),
  ];

  // run with the component run
  constructor() {}

  ngOnInit(): void {}

  onAddItem(event) {
    this.ingredients.push(event);
  }
}
