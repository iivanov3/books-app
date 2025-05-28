import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL + "/books/");
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(API_URL + `/books/${id}`);
  }

  deleteBook(id: number) {
    return this.http.delete(API_URL + `/books/delete/${id}`);
  }

  updateBook(book: Book) {
    return this.http.put(API_URL + "/books/update", book);
  }

  createBook(book: Book) {
    return this.http.post(API_URL + "/books/create", book);
  }
  
  addToFavorites(id: number) {
    return this.http.post(API_URL + `/books/favorites/add/${id}`, null);
  }

  removeFromFavorites(id: number) {
    return this.http.delete(API_URL + `/books/favorites/remove/${id}`);
  }

}
