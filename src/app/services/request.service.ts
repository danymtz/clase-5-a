import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Drink } from '../libs/entities/drink.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public httpClient: HttpClient) { }

  getCocktail (name: string): Observable<any>{
    return this.httpClient.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).pipe(
      map((resp: any) => {
        console.log(resp.drinks);
        
        return this.transformDrink(resp.drinks);
      })
    )
  }

  transformDrink(drinks: any[]): Drink[]{
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
