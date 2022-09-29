import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineAll, combineLatestAll, concatMap, map, merge, Observable, tap } from 'rxjs';
import { Drink } from '../libs/entities/drink.interface';
import Transform from '../libs/helpers/transform.helper';
import { mergeNsAndName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private toSearch: Observable<any>[] = [];

  constructor(public httpClient: HttpClient) { }

  getCocktail (name: string): Observable<any>{
    return this.httpClient.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).pipe( 
    
    map((resp: any) => {
        console.log(resp.drinks);
        
        return Transform.drinks(resp.drinks);
      }) 
    )
  }

  getPokemon(){
    return this.httpClient.get('https://pokeapi.co/api/v2/pokemon/pikachu').pipe(  
      concatMap((resp: any) => {
        return this.getSpecies(resp.species.url, resp)
      }),
      concatMap((respSpecies: any) => {   // Concatena la peticion 
        return this.getVarieties(respSpecies)
      }),
      tap (resp => {
        console.log('Tap: ', resp);
      })
    );
  }

  // Funcionamiento de combineLatestAll

  /* getPokemon(){
    return merge([this.httpClient.get('https://pokeapi.co/api/v2/pokemon/pikachu'),this.httpClient.get('https://pokeapi.co/api/v2/pokemon/ditto')]).pipe(
      combineLatestAll(),
      tap (resp => {
        console.log(resp);  
      })
    )
  } */

  getSpecies (url: string, original: any): Observable<any>{
    return this.httpClient.get(url).pipe(
      map((respSpecies: any) =>{
        (respSpecies.varieties as any[]).forEach(el => {
          this.toSearch.push(this.httpClient.get(el.pokemon.url))
        })
        console.log(this.toSearch);
        return {
          ...respSpecies, ...original
        }
      })
    )
  }

  getVarieties(original: any): Observable<any>{
    return merge (this.toSearch).pipe(  // Merge recibe observables, entra al map tantas veces como argumentos tenga (mandamos arreglo de observables)
      combineLatestAll(),               // *1 Ejecuta los observables | 2. Junta las respuestas en un arreglo
      // CombineLastestAll ejecuta cada peticion del arreglo, espera su respuesta y la guarda en un arreglo
      map(resp => { // Hacemos map del arreglo de respuestas de regresó combineLatestAll
        let sprites = resp.map(item => { // De cada respuesta de varieties solo se guarda el name y la imagen
          return {
            name: item.name,
            img: item.sprites.front_default
          }
        })
        return {
          ...original,  // Regresamos original que son las 2 peticiones mas la nueva key
          sprites: sprites
        }
      })
    )
  }
    
}
