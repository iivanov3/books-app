import { Component, inject, Inject } from '@angular/core';
import { Book } from '../../model/book';
import { LocalStorageService } from '../../service/local-storage.service';
import { BookDataService } from '../../service/data/book-data.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DatePipe } from '@angular/common';
import { IntegrationService } from '../../service/integration.service';

@Component({
  selector: 'app-favorites',
  imports: [DatePipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

  integration = inject(IntegrationService);
  books: Book[] = [];
  username: string | null = "";
  role: string | null = "";

  constructor(
    private bookService: BookDataService,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {

    this.integration.userIsLoggedIn.subscribe(/*() => this.storage.get('auth-key')*/);

    this.bookService.getFavoriteBooks().subscribe({
      next: async (response) => {
        this.books = await response;
      },
      error: (err) => {
        console.log(err);
      }
    });

    try {
      const token = this.storage.get('auth-key');
      const decodedToken: any = jwtDecode(token!);

      this.username = decodedToken.sub;
      this.role = decodedToken.roles;
    }
    catch (error: any) {
      console.log("Error decoding JWT: ", error);
    }
  }

  addBook(): void {
    this.router.navigateByUrl('books/add');
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: async () => {
        //this.bookService.getFavoriteBooks().subscribe((response) => this.books = response);
      },
      error: (err) => {
        console.log("Error deleting book: ", err);
      }
    });
  }

  removeFromFavorites(id: number) {
    this.bookService.removeFromFavorites(id).subscribe({
      next: async (response) => {
        await this.bookService.getFavoriteBooks().subscribe(response => this.books=response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editBook(id: number) {

  }

}
