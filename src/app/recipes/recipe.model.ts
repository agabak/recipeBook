import { Ingredient } from './../share/ingredient.model';
export class Recipe {

    constructor(public name: string, public description: string,
        public imageUrlPath: string, public ingredients: Ingredient[]) {
    }
}