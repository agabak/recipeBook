export class Recipe {
    public name: string;
    public description: string;
    public imageUrlPath: string;

    constructor(name:string, description: string, imageUrlPath:string) {
        this.name = name;
        this.description = description;
        this.imageUrlPath = imageUrlPath;
    }
}