package com.books.api.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.books.api.model.Role;
import com.books.api.model.User;
import com.books.api.model.DTO.LoginResponseDTO;
import com.books.api.model.DTO.RegisterResponseDTO;
import com.books.api.repository.RoleRepository;
import com.books.api.repository.UserRepository;

@Service
@Transactional
public class AuthenticationService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository,
            PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public RegisterResponseDTO registerUser(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            return new RegisterResponseDTO("Username already exists.");
        }

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        userRepository.save(new User(username, encodedPassword, authorities, new HashSet<>()));
        return new RegisterResponseDTO("Successfully registered user.");
    }

    public LoginResponseDTO loginUser(String username, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            String token = tokenService.generateJwt(auth);
            return new LoginResponseDTO(token);
        } catch (AuthenticationException e) {
            return new LoginResponseDTO("");
        }
    }
}
