import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';
import { IntegrationService } from '../../service/integration.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private integration: IntegrationService
  ) { }
  
  ngOnInit(): void {
    this.storage.remove('auth-key');
    
    this.integration.user = null;
    this.router.navigateByUrl('logout');
  }
}
