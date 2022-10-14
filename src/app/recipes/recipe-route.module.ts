import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth-gurd.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeHomeComponent } from "./recipe-home/recipe-home.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolverService } from "./services/recipe.resolver.service";


const routes: Routes = [
    { path: '', component: RecipesComponent,
    canActivate :[ AuthGuardService],
    resolve: [RecipeResolverService] 
 , children: [
   {path:'' , component: RecipeHomeComponent},
   {path:'new', component:RecipeEditComponent},
   {path:':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
   {path:':id/edit', component:RecipeEditComponent},
 ]},
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRouteModule {

}