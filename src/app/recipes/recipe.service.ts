
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{
  
  private recipes:Recipe[]=[
        new Recipe("maggi","in 2 minutes","https://im.rediff.com/getahead/2020/sep/29burnt-garlic-chilli-maggi.jpg",[
          new Ingredient("noodles",260),
          new Ingredient("capsicum",5)]),
        
        new Recipe("paneer","in 20 minutes","https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2.jpg",
        [
          new Ingredient("panner",10),
          new Ingredient("tomato",5) ])]
         getRecipes(){
        return this.recipes.slice();
         }
        getRecipe(index: number){
       return this.recipes[index];
        }

}