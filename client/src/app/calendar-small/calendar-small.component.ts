import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../_models/spot';

@Component({
  selector: 'app-calendar-small',
  templateUrl: './calendar-small.component.html',
  styleUrls: ['./calendar-small.component.scss']
})
export class CalendarSmallComponent implements OnInit {
  @Input() spot: Spot | undefined; 
  availableMonths = {
    jan: true,
    feb: true,
    mar: true,
    apr: false,
    may: false,
    jun: false,
    jul: false,
    aug: true,
    sep: true,
    oct: true,
    nov: true,
    dec: true,
  }

  ngOnInit(): void {

  }

}
