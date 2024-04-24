import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotForm } from 'src/app/_models/spotForm';
import { CountryService } from 'src/app/_services/country.service';
import { SpotService } from 'src/app/_services/spot.service';
import { getMonthsFromFlags, setMonthFlags } from 'src/app/_utils/utils';

@Component({
  selector: 'app-edit-spot',
  templateUrl: './edit-spot.component.html',
  styleUrls: ['./edit-spot.component.scss']
})
export class EditSpotComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  spotId: number | undefined;
  spot: SpotForm = {} as SpotForm;
  validationErrors: string[] | undefined;
  countries: string[] = [];
  monthsSelected: string[] = [];
  title = 'Success!';
  message = `The spot has been successfuly updated`;
  feedbackRoute = '/spots-moderation';

  constructor(private spotService: SpotService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private countryService: CountryService) {
      this.getCountries();
    }

  ngOnInit(): void {
    this.initializeForm();

    this.route.params.subscribe(params => {
      this.spotId = params['id'];
    });

    if (this.spotId) {
      this.spotService.getSpotDetails(this.spotId).subscribe({
        next: spot => {
          this.spot = spot;
          this.monthsSelected = getMonthsFromFlags(this.spot);
          this.patchFormValues();
        },
        error: err => console.log(err)
      });
    }
  }

  initializeForm() {
    this.editForm = this.fb.group({
      spotname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      country: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d{1,2}(\.\d{1,7})?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d{1,2}(\.\d{1,7})?$/)]],
      description: [''],
      isAdvanced: [''],
      isBeginner: [''],
    })
  }

  patchFormValues() {
    this.editForm.patchValue({
      spotname: this.spot.spotName,
      country: this.spot.country,
      latitude: this.spot.latitude,
      longitude: this.spot.longitude,
      description: this.spot.description,
      isAdvanced: this.spot.isAdvanced,
      isBeginner: this.spot.isBeginner,
    });
  }

  updateSpot() {
    this.spot = this.editForm.value;
    
    setMonthFlags(this.spot, this.monthsSelected);

    if (this.spotId) this.spot.id = this.spotId;

    this.spotService.updateSpot(this.spot).subscribe({
      next: () => {
        this.spotService.spotCache.clear();
        this.spotService.spotApprovedCache.clear();
        this.router.navigateByUrl('/action-feedback', { state: { 
          title: this.title,
          message: this.message,
          route: this.feedbackRoute,
        }});
      },
      error: err => console.log(err)
    })
  }

  cancel() {
    this.router.navigateByUrl('/spots-moderation');
  }

  getCountries() {
    this.countryService.getCountries().subscribe({
      next: response => this.countries = response,
      error: err => console.log(err)
    });
  }

}
