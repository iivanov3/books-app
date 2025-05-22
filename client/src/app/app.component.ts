import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component';
import { LocalStorageService } from './service/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { IntegrationService } from './service/integration.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  constructor() { }

  ngOnInit(): void {

  }
}
