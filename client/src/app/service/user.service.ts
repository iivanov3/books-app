import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getFavoriteBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL + "/user/favorites");
  }
  
}
