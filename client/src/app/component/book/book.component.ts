import { Component, OnInit } from '@angular/core';
import { BookDataService } from '../../service/data/book-data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../model/book';
import { IntegrationService } from '../../service/integration.service';

const API_URL = "http://localhost:8080";

@Component({
  selector: 'app-book',
  imports: [ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  id: number = 0;
  book: Book = new Book(this.id, '', '', new Date());

  constructor(
    private bookService: BookDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  bookForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    datePublished: new FormControl(new Date(), Validators.required)
  });

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.book = new Book(this.id, '', '', new Date());

    if (this.id != -1) {
      this.bookService.getBook(this.id)
        .subscribe(
          data => this.book = data
        );
    }
  }

  saveBook() {
    if (this.id == -1) {
      this.bookService.createBook(this.book)
        .subscribe(
          data => {
            this.router.navigate(['books'])
          }
        );
    }
    else {
      this.bookService.updateBook(this.id, this.book)
        .subscribe(
          data => {
            this.router.navigate(['books'])
          }
        );
    }
  }
}
