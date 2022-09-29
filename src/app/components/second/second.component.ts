import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserData } from 'src/app/libs/entities/user_data.interface';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  public name: string = '';
  public password: string = '';
  public detector$!: Observable<any>;

  constructor(public infoService: InfoService) {
    this.detector$ = this.infoService.data$.pipe(tap(resp =>{
      console.log('pipe >',resp);
      
    }))
   }

  ngOnInit(): void {
    /* this.infoService.data$.subscribe({next: (resp: UserData) =>{
      console.log(resp);
      this.name = resp.name;
      this.password = resp.password;
    }}) */
  }

}
