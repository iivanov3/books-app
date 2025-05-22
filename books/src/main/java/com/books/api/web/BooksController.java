package com.books.api.web;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.books.api.model.Book;
import com.books.api.service.BookService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/books")
public class BooksController {

    private BookService bookService;

    public BooksController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping({"", "/"})
    public List<Book> getAllBooks() {
        return bookService.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public Book deleteById(@PathVariable Long id) {
        return bookService.delete(id);
    }
    
}
