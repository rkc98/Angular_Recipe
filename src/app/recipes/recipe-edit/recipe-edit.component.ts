import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false
  recipeform: FormGroup;
  constructor(private route: ActivatedRoute, private recipeservice: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.initForm()
      }
    )

  }
  onsubmit() {
    const newrecipe=new Recipe(this.recipeform.value['recipename'],
      this.recipeform.value['description'],this.recipeform.value['imagePath'],
      this.recipeform.value['ingredients']); 
    if(this.editmode){
      
      this.recipeservice.updateRecipe(this.id,newrecipe);
    }
    else{
      this.recipeservice.addRecipe(newrecipe)
    }
  }

  private initForm() {
    let recipename = '';
    let imagePath = '';
    let description = '';
    let recipeingredients = new FormArray([]);
    if (this.editmode) {
      const recipe = this.recipeservice.getRecipe(this.id);
      recipename = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        console.log("inside");
        
        for (let ingredient of recipe.ingredients) {
          recipeingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,Validators.required)

          }))
        console.log(ingredient.name,ingredient.amount);
        
        }
      }

    }

    this.recipeform = new FormGroup({
      'recipename': new FormControl(recipename, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients':recipeingredients

    })

  }
  onaddingredients(){
    (<FormArray>this.recipeform.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' : new FormControl(null,Validators.required)
      })
    )
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeform.get('ingredients')).controls;
   
  }

}
