import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IntegrationService } from '../../service/integration.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  integration = inject(IntegrationService);

  constructor() { }

}
