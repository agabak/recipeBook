import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../share/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header-style.component.css']
})

export class HeaderComponent {

    constructor(private datastorageService: DataStorageService){}

   saveRecipes() {
        this.datastorageService.storeRecipe();
   }

   onfetchRecipes() {
    this.datastorageService.onFetchData().subscribe();
   }
 
}