import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output('elementSelected') elementSelected = new EventEmitter<Recipe>();

 recipes: Recipe[] = [
   new Recipe('A test Recipe', 'This is a test recipe', 
   'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/27/0/0155221_Grilled-shrimp-on-skewers_s4x3.jpg.rend.hgtvcom.476.357.suffix/1397166029692.jpeg'),
   new Recipe('A test Recipe', 'This is a test recipe Nuber two', 
   'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/27/0/0155221_Grilled-shrimp-on-skewers_s4x3.jpg.rend.hgtvcom.476.357.suffix/1397166029692.jpeg')
 ];


  constructor() { }

  ngOnInit(): void {
  }

  onSelectedRecipe(recipe:Recipe) {
      this.elementSelected.emit(recipe);
  }
}  
