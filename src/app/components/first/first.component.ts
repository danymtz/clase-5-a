import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  constructor(private infoService: InfoService) { }

  ngOnInit(): void {
  }

  onClick():void {
    this.infoService.data$.next({name:'user',password: '123'});
  } 

}
