package com.books.api.service.impl;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.books.api.model.Book;
import com.books.api.model.User;
import com.books.api.repository.BookRepository;
import com.books.api.repository.UserRepository;
import com.books.api.service.BookService;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;
    private UserRepository userRepository;

    public BookServiceImpl(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book findById(Long id) {
        return bookRepository.findById(id).get();
    }
    
    @Override
    public Book delete(Long id) {
        Book book = bookRepository.findById(id).get();
        bookRepository.deleteById(id);
        return book;
    }
    
    @Override
    public Book create(String name, String author, Date datePublished) {
        Book b = new Book(name, author, datePublished, new HashSet<>());
        return bookRepository.save(b);
    }

    @Override
    public Book update(Long id, String name, String author, Date datePublished) {
        Book b = bookRepository.findById(id).get();
        b.setName(name);
        b.setAuthor(author);
        b.setDatePublished(datePublished);
        return bookRepository.save(b);
    }

    @Override
    public Book addToUserFavorites(String username, Long id) {
        User user = userRepository.findByUsername(username).get();
        Book book = bookRepository.findById(id).get();
        Set<User> users = book.getUsers();
        users.add(user);
        book.setUsers(users);
        return bookRepository.save(book);
    }

    @Override
    public Book removeFromUserFavorites(String username, Long id) {
        User user = userRepository.findByUsername(username).get();
        Book book = bookRepository.findById(id).get();
        Set<User> users = book.getUsers();
        users.remove(user);
        book.setUsers(users);
        return bookRepository.save(book);
    }
}
