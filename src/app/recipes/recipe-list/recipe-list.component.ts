import { RecipeService } from './../services/recipe.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit , OnDestroy{
  recipes: Recipe[] = []
  subscribe: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  this.subscribe =   this.recipeService.changeRecipeList.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}  
