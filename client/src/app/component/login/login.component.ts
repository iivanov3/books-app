import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IntegrationService } from '../../service/integration.service';
import { LoginRequest } from '../../model/login-request';
import { LocalStorageService } from '../../service/local-storage.service';
import { LoginResponse } from '../../model/login-response';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private integration: IntegrationService,
    private storage: LocalStorageService
  ) { }

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  request: LoginRequest = new LoginRequest;
  message: string | undefined;

  login() {
    this.storage.remove('auth-key');

    const formValue = this.userForm.value;

    this.request.username = formValue.username;
    this.request.password = formValue.password;

    this.integration.login(this.request).subscribe({
      next: (response: LoginResponse) => {
        this.storage.set('auth-key', response.token);
        
        this.integration.user = jwtDecode(response.token!);
        this.router.navigateByUrl('books');
      },
      error: (err) => {
        this.message = err.error.token;
        this.storage.remove('auth-key');
      }
    });
  }
}
