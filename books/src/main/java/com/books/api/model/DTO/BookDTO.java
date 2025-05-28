package com.books.api.model.DTO;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
    private Long id;
    private String name;
    private String author;
    private Date datePublished;
}