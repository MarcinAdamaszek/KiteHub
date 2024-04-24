import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-feedback',
  templateUrl: './action-feedback.component.html',
  styleUrls: ['./action-feedback.component.scss']
})
export class ActionFeedbackComponent implements OnInit {
  title = '';
  message = '';
  route = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = history.state.title;
    this.message = history.state.message;
    this.route = history.state.route;
  }

  navigateBack() {
    this.router.navigateByUrl(this.route);
  }

}
