import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;
  id:number
  constructor(private shoppinglistservice:ShoppingListService,private route:ActivatedRoute,
    private recipeservice:RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
       this.id=+params['id'];
       console.log(this.id);
       console.log(typeof this.id);
       this.recipe=this.recipeservice.getRecipe(this.id);
       console.log(this.recipe);
       
      })
  }
  onAddToShoppingList(){
    this.shoppinglistservice.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
   this.router.navigate(['edit'],{relativeTo:this.route})
  }
}
