package com.books.api.service;

import java.sql.Date;
import java.util.List;

import com.books.api.model.Book;

public interface BookService {
   List<Book> findAll();
   Book findById(Long id);
   Book delete(Long id);
   Book create(String name, String author, Date datePublished);
   Book update(Long id, String name, String author, Date datePublished);
   Book addToUserFavorites(String username, Long id);
   Book removeFromUserFavorites(String username, Long id);
}