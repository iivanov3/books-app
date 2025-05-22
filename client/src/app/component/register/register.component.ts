import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IntegrationService } from '../../service/integration.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../model/register-request';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private integration: IntegrationService
  ) { }

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  request: RegisterRequest = new RegisterRequest;
  message: string | undefined;

  register(): void {

    const formValue = this.registerForm.value;

    this.request.username = formValue.username;
    this.request.password = formValue.password;

    if (this.registerForm.valid) {
      this.integration.register(this.request).subscribe({
        next: () => {
          this.router.navigateByUrl('login');
        },
        error: (err) => {
          this.message = err.error.response;
          console.log(this.message);
        }
      });
    }
  }
}
