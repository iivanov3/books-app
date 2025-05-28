package com.books.api.web;

import java.util.List;

import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.books.api.model.Book;
import com.books.api.model.DTO.BookDTO;
import com.books.api.service.BookService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/books")
public class BookController {

    private BookService bookService;
    private JwtDecoder jwtDecoder;

    public BookController(BookService bookService, JwtDecoder jwtDecoder) {
        this.bookService = bookService;
        this.jwtDecoder = jwtDecoder;
    }

    @GetMapping({"", "/"})
    public List<Book> getAllBooks() {
        return bookService.findAll();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public Book deleteById(@PathVariable Long id) {
        return bookService.delete(id);
    }
    
    @PostMapping("/create")
    public Book create(@RequestBody BookDTO book) {
        return bookService.create(book.getName(), book.getAuthor(), book.getDatePublished());
    }
    
    @PutMapping("/update") // /update/{id} ?
    public Book update(@RequestBody BookDTO book) {
        return bookService.update(book.getId(), book.getName(), book.getAuthor(), book.getDatePublished());
    }    

    @PostMapping("/favorites/add/{id}")
    public Book addToUserFavorites(@RequestHeader("Authorization") String token,
                                    @PathVariable Long id) {
        token = token.substring(7);
        String username = jwtDecoder.decode(token).getSubject();
        return bookService.addToUserFavorites(username, id);
    }

    @DeleteMapping("/favorites/remove/{id}")
    public Book removeFromFavorites(@RequestHeader("Authorization") String token,
                                    @PathVariable Long id) {
        token = token.substring(7);
        String username = jwtDecoder.decode(token).getSubject();
        return bookService.removeFromUserFavorites(username, id);
    }

}
