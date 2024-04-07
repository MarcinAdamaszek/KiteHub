import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-spot-success',
  templateUrl: './add-spot-success.component.html',
  styleUrls: ['./add-spot-success.component.scss']
})
export class AddSpotSuccessComponent {

  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigateByUrl('spots');
  }

}
