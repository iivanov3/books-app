import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../model/book';

const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  constructor(
    private http: HttpClient
  ) { }

  getAllBooks() { // implemented
    return this.http.get<Book[]>(API_URL + "/books/");
  }

  getBook(id: number) { 
    return this.http.get<Book>(API_URL + `/books/${id}`);
  }

  deleteBook(id: number) { // implemented
    return this.http.delete(API_URL + `/books/delete/${id}`);
  }

  updateBook(id: number, book: Book) {
    return this.http.put(`http://localhost:8080/books/${id}`, book);
  }

  addToFavorites(id: number) { // implemented
    return this.http.post(API_URL + `/user/favorites/add/${id}`, null);
  }

  removeFromFavorites(id: number) { // implemented
    return this.http.delete(API_URL + `/user/favorites/remove/${id}`);
  }

  getFavoriteBooks() { // implemented
    return this.http.get<Book[]>(API_URL + "/user/favorites")
  }

  createBook(book: Book) {
    return this.http.post("http://localhost:8080/books/add", book);
  }


}
