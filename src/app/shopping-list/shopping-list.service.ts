
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredients:Ingredient[]=[
        new Ingredient("apples",5),
        new Ingredient("tomatoes",15)
        
      ];
      ingredientschanged =new Subject<Ingredient[]>();


      getingredients(){
          return this.ingredients.slice();

      }
      addingredeints(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientschanged.next(this.ingredients.slice())

      }
      addIngredientsToShoppingList(ingredients:Ingredient[]){
       for(let ingredient of ingredients ){
        this.ingredients.push(ingredient);
       }
    }
}