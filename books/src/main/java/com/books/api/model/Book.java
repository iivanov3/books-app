package com.books.api.model;

import java.sql.Date;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String author;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date datePublished;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonBackReference
    private Set<User> users;

    public Book(String name, String author, Date datePublished, Set<User> users) {
        this.name = name;
        this.author = author;
        this.datePublished = datePublished;
        this.users = users;
    }

}
