package com.books.api.service;

import java.util.List;
import com.books.api.model.Book;
import com.books.api.model.User;

public interface UserService {
    List<Book> getFavorites(String username);
    User addToFavorites(String username, Long id);
    User removeFromFavorites(String username, Long id);
}
