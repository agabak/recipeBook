import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/services/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {


    // https://ng-recipe-book-77fd1-default-rtdb.firebaseio.com/
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://ng-recipe-book-77fd1-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(respose => console.log(respose));
    }

    onFetchData() {
    return     this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get('https://ng-recipe-book-77fd1-default-rtdb.firebaseio.com/recipes.json', 
            {
                params: new HttpParams().set('auth', user?.token)
            })

        }), map((recipes: Recipe[]) => {
            return recipes?.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}