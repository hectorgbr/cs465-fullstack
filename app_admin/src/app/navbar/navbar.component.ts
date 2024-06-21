import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
// I imported common Angular modules for use within the component
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar', // HTML tag for this component
  standalone: true,  // Indicates this is a standalone component
  // Modules imported for use within the component
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html', // Path to the HTML template
  styleUrls: ['./navbar.component.css'], // Path to the CSS styles
})
export class NavbarComponent implements OnInit {
  // This line injects the AuthenticationService into the component
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  protected onLogout(): void {
    return this.authenticationService.logout();
  }
}