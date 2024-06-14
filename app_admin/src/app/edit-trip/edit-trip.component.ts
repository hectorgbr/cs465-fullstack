import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn’t find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('EditTripComponent::ngOnInit');
    console.log('tripcode:' + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: Trip[]) => {
          this.trip = value[0];
          // Ensure start is a Date object
          if (this.trip.start && !(this.trip.start instanceof Date)) {
            this.trip.start = new Date(this.trip.start as any);
          }
          // Convert the start date to 'yyyy-MM-dd' format for the form control
          if (this.trip.start) {
            this.editForm.patchValue({
              ...this.trip,
              start: this.formatDate(this.trip.start)
            });
          }
          if (!value) {
            this.message = 'No Trip Retrieved!';
          } else {
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero
    const day = ('0' + date.getDate()).slice(-2); // Adding leading zero
    return `${year}-${month}-${day}`;
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      // Convert the form control value back to a Date object before submitting
      const formValue = this.editForm.value;
      formValue.start = new Date(formValue.start);
      this.tripDataService.updateTrip(formValue)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  get f() { return this.editForm.controls; }
}
