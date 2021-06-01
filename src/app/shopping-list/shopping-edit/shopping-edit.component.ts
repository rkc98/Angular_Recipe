import { visitValue } from '@angular/compiler/src/util';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  constructor(private shoppinglistservice: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  subscription: Subscription
  editingmode = false;
  editingitem: Ingredient;
  itemindex;
  @ViewChild('f') slform: NgForm;
  ngOnInit(): void {
    this.subscription = this.shoppinglistservice.ingredientseditting.subscribe(
      (index: number) => {
        this.itemindex = index;
        this.editingmode = true;
        this.editingitem = this.shoppinglistservice.getingregient(index);
        this.slform.setValue({
          name: this.editingitem.name,
          amount: this.editingitem.amount
        })

      }
    )


  }
  onadditem(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount;
    if (this.editingmode) {

      this.shoppinglistservice.updateingredients(this.itemindex, { name, amount });
    }
    else {
      this.shoppinglistservice.addingredeints({ name, amount });
    }
    form.resetForm();
    this.editingmode=false;
  }
  clear(){
    this.slform.resetForm();
    this.editingmode=false
  }
ondelete(){
  this.shoppinglistservice.deleteingredients(this.itemindex);
  this.clear();
;}
}
