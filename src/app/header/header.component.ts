import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header-style.component.css']
})

export class HeaderComponent {
  @Output('featureSelected') featureSelected = new EventEmitter<string>();

  onSelectRecipe(feature:string) {
        this.featureSelected.emit(feature);
    } 
    
    onSelectShopping(feature:string) {
        this.featureSelected.emit(feature);  
    }
}