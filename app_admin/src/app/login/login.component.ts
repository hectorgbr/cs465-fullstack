import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importing FormsModule to use template-driven forms
import { CommonModule } from '@angular/common'; // Importing CommonModule for common directives
import { NavbarComponent } from '../navbar/navbar.component'; // Importing NavbarComponent to include it in my template

@Component({
  selector: 'app-login',
  standalone: true, // Declaring this component as standalone
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: '',
  };

  // I'm injecting the Router and AuthenticationService so I can use them in my methods
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  // Lifecycle hook that is called once the component has been initialized
  ngOnInit() {}

  // Method that gets called when the login form is submitted
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {// Checking if both email and password are provided
      // Setting an error message if fields are missing
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin(); // Proceed to login if all fields are filled
    }
  }
  // This is a Private method to handle the login process
  private doLogin(): void {
    // This line calls the login method from AuthenticationService
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigateByUrl('list-trips')) // Navigating to the trips list on successful login
      .catch((message) => (this.formError = message)); // This sets an error message if login fails
  }
}