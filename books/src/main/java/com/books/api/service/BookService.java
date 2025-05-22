package com.books.api.service;

import java.util.List;

import com.books.api.model.Book;

public interface BookService {
   List<Book> findAll();
   Book delete(Long id);
}
