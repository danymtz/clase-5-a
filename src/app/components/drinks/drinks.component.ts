import { Component, OnInit } from '@angular/core';
import { Drink } from 'src/app/libs/entities/drink.interface';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  public drinks: Drink[] = [];

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getCocktail('margarita').subscribe({
      next: resp =>{
        console.log(resp);
        this.drinks = resp;
        
    }})
  }

}
