import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {
  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
