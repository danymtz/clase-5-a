import { Drink } from "../entities/drink.interface";

export default class Transform {
    
    public static drinks(drinks: any[]): Drink[]{
        let bebidas = drinks.map (drink => {
          
          let ingredients: string[] = [];
          
          Object.keys(drink).forEach(key => {
            if(key.includes('strIngredient') && drink[key]){
              ingredients.push(drink[key])
            }
          })
          
          return {
            name: drink.strDrink,
            img: drink.strDrinkThumb,
            ingredients: ingredients
          };
        })
        return bebidas;
      }
}