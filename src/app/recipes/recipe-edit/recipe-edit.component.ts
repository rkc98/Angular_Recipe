import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
editmode=false
recipeform:FormsModule;
  constructor(private route:ActivatedRoute,private recipeservice:RecipeService) { }

  ngOnInit(): void {
this.route.params.subscribe(
  (params:Params)=>{
    this.id=+params['id'];
    this.editmode=params['id']!=null;
    this.initForm()
  }
)

  }
  onsubmit(){
    console.log(this.recipeform);
  }

private initForm(){
let recipename='';
let imagePath='';
let description='';
if(this.editmode){
  const recipe=this.recipeservice.getRecipe(this.id);
  console.log("recipe",recipe);
  
  recipename=recipe.name;
  imagePath=recipe.imagePath;
  description=recipe.description
  
}


  

this.recipeform=new FormGroup({
  'recipename': new FormControl(recipename,Validators.required),
   'imagePath':new FormControl(imagePath,Validators.required),
   'description':new FormControl(description,Validators.required)

})

}

}
