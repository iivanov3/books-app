import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../model/book';
import { BookDataService } from '../../service/book-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IntegrationService } from '../../service/integration.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-favorites',
  imports: [DatePipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  integration = inject(IntegrationService);
  books: Book[] = [];

  constructor(
    private bookService: BookDataService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  addBook(): void {
    this.router.navigateByUrl('books/add');
  }

  removeFromFavorites(id: number): void {
    this.bookService.removeFromFavorites(id).subscribe(() => this.fetchData());
  }

  editBook(id: number): void {
    this.router.navigateByUrl(`books/edit/${id}`);
  }

  private fetchData(): void {
    this.userService.getFavoriteBooks().subscribe(
      (response) => this.books = response
    );
  }

}
