import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookDataService } from '../../service/book-data.service';
import { Router } from '@angular/router';
import { Book } from '../../model/book';
import { IntegrationService } from '../../service/integration.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-list-books',
  imports: [DatePipe],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export class ListBooksComponent implements OnInit {

  books: Book[] = [];
  favorites: Map<number, boolean> = new Map<number, boolean>();
  integration = inject(IntegrationService);

  constructor(
    private bookService: BookDataService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => this.fetchData());
  }

  addToFavorites(id: number): void {
    this.bookService.addToFavorites(id).subscribe(() => this.fetchData());
  }

  removeFromFavorites(id: number): void {
    this.bookService.removeFromFavorites(id).subscribe(() => this.fetchData());
  }

  editBook(id: number): void {
    this.router.navigateByUrl(`books/edit/${id}`);
  }

  addBook(): void {
    this.router.navigateByUrl('books/add');
  }

  private fetchData(): void {
    this.bookService.getAllBooks().subscribe(
      (response) => this.books = response
    );

    this.userService.getFavoriteBooks().subscribe((favoriteBooks) => {
      this.favorites.clear();
      for (let i = 0; i < favoriteBooks.length; i++) {
        this.favorites.set(favoriteBooks[i].id, true);
      }
    });
  }
}
