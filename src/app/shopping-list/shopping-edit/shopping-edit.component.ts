import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
 @ViewChild('inputname') inputname:ElementRef;
 @ViewChild('inputamount') inputamount:ElementRef;

 constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit(): void {
  }
  onadditem(){
   const name=this.inputname.nativeElement.value;
   const amount= this.inputamount.nativeElement.value;
   this.shoppinglistservice.addingredeints({name,amount});
   
  }
}
