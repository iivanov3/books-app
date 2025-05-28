import { Component, inject, OnInit } from '@angular/core';
import { BookDataService } from '../../service/book-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../model/book';

@Component({
  selector: 'app-book',
  imports: [ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {

  route = inject(ActivatedRoute);

  bookForm: FormGroup = new FormGroup({
    id: new FormControl(this.route.snapshot.params['id']),
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    datePublished: new FormControl('', Validators.required)
  });

  constructor(
    private bookService: BookDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    
    this.bookService.getBook(id).subscribe({
      next: (response) => {
        const book: Book = response;

        this.bookForm = new FormGroup({
          id: new FormControl(book.id),
          name: new FormControl(book.name, Validators.required),
          author: new FormControl(book.author, Validators.required),
          datePublished: new FormControl(book.datePublished, Validators.required)
        });
      },
      error: () => {
        this.router.navigateByUrl('books/add');
        //this.router.navigateByUrl('error');
      }
    });

  }

  saveBook() {
    const formValue = this.bookForm.value;
    
    const id = formValue.id;
    const name = formValue.name;
    const author = formValue.author;
    const datePublished = formValue.datePublished;

    const request: Book = new Book(id, name, author, datePublished);
    if (id == null) {
      this.bookService.createBook(request).subscribe({
        next: () => {
          this.router.navigateByUrl('books');
        },
        error: (err) => {
          console.log(err); // for debugging, should refactor to displaying it on the error component.
          this.router.navigateByUrl('error');
        }
      });
    }
    else {
      this.bookService.updateBook(request).subscribe({
        next: () => {
          this.router.navigateByUrl('books');
        },
        error: (err) => {
          console.log(err); // for debugging, should refactor to displaying it on the error component.
          this.router.navigateByUrl('error');
        }
      });
    }
  }
}
