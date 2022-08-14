import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/share/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('inputName') name : ElementRef;
@ViewChild('inputAmount') amount:ElementRef;
@Output('ingredient') ingredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    this.ingredient.emit({
      name: this.name.nativeElement.value,
      amount: this.amount.nativeElement.value
    })
  }
}
