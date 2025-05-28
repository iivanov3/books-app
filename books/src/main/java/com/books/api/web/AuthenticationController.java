package com.books.api.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.books.api.model.DTO.LoginResponseDTO;
import com.books.api.model.DTO.RegisterResponseDTO;
import com.books.api.model.DTO.RegistrationDTO;
import com.books.api.service.impl.AuthenticationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> registerUser(@RequestBody RegistrationDTO body) {
        RegisterResponseDTO response = authenticationService.registerUser(body.getUsername(), body.getPassword());
        if (response.getResponse().contains("Username already exists.")) {
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody RegistrationDTO body) {
        LoginResponseDTO response = authenticationService.loginUser(body.getUsername(), body.getPassword());
        if (response.getToken().equals("")) {
            return new ResponseEntity<>(new LoginResponseDTO("Invalid credentials"), HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
