import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../../_models/spot';
import { SpotDetails } from 'src/app/_models/spotDetails';

@Component({
  selector: 'app-calendar-small',
  templateUrl: './calendar-small.component.html',
  styleUrls: ['./calendar-small.component.scss']
})
export class CalendarSmallComponent implements OnInit {
  @Input() spot: Spot | SpotDetails | undefined; 

  ngOnInit(): void {
    
  }

}
