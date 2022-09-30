import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/share/data-storage.service";
import { Recipe } from "../recipe.model";

@Injectable( {providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService:DataStorageService) {}
    resolve(route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot) {
            console.log('Is call')
        return this.dataStorageService.onFetchData();
    }

}