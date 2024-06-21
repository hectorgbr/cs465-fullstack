import { Injectable, Inject } from '@angular/core';
// I had an error with this line: import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) {}

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = 'http://localhost:3000/api/trips';

  getTrips(): Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip): Observable<Trip[]> {
    // console.log('Inside TripDataService::addTrips');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`,
       //Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    return this.http.post<Trip[]>(this.tripUrl, formData, { headers });
    //return this.http.post<Trip[]>(this.tripUrl, formData, { headers: headers });
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip): Observable<Trip[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('travlr-token')}`,
    });
    return this.http.put<Trip[]>(this.tripUrl + '/' + formData.code, formData, {
      headers: headers,
    });
  }

  // I added the delete method
  deleteTrip(tripCode: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`,
    });
    return lastValueFrom(this.http.delete<any>(`${this.tripUrl}/${tripCode}`, { headers }))
      .catch(this.handleError);
  }
  

  public login(user: User): Promise<AuthResponse> {
    console.log('Inside TripDataService#login');
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    console.log('Inside TripDataService#register');
    return this.makeAuthApiCall('register', user);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  // I had to mofified thus fuctions because there were issues
  // the line .toPromise()
  private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    try {
      const response = await lastValueFrom(this.http.post<AuthResponse>(url, user));
      return response;
    } catch (error) {
      return this.handleError(error); // Ensure handleError returns a promise
    }
  }
}