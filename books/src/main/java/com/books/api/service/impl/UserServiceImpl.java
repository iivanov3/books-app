package com.books.api.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import com.books.api.model.Book;
import com.books.api.model.User;
import com.books.api.repository.BookRepository;
import com.books.api.repository.UserRepository;
import com.books.api.service.UserService;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private UserRepository userRepository;
    private BookRepository bookRepository;
    private JwtDecoder jwtDecoder;

    public UserServiceImpl(UserRepository userRepository, BookRepository bookRepository, JwtDecoder jwtDecoder) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    @Override
    public List<Book> getFavorites(String username) {
        return userRepository.findByUsername(username).get().getFavorites().stream().toList();
    }

    @Override
    public User addToFavorites(String username, Long id) {
        User user = userRepository.findByUsername(username).get();
        Book book = bookRepository.findById(id).get();
        book.getUsers().add(user);
        bookRepository.save(book);
        return new User();
    }

    @Override
    public User removeFromFavorites(String username, Long id) {
        User user = userRepository.findByUsername(username).get();
        Book book = bookRepository.findById(id).get();
        book.getUsers().remove(user);
        bookRepository.save(book);
        return new User();
    }
    
}
