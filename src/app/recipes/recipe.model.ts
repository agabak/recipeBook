import { Ingredient } from './../share/ingredient.model';
export class Recipe {

    constructor(public id:number,public name: string, public description: string,
        public imageUrlPath: string, public ingredients: Ingredient[]) {
    }
}