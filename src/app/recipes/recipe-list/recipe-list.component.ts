import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  recipes:Recipe[]=[];

  constructor(private recipeservice:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(){
    this.recipeservice.recipechanged.subscribe(
      (recipe:Recipe[])=>{
        this.recipes=recipe;
      }
    )
    this.recipes=this.recipeservice.getRecipes();
  }
  
  newRecipe(){
 this.router.navigate(['new'],{relativeTo:this.route});
  }
}
