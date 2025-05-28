import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response';
import { RegisterRequest } from '../model/register-request';
import { RegisterResponse } from '../model/register-response';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode } from 'jwt-decode';

const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService implements OnInit {

  storage = inject(LocalStorageService);
  user: any | undefined;

  constructor(
    private http: HttpClient
  ) {
    try {
      const token = this.storage.get('auth-key');
      const decodedToken: any = jwtDecode(token!);

      this.user = decodedToken;
    }
    catch (error: any) {
      console.log("Error decoding JWT: ", error);
    }
  }

  ngOnInit(): void {
    
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_URL + "/auth/login", request);
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_URL + "/auth/register", request);
  }

}
