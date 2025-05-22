import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response';
import { RegisterRequest } from '../model/register-request';
import { RegisterResponse } from '../model/register-response';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';

const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  storage = inject(LocalStorageService);

  constructor(
    private http: HttpClient
  ) { 
    if (this.storage.get('auth-key')) {
      this.userIsLoggedIn.next(true);
    }
  }

  ngOnInit(): void {
    // try {
    //   const token = this.storage.get('auth-key');
    //   const decodedToken: any = jwtDecode(token!);
    
    //   this.userIsLoggedIn.next(decodedToken != null);
    // }
    // catch (err) {
    //   console.log(err);
    //   this.userIsLoggedIn.next(false);
    // }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_URL + "/auth/login", request);
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_URL + "/auth/register", request);
  }

  userBooks(): Observable<any> { // ??? not used
    return this.http.get<any>(API_URL + "/user/books/");
  }

  userRole(): Observable<any> { // ??? not used
    return this.http.get<any>(API_URL + "/user/")
  }

}
