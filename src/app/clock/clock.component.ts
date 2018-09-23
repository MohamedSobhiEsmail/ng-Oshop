import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
 clock='';
  constructor() { }

  startTime() {

    this.clock = moment().format('MMMM Do YYYY, h:mm:ss a'); 
    }
    ngOnInit(){
     
      var t = setInterval(this.startTime, 1000);
      const source = interval(500);
      const subscribe = source.subscribe(x=>{
        this.startTime()
      })
    }

}
