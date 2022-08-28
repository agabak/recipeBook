import { ShoppingListService } from './../services/shopping-list.service';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/share/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editItemIndex:number;
  ingrdient: Ingredient;
@ViewChild('fm') form: NgForm;
@Output('ingredient') ingredient = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
   this.subscription =  this.shoppingListService.starteEditing
    .subscribe((index: number) => {
      console.log(index);
    this.editItemIndex = index;
    this.editMode = true;
    this.ingrdient = this.shoppingListService.getIngredient(index);
    this.form.setValue({
      name: this.ingrdient.name,
      amount: this.ingrdient.amount
    })});
  } 

  addItem() {
    if(this.editMode) {
      this.shoppingListService.updateItem(this.editItemIndex,
     {name: this.form.value.name, amount: this.form.value.amount});
    }else {
      this.shoppingListService
      .addItem(new Ingredient(this.form.value.name, this.form.value.amount));
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  noDelete() {
     this.shoppingListService.deleteIitem(this.editItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription
        .unsubscribe();
  }
}
