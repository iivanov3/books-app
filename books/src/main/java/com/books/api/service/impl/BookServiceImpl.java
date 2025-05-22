package com.books.api.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.books.api.model.Book;
import com.books.api.repository.BookRepository;
import com.books.api.service.BookService;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }
    
    @Override
    public Book delete(Long id) {
        Book book = bookRepository.findById(id).get();
        bookRepository.deleteById(id);
        return book;
    }
    
}
