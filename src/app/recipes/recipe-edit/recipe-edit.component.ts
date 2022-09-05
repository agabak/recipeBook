import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  isEditMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
     private recipeService: RecipeService,
     private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isEditMode = params['id'] !== undefined;
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeUrlPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeUrlPath = recipe.imageUrlPath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for(let ing of recipe.ingredients) {
           recipeIngredients.push(
            new FormGroup({
              'name':new  FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
           )
        }
      }
    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imageUrlPath': new FormControl(recipeUrlPath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'recipeIngredients': recipeIngredients
      }
    )}

  sendForm() {
    console.log(this.recipeForm.valid);
    const recipe = new Recipe(this.id,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imageUrlPath, 
      this.recipeForm.value.recipeIngredients);
    if(this.isEditMode) {
       this.recipeService.updateRecipe(this.id, recipe);
    } else {
      const newId = this.recipeService.getRecipes().length + 1;
      recipe.id = newId;
      this.recipeService.addRecipe(recipe);
    }
    this.resetForm();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;

  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onRemoveIngrident(index: number) {
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(index);
  }

  resetForm() {
    this.router.navigate(['../'],{relativeTo: this.route})
   // this.recipeForm.reset();
  }
}
