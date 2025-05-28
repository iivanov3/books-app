package com.books.api.service.impl;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.books.api.model.Book;
import com.books.api.repository.UserRepository;
import com.books.api.service.UserService;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    
}
