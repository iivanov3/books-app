package com.books.api.service;

import java.util.List;
import com.books.api.model.Book;

public interface UserService {
    List<Book> getFavorites(String username);
}
