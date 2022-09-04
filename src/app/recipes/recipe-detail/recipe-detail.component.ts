import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id:number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
       }
    )
  }
  
  addToShoppingList() {
      if(this.recipe.ingredients.length > 0)
          this.recipeService.addIngredients(this.recipe.ingredients);
    }

    onDelete(id: number) {
      this.recipeService.deleteRecipe(id);
    }
  
}
