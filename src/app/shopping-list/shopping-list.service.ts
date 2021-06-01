
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredients:Ingredient[]=[
        new Ingredient("apples",5),
        new Ingredient("tomatoes",15)
        
      ];
      ingredientschanged =new Subject<Ingredient[]>();
    ingredientseditting =new Subject();

      getingredients(){
          return this.ingredients.slice();

      }
      getingregient(index:number){

     return this.ingredients[index];
      }
      addingredeints(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientschanged.next(this.ingredients.slice())

      }
      updateingredients(index:number,ingredient:Ingredient){
        
          this.ingredients[index]=ingredient;
          this.ingredientschanged.next(this.ingredients.slice());
      }
      deleteingredients(index:number){
        this.ingredients.splice(index,1);
        this.ingredientschanged.next(this.ingredients.slice());
      }
      addIngredientsToShoppingList(ingredients:Ingredient[]){
       for(let ingredient of ingredients ){
        this.ingredients.push(ingredient);
       }
    }
}