package com.books.api.web;

import java.util.List;

import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.RestController;

import com.books.api.model.Book;
import com.books.api.model.User;
import com.books.api.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @GetMapping("/")
    public String helloUserController() {
        return "User access level.";
    }

    @GetMapping("/favorites")
    public List<Book> getFavorites(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        String username = jwtDecoder.decode(token).getSubject();
        return userService.getFavorites(username);
    }

    @PostMapping("/favorites/add/{id}")
    public User addToFavorites(@RequestHeader("Authorization") String token,
                                @PathVariable Long id) {
        token = token.substring(7);
        String username = jwtDecoder.decode(token).getSubject();
        return userService.addToFavorites(username, id);
    }

    @DeleteMapping("/favorites/remove/{id}")
    public User removeFromFavorites(@RequestHeader("Authorization") String token,
                                    @PathVariable Long id) {
        token = token.substring(7);
        String username = jwtDecoder.decode(token).getSubject();
        return userService.removeFromFavorites(username, id);
    }
}
