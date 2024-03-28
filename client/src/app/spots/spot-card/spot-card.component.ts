import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../../_models/spot';

@Component({
  selector: 'app-spot-card',
  templateUrl: './spot-card.component.html',
  styleUrls: ['./spot-card.component.scss']
})
export class SpotCardComponent implements OnInit{
  @Input() spot: Spot = {} as Spot;

  ngOnInit(): void {
    
  }

  TruncateDescription(description: string) {
    if (description.length > 120) {
      return description.slice(0, 120) + '..';
    }
    else {
      return description;
    }
  }
}
