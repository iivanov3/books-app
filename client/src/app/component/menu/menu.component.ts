import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IntegrationService } from '../../service/integration.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  constructor(
    private storage: LocalStorageService
  ) { }

  integration = inject(IntegrationService);

  ngOnInit(): void {
    this.integration.userIsLoggedIn.subscribe(() => this.storage.get('auth-key') != ""); // doesnt work after refreshing
  }
  
}
