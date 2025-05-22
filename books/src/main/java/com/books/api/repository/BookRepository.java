package com.books.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.books.api.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
