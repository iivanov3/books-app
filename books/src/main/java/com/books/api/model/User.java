package com.books.api.model;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    @Column(unique = true)
    private String username;
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> authorities;
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "users")
    @JsonManagedReference
    private Set<Book> favorites;

    public User(String username, String password, Set<Role> authorities, Set<Book> favorites) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.favorites = favorites;
    }
}
