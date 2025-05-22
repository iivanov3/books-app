import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookDataService } from '../../service/data/book-data.service';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../model/book';
import { LocalStorageService } from '../../service/local-storage.service';
import { LoginResponse } from '../../model/login-response';
import { InvalidTokenError, jwtDecode, JwtHeader, JwtPayload } from 'jwt-decode';
import { IntegrationService } from '../../service/integration.service';

@Component({
  selector: 'app-list-books',
  imports: [DatePipe],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export class ListBooksComponent implements OnInit {

  books: Book[] = [];
  favoriteBooks: Map<number, boolean> = new Map<number, boolean>(); // if book[id] is favorite, set to true
  username: string | null = ""; // should be in integration service
  role: string | null = ""; // same

  integration = inject(IntegrationService);

  constructor(
    private bookService: BookDataService,
    private router: Router,
    private storage: LocalStorageService,
  ) { }

  ngOnInit(): void {

    try {
      //this.integration.userIsLoggedIn.subscribe(() => this.storage.get('auth-key') != "");
      const token = this.storage.get('auth-key');
      const decodedToken: any = jwtDecode(token!);

      this.username = decodedToken.sub;
      this.role = decodedToken.roles;
    }
    catch (error: any) {
      console.log("Error decoding JWT: ", error);
    }

    this.bookService.getAllBooks().subscribe({
      next: async (response) => {
        this.books = await response;
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    this.bookService.getFavoriteBooks().subscribe({
      next: async (response) => { // doesn't work as intended, also requires refreshing
        let favorites: Book[] = await response;
        this.favoriteBooks = new Map<number, boolean>();
        this.books.forEach(book => console.log(this.favoriteBooks.set(book.id, false)));
        favorites.forEach(book => this.favoriteBooks.set(book.id, true));
      },
      error: (err: any) => {
        console.log(err);
      }
    });

  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: (resp) => {

      },
      error: (err) => {
        console.log("Error while deleting book: ", err);
      }
    });
  }

  addToFavorites(id: number) {
    this.bookService.addToFavorites(id).subscribe({
      next: async () => {
        
      },
      error: (err) => { }
    });
  }
  
  removeFromFavorites(id: number): void {
    this.bookService.removeFromFavorites(id).subscribe({
      next: async () => {
        await this.bookService.getFavoriteBooks().subscribe();
      },
      error: (error) => { }
    });
  }

  editBook(id: number) {
    this.router.navigateByUrl('edit/${id}');
  }
  
  addBook(): void {
    this.router.navigateByUrl('add');
  }

}
