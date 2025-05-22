import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IntegrationService } from '../../service/integration.service';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
  }
}
