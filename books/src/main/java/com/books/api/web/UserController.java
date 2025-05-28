package com.books.api.web;

import java.util.List;

import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.RestController;

import com.books.api.model.Book;
import com.books.api.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private JwtDecoder jwtDecoder;

    public UserController(UserService userService, JwtDecoder jwtDecoder) {
        this.userService = userService;
        this.jwtDecoder = jwtDecoder;
    }

    @GetMapping("/favorites")
    public List<Book> getFavorites(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        String username = jwtDecoder.decode(token).getSubject();
        return userService.getFavorites(username);
    }

}
