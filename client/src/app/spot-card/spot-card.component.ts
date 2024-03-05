import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../_models/spot';

@Component({
  selector: 'app-spot-card',
  templateUrl: './spot-card.component.html',
  styleUrls: ['./spot-card.component.scss']
})
export class SpotCardComponent implements OnInit {
  @Input() spot: Spot;

  constructor() {
    this.spot = {
      id: 0,
      spotName: '',
      description: '',
      dateCreated: '',
      isBeginner: true,
      isAdvanced: true,
      january: true,
      february: true,
      march: true,
      april: true,
      may: true,
      june: true,
      july: true,
      august: true,
      september: true,
      october: true,
      november: true,
      december: true,
    }
  }

  ngOnInit(): void {
  }

  TruncateDescription(description: string) {
    if (description.length > 130) {
      return description.slice(0, 130) + '..';
    }
    else {
      return description;
    }
  }

}
