import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit  {
  @Input() rating: number | undefined;
  fullStarsValue = 1;
  displayHalfStar = false;
  outlineStarsValue = 1;

  constructor() {
    
  }

  ngOnInit(): void {
    this.setStarsValues();
  }
  
  setStarsValues() {

    if (this.rating === 0) {
      this.fullStarsValue = 0;
      this.outlineStarsValue = 5;
      return;
    }

    if (!this.rating) return;

    this.fullStarsValue = Math.round(this.rating);
    
    if (this.rating > this.fullStarsValue) {
      this.displayHalfStar = true;
    }
    else {
      this.displayHalfStar = false;
    }

    this.outlineStarsValue = 5 - this.fullStarsValue;

    if (this.displayHalfStar) this.outlineStarsValue -= 1;
  }
}
